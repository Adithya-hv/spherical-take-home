import { defineStore } from 'pinia';
import mapboxgl from 'mapbox-gl';

import { usePopupStore } from './popupStore';
import type { CommentData } from './popupStore';

export const useMarkerStore = defineStore('markerStore', () => {
  const markerDataMap = new Map<String, mapboxgl.Marker>();

  const popupStore = usePopupStore();
  const markerStore = useMarkerStore();

  function setMarker(data: CommentData, marker: mapboxgl.Marker) {
    markerDataMap.set(data.commentId, marker);
  }

  function getMarker(data: CommentData) {
    return markerDataMap.get(data.commentId);
  }

  function deleteMarker(data: CommentData) {
    console.log('recived', data.commentId);

    const marker = markerDataMap.get(data.commentId);
    marker!.remove();
    markerDataMap.delete(data.commentId);
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
