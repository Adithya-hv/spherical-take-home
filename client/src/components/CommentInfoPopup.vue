<template>
  <h3 class="comment-title">Comment:</h3>
  <div class="comment-box">
    <p>{{ comment.description }}</p>
  </div>
  <button class="delete-button" @click="deleteComment">Delete Comment</button>
</template>

<script setup lang="ts">
import { toRaw } from 'vue';

import { usePopupStore } from '../stores/popupStore';
import { useMarkerStore } from '../stores/markerStore';

import type { CommentData } from '../stores/popupStore';

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
  padding-right: 12px;
}

.comment-box p {
  margin: 0;
}

.delete-button {
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
}
</style>
