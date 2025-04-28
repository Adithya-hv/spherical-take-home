import { defineStore } from 'pinia';
import mapboxgl from 'mapbox-gl';
import { usePopupStore } from './popupStore';
import type { CommentData } from './popupStore';
import dbService from '../services/dbService';
import { playSound } from '@/utils/audioUtils';
import clickSound from '../assets/sounds/mouseClick.mp3';

// This store manages the markers on the map, including adding, deleting,
// and retrieving them also interacts with the db.
export const useMarkerStore = defineStore('markerStore', () => {
  const markerDataMap = new Map<String, mapboxgl.Marker>(); // Maps commentId to marker

  const popupStore = usePopupStore();

  const setMarker = (data: CommentData, marker: mapboxgl.Marker) => {
    markerDataMap.set(data.commentId, marker);
  };

  const getMarker = (commentId: String) => {
    return markerDataMap.get(commentId);
  };

  const deleteMarker = (data: CommentData) => {
    console.log('received', data.commentId);
    const marker = getMarker(data.commentId);
    if (!marker) {
      console.error('Marker not found for commentId:', data.commentId);
      return;
    }
    marker.remove();
    markerDataMap.delete(data.commentId);
    dbService.deleteComment(data.commentId);
    popupStore.closePopup();
  };

  const createMarkerElement = (isVoice: boolean): HTMLElement => {
    const el = document.createElement('div');
    if (isVoice) {
      el.className = 'voice-marker';
    } else {
      el.className = 'comment-marker';
    }
    return el;
  };

  // This function is the only place where I create markers.
  // dbpush is used to determine if the marker should be pushed to the db.
  // isVoice is used to determine if the marker is a voice marker or a comment marker.
  const addMarker = (
    map: mapboxgl.Map,
    comment: CommentData,
    dbPush: boolean,
    isVoice: boolean
  ) => {
    const marker = new mapboxgl.Marker({ element: createMarkerElement(isVoice) })
      .setLngLat([comment.lng, comment.lat])
      .addTo(map);
    marker.getElement().addEventListener('click', (e) => {
      e.stopPropagation();
      playSound(clickSound);
      if (isVoice) {
        popupStore.openVoicePopup(comment);
      } else {
        popupStore.openInfoPopup(comment);
      }
    });
    setMarker(comment, marker);
    if (dbPush) dbService.addComment(comment);
  };

  return {
    setMarker,
    getMarker,
    deleteMarker,
    addMarker,
    markerDataMap
  };
});
