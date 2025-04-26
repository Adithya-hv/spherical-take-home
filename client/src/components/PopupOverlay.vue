<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="popup-floating"
      :style="{
        position: 'absolute',
        left: `${screenCoords.x}px`,
        top: `${screenCoords.y}px`,
        transform: 'translate(0%, -100%)',
        zIndex: 1000,
      }"
    >
      <div class="minimize-icon" @click="minimize">
        <img :src="minimizeIcon" alt="Minimize" />
      </div>
      <CommentFormPopup v-if="type === 'form'" :lat="lat" :lng="lng" @addComment="onAddComment" />
      <CommentInfoPopup v-else-if="type === 'info'" v-bind="data!" />
      <VoicedPopup v-else-if="type === 'voice'" v-bind="data!" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watchEffect, inject, reactive, onMounted, onUnmounted } from 'vue';
import CommentFormPopup from './CommentFormPopup.vue';
import CommentInfoPopup from './CommentInfoPopup.vue';
import VoicedPopup from './VoicedPopup.vue';

import { usePopupStore } from '../stores/popupStore';
import type { CommentData } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';
import { storeToRefs } from 'pinia';

import minimizeIcon from '../assets/icons/minimizeIcon.svg';

const map = inject<mapboxgl.Map>('map');
if (!map) {
  console.warn('Map not provided yet');
}
const popupStore = usePopupStore();
const { visible, type, lat, lng, data } = storeToRefs(popupStore);

const markerStore = useMarkerStore();

const screenCoords = reactive<{ x: number; y: number }>({
  x: 0,
  y: 0,
});

const updateCoords = () => {
  if (!map || !visible.value) return;

  const point = map.project([lng.value, lat.value]);
  screenCoords.x = point.x;
  screenCoords.y = point.y;
};

const onAddComment = (data: CommentData) => {
  popupStore.closePopup();

  markerStore.addMarker(
    map!,
    {
      commentId: data.commentId,
      browserId: data.browserId,
      description: data.description,
      lng: data.lng,
      lat: data.lat,
    },
    true,
    false,
  );
};

const minimize = () => {
  popupStore.closePopup();
};

watchEffect(() => {
  if (!map || !visible) return;

  const point = map.project([lng.value, lat.value]);
  screenCoords.x = point.x;
  screenCoords.y = point.y;
});

onMounted(() => {
  if (!map) return;

  map.on('move', updateCoords);
  map.on('zoom', updateCoords);
});

onUnmounted(() => {
  if (!map) return;

  map.off('move', updateCoords);
  map.off('zoom', updateCoords);
});
</script>

<style scoped>
.popup-floating {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  pointer-events: auto;
}

.minimize-icon {
  position: absolute;
  top: 6px;
  right: 4px;
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.minimize-icon img {
  width: 20px;
  height: 20px;
}
.minimize-icon:hover {
  background-color: #d2cdcd;
}
</style>
