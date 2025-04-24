<template>
  <div class="info-popup">
    <h3 class="comment-title">Comment:</h3>
    <div class="comment-box">
      <p>{{ comment.description }}</p>
    </div>
    <div class="delete-icon" @click="deleteComment">
      <img :src="trashIcon" alt="Delete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue';

import { usePopupStore } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';

import type { CommentData } from '../stores/popupStore';

import trashIcon from '../assets/icons/trashIcon.svg';

const comment = defineProps<CommentData>();

const popupStore = usePopupStore();
const markerStore = useMarkerStore();

const deleteComment = () => {
  console.log('Deleting comment:');
  markerStore.deleteMarker(toRaw(comment));
  popupStore.closePopup();
};
</script>

<style scoped>
.info-popup {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.comment-box {
  max-width: 400px;

  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  max-height: 300px;
  overflow-y: auto;

  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}
.comment-box::-webkit-scrollbar {
  width: 6px;
}

.comment-box::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.comment-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: bold;
  color: #222;
  padding-right: 20px;
}

.comment-box p {
  background: #f7f7f7;
  padding: 10px;
  border-radius: 4px;
  margin: 0;
}

.delete-icon {
  margin-top: 6px;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-self: flex-end;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.delete-icon img {
  width: 20px;
  height: 20px;
}

.delete-icon:hover {
  background-color: #d2cdcd;
}
</style>
