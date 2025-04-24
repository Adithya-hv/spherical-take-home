<template>
  <div ref="mapContainer" class="map-container"></div>
  <PopupOverlay v-if="visible" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue';
import PopupOverlay from './PopupOverlay.vue';

import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import type { CommentData } from '../stores/popupStore';
import { getBrowserId } from '../utils/browserId';

import { usePopupStore } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';

import { storeToRefs } from 'pinia';
import dbService from '../services/dbService';

const VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const popupStore = usePopupStore();
const markerStore = useMarkerStore();

const { visible } = storeToRefs(popupStore);

const props = withDefaults(defineProps<{ lat?: number; lng?: number; zoom?: number }>(), {
  lat: 12.9716, // default to home
  lng: 77.5946,
  zoom: 12.5,
});

const mapContainer = ref<HTMLDivElement | null>(null);
let map: mapboxgl.Map | null = null;

const createPastComments = async () => {
  try {
    const pastComments = await dbService.getCommentsByBrowserId(getBrowserId());
    console.log('Past comments:', pastComments);

    pastComments.forEach((comment: CommentData) => {
      if (comment.browserId == getBrowserId()) {
        markerStore.addMarker(
          map!,
          {
            commentId: comment.commentId,
            browserId: comment.browserId,
            lng: comment.lng,
            lat: comment.lat,
            description: comment.description,
          },
          false,
        );
      }
    });
  } catch (error) {
    console.error('Error fetching past comments:', error);
  }
};

onMounted(() => {
  if (!mapContainer.value) return;

  mapboxgl.accessToken = VITE_MAPBOX_TOKEN;

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/awpti/cm80qoc78000w01s80ui2hl46',
    center: [props.lng, props.lat],
    zoom: props.zoom,
  }).addControl(new mapboxgl.NavigationControl());

  provide('map', map);

  createPastComments();

  map.on('click', (e: MapMouseEvent) => {
    popupStore.openFormPopup(e.lngLat.lng, e.lngLat.lat);
  });
});

onUnmounted(() => {
  map?.remove();
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
