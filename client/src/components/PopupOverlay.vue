<template>
  <!-- So we render this component here and move(teleport) it to the body in the DOM
  to make sure it is always on top of the map and not hidden by other elements -->
  <Teleport to="body">
    <div
      v-if="visible"
      class="popup-floating"
      :style="{
        position: 'absolute',
        transform: 'translate(0%, -100%)',
        left: `${screenCoords.x}px`,
        top: `${screenCoords.y}px`,
        borderColor: popupBorderColor,
        '--popup-border-color': popupBorderColor,
      }"
    >
      <div class="close-icon" @click="close">
        <PhXCircle :size="20" color="#35332f" weight="bold" />
      </div>
      <CommentFormPopup v-if="type === 'form'" :lat="lat" :lng="lng" @addComment="onAddComment" />
      <CommentInfoPopup v-else-if="type === 'info' && data" v-bind="data" />
      <VoicedPopup v-else-if="type === 'voice' && data" v-bind="data" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watchEffect, inject, reactive, onMounted, onUnmounted, computed } from 'vue';
import CommentFormPopup from './CommentFormPopup.vue';
import CommentInfoPopup from './CommentInfoPopup.vue';
import VoicedPopup from './VoicedPopup.vue';
import { usePopupStore } from '../stores/popupStore';
import type { CommentData } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';
import { storeToRefs } from 'pinia';
import { PhXCircle } from 'phosphor-vue';

// Gets the map instance from the provide in MapBox.vue
const map = inject<mapboxgl.Map>('map');
if (!map) {
  console.warn('Map not provided yet');
}
const popupStore = usePopupStore();
const markerStore = useMarkerStore();
const { visible, type, lat, lng, data } = storeToRefs(popupStore);
const screenCoords = reactive<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
const borderColorMap = {
  form: '#ff9800',
  info: '#4caf50',
  voice: '#f44336',
};
// Changes the popup border color based on the type of popup
const popupBorderColor = computed(() => borderColorMap[type.value ?? 'info'] || '#4caf50');

const updateCoords = () => {
  if (!map || !visible.value) return;
  const point = map.project([lng.value, lat.value]);
  screenCoords.x = point.x;
  screenCoords.y = point.y;
};

// Adds a marker when is hears the addComment event
const onAddComment = (data: CommentData) => {
  popupStore.closePopup();
  if (map) {
    markerStore.addMarker(map, data, true, false);
  } else {
    console.warn('Map is undefined, cannot add marker.');
  }
};

const close = () => {
  popupStore.closePopup();
};

// Watching for edge cases like first render
watchEffect(() => {
  if (!map || !visible) return;
  const point = map.project([lng.value, lat.value]);
  screenCoords.x = point.x;
  screenCoords.y = point.y;
});

// Updates the screen coordinates when the map is moved or zoomed
onMounted(() => {
  if (!map) return;
  map.on('move', updateCoords);
  map.on('zoom', updateCoords);
});

// Cleans up the event listeners
onUnmounted(() => {
  if (!map) return;
  map.off('move', updateCoords);
  map.off('zoom', updateCoords);
});
</script>

<style scoped>
.popup-floating {
  background: #fbf8e9;
  border-radius: 20px;
  border-bottom-left-radius: 3px;
  border-width: 3px;
  border-style: solid;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  pointer-events: auto;
  width: auto;
  max-width: 400px;
  --popup-border-color: #4caf50; /* default */
  border-color: var(--popup-border-color);
  transition:
    border-color 1s ease,
    --popup-border-color 1s ease;
}
.popup-floating::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: -10px;
  transform: rotate(45deg);
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: var(--popup-border-color);
  transition:
    border-top-color 1s ease,
    --popup-border-color 1s ease;
}
.close-icon {
  position: absolute;
  top: 6px;
  right: 4px;
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.close-icon:hover {
  background-color: #d2cdcd;
}
</style>
