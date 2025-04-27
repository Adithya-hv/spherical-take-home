<template>
  <form id="comment-form" @submit.prevent="emitSubmit">
    <textarea
      class="comment-textarea"
      v-model="description"
      placeholder="Write your comment here!"
      required
    ></textarea>
    <button type="submit">
      <PhPaperPlaneRight :size="32" color="#ff9800" weight="fill" class="submitImage" />
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { getBrowserId } from '../utils/browserId';
import { v4 as uuidv4 } from 'uuid';

import type { CommentData } from '../stores/popupStore';
import { PhPaperPlaneRight } from 'phosphor-vue';

interface Props {
  lat: number;
  lng: number;
}

const props = defineProps<Props>();

const description = ref('');
const emit = defineEmits<{
  (e: 'addComment', data: CommentData): void;
}>();

const emitSubmit = () => {
  emit('addComment', {
    commentId: uuidv4(),
    browserId: getBrowserId(),
    description: description.value,
    lng: props.lng,
    lat: props.lat,
  });
};
</script>

<style scoped>
#comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#comment-form input,
#comment-form textarea {
  background-color: #fbf8e9;
  font-family: 'Comfortaa', Arial, sans-serif;
  height: 100px;
  width: 300px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  font-weight: 550;
  padding: 5px;
  border: 2px solid #ff9800;
  border-radius: 5px;
  resize: none;
  margin-top: 20px;
}

#comment-form button {
  display: flex;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border: none;
  background: none;
}

#comment-form button:hover {
  background-color: #ffd5a1;
}
</style>
