import { defineStore } from 'pinia';
import mapboxgl from 'mapbox-gl';

import { usePopupStore } from './popupStore';
import type { CommentData } from './popupStore';

import dbService from '../services/dbService';
import { playSound } from '@/utils/playAudio';
import clickSound from '../assets/sounds/mouseClick.mp3';

// class Marker {
//   comment: CommentData;
//   mapBoxMarker: mapboxgl.Marker;
//   constructor(comment: CommentData) {
//     this.comment = comment;
//     this.mapBoxMarker = new mapboxgl.Marker({
//       element: this.createMarkerElement(isVoice),
//     }).setLngLat([comment.lng, comment.lat]);

//     marker.getElement().addEventListener('click', this.onClick.bind(this));
//   }

//   playSound() {}

//   onClick(e) {
//     e.stopPropagation();
//     playSound(clickSound);

//     if (isVoice) {
//       popupStore.openVoicePopup(this.comment);
//     } else {
//       popupStore.openInfoPopup(this.comment);
//     }
//   }

//   addToMap(map: mapboxgl.Map) {
//     this.mapBoxMarker.addTo(map);
//   }

//   private createMarkerElement(isVoice: boolean): HTMLElement {
//     const el = document.createElement('div');
//     if (isVoice) {
//       el.className = 'voice-marker';
//     } else {
//       el.className = 'comment-marker';
//     }
//     return el;
//   }
// }

// class MapService {
//   map;

//   constructor(map, dbService) {
//     this.map = map;
//     this.dbService = dbService;
//   }

//   createMarker(description: string) {
//     const marker = new Marker({ description: description, lat: 0, lng: 0 }).addToMap(this.map);
//     dbService.addComment(comment);
//   }

//   addMarker(comment: CommentData, dbPush: boolean) {
//     const marker = new Marker(comment);
//     marker.addToMap(this.map);
//   }
// }

// get rid of the markerDataMap, we don't need this data.
export const useMarkerStore = defineStore('markerStore', () => {
  const markerDataMap = new Map<String, mapboxgl.Marker>(); // Maps commentId to marker

  const popupStore = usePopupStore();

  const setMarker = (data: CommentData, marker: mapboxgl.Marker) => {
    markerDataMap.set(data.commentId, marker);
  };

  const getMarker = (data: CommentData) => {
    return markerDataMap.get(data.commentId);
  };

  const deleteMarker = (data: CommentData) => {
    console.log('received', data.commentId);

    const marker = markerDataMap.get(data.commentId);
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

  const addMarker = (
    map: mapboxgl.Map,
    comment: CommentData,
    dbPush: boolean,
    isVoice: boolean,
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

  const reset = () => {
    markerDataMap.clear(); // Clears the map
  };

  return {
    setMarker,
    getMarker,
    deleteMarker,
    addMarker,
    markerDataMap,
    reset,
  };
});
