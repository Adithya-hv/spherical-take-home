<template>
  <form id="comment-form" @submit.prevent="emitSubmit">
    <label for="description">Comment:</label>
    <textarea
      id="description"
      v-model="description"
      placeholder="Write your comment here!"
      required
    ></textarea>
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { getBrowserId } from '../utils/browserId';
import { v4 as uuidv4 } from 'uuid';

import type { CommentData } from '../stores/popupStore';

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
#comment-form label {
  font-weight: bold;
}
#comment-form input,
#comment-form textarea {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
#comment-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#comment-form button:hover {
  background-color: #0056b3;
}
</style>
