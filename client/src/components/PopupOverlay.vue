<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="popupFloating"
      :style="{
        position: 'absolute',
        left: `${screenCoords.x}px`,
        top: `${screenCoords.y}px`,
        transform: 'translate(0%, -100%)',
        zIndex: 1000,
      }"
    >
      <button class="closeButton" @click="popupStore.closePopup()">X</button>
      <CommentFormPopup v-if="type === 'form'" :lat="lat" :lng="lng" @addComment="onAddComment" />
      <CommentInfoPopup v-else-if="type === 'info'" v-bind="data!" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watchEffect, inject, reactive, onMounted, onUnmounted } from 'vue';
import CommentFormPopup from './CommentFormPopup.vue';
import CommentInfoPopup from './CommentInfoPopup.vue';

import { usePopupStore } from '../stores/popupStore';
import type { CommentData } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';
import { storeToRefs } from 'pinia';

const map = inject<mapboxgl.Map>('map');
if (!map) throw new Error('Map not provided');

const popupStore = usePopupStore();
const { visible, type, lat, lng, data } = storeToRefs(popupStore);

const markerStore = useMarkerStore();

const screenCoords = reactive<{ x: number; y: number }>({
  x: 0,
  y: 0,
});

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

function updateCoords() {
  if (!map || !visible.value) return;

  const point = map.project([lng.value, lat.value]);
  screenCoords.x = point.x;
  screenCoords.y = point.y;
}

const onAddComment = (data: CommentData) => {
  popupStore.closePopup();

  markerStore.addMarker(
    map,
    {
      commentId: data.commentId,
      browserId: data.browserId,
      description: data.description,
      lng: data.lng,
      lat: data.lat,
    },
    true,
  );
};
</script>

<style scoped>
.popupFloating {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  pointer-events: auto;
}
.closeButton {
  position: absolute;
  top: 10px;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
