<template>
  <div class="info-popup">
    <p class="comment-title">Comment:</p>
    <div class="comment-box">
      <p>{{ comment.description }}</p>
    </div>
    <div class="delete-icon" @click="deleteComment">
      <PhTrash :size="24" color="#35332f" weight="fill" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue';
import { usePopupStore } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';
import type { CommentData } from '../stores/popupStore';
import { PhTrash } from 'phosphor-vue';

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
  font-family:
    'Comfortaa' Arial,
    sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  font-weight: 550;
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
  font-family: 'Comfortaa', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #222;
  padding-right: 20px;
}
.comment-box p {
  background: #fbf8e9;
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
  background-color: #cfd2cd;
}
</style>
