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

import { voicedComments } from '../data/voicedComments';
import { playSound } from '@/utils/playAudio';
import clickSound from '../assets/sounds/mouseClick.mp3';

const VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const popupStore = usePopupStore();
const markerStore = useMarkerStore();

const { visible } = storeToRefs(popupStore);

const props = withDefaults(defineProps<{ lat?: number; lng?: number; zoom?: number }>(), {
  lat: 12.9716, // default to home
  lng: 77.5946,
  zoom: 11.5,
});

const mapContainer = ref<HTMLDivElement | null>(null);
let map: mapboxgl.Map | null = null;

// loadComments
const loadPastComments = async () => {
  try {
    const pastComments = await dbService.getCommentsByBrowserId(getBrowserId());
    console.log('Past comments:', pastComments);

    pastComments.forEach((comment: CommentData) => {
      markerStore.addMarker(map!, comment, false, false);
    });
  } catch (error) {
    console.error('Error fetching past comments:', error);
  }
};

const createVoicedComments = () => {
  voicedComments.forEach((comment: CommentData) => {
    markerStore.addMarker(map!, comment, false, true);
  });
};

const spinAnimation = (map: mapboxgl.Map) => {
  map.on('load', () => {
    map.flyTo({
      center: [props.lng, props.lat],
      zoom: props.zoom,
      bearing: 0,
      speed: 2,
      curve: 1.6,
      easing: (t) => t,
    });
  });
};

onMounted(() => {
  if (!mapContainer.value) return;

  mapboxgl.accessToken = VITE_MAPBOX_TOKEN;

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/awpti/cm80qoc78000w01s80ui2hl46',
    center: [74.998774, 32.856518],
    zoom: 3,
  }).addControl(new mapboxgl.NavigationControl());

  if (!map) {
    console.error('Map initialization failed');
    return;
  }

  provide('map', map);

  spinAnimation(map);

  loadPastComments();
  createVoicedComments();

  map.on('click', (e: MapMouseEvent) => {
    playSound(clickSound);
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
