import { defineStore } from 'pinia';
import mapboxgl from 'mapbox-gl';

import { usePopupStore } from './popupStore';
import type { CommentData } from './popupStore';

export const useMarkerStore = defineStore('markerStore', () => {
  const markerDataMap = new Map<String, mapboxgl.Marker>();

  const popupStore = usePopupStore();
  const markerStore = useMarkerStore();

  const uniqueId = (data: CommentData): String => {
    return data.browserId + data.lat + data.lng;
  };

  function setMarker(data: CommentData, marker: mapboxgl.Marker) {
    markerDataMap.set(uniqueId(data), marker);
  }

  function getMarker(data: CommentData) {
    return markerDataMap.get(uniqueId(data));
  }

  function deleteMarker(data: CommentData) {
    console.log('recived', uniqueId(data));

    const marker = markerDataMap.get(uniqueId(data));
    marker!.remove();
    markerDataMap.delete(uniqueId(data));
    // Remove from db too
    popupStore.closePopup();
  }

  function addMarker(map: mapboxgl.Map, comment: CommentData) {
    const marker = new mapboxgl.Marker().setLngLat([comment.lng, comment.lat]).addTo(map!);

    marker.getElement().addEventListener('click', (e) => {
      e.stopPropagation();
      popupStore.openInfoPopup(comment);
    });

    markerStore.setMarker(comment, marker);
  }

  return {
    setMarker,
    getMarker,
    deleteMarker,
    addMarker,
    markerDataMap,
  };
});
