<template>
  <form id="comment-form">
    <label for="description">Comment:</label>
    <textarea
      id="description"
      v-model="description"
      placeholder="Write your comment here!"
      required
    ></textarea>
    <button type="submit" @click="emitSubmit">Add</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CommentData } from '../stores/popupStore';

import { getBrowserId } from '../utils/browserId';

interface Props {
  lat: number;
  lng: number;
}

const props = defineProps<Props>();

const description = ref('');
const emit = defineEmits<{
  (e: 'addComment', data: CommentData): void;
}>();

const emitSubmit = (event: Event) => {
  event.preventDefault();
  emit('addComment', {
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
