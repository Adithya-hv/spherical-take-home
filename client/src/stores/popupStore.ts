import { defineStore } from 'pinia';
import { playSound } from '../utils/audioUtils';
import clickSound from '../assets/sounds/mouseClick.mp3';

export type PopupType = 'form' | 'info' | 'voice';

export type CommentData = {
  commentId: string;
  browserId: string;
  description: string;
  // TODO: Add support for voice comments with an object Database.
  isVoice?: boolean;
  voice?: string;
  lng: number;
  lat: number;
};

// This store manages the popup state, including its visibility, type, and data for PopupOverlay.vue.
export const usePopupStore = defineStore('popup', {
  state: () => ({
    visible: false,
    type: null as PopupType | null,
    lat: 0,
    lng: 0,
    data: null as CommentData | null,
  }),

  actions: {
    openFormPopup(lng: number, lat: number) {
      this.visible = true;
      this.type = 'form';
      this.lat = lat;
      this.lng = lng;
      this.data = null;
    },

    openInfoPopup(commentData: CommentData) {
      this.visible = true;
      this.type = 'info';
      this.lat = commentData.lat;
      this.lng = commentData.lng;
      this.data = commentData;
    },

    openVoicePopup(commentData: CommentData) {
      this.visible = true;
      this.type = 'voice';
      this.lat = commentData.lat;
      this.lng = commentData.lng;
      this.data = commentData;
    },

    closePopup() {
      playSound(clickSound);
      this.visible = false;
      this.type = null;
      this.data = null;
    },
  },
});
