<template>
  <form id="comment-form" @submit.prevent="emitSubmit">
    <div class="textarea-container">
      <textarea
        class="comment-textarea"
        v-model="description"
        placeholder="Write your comment here!"
        required
      ></textarea>
      <button type="submit">
        <PhPaperPlaneRight :size="32" color="#ff9800" weight="fill" class="submitImage" />
      </button>
    </div>
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

// Emits the addComment event with the comment data to PopupOverlay.vue
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
.textarea-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
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
}
#comment-form button {
  display: flex;
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
