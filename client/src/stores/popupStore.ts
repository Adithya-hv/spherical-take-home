import { defineStore } from 'pinia';

export type PopupType = 'form' | 'info';

export type CommentData = {
  browserId: string;
  description: string;
  lng: number;
  lat: number;
};

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

    closePopup() {
      this.visible = false;
      this.type = null;
      this.data = null;
    },
  },
});
