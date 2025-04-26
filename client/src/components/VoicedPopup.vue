<template>
  <div class="voiced-popup">
    <h3 class="popup-title">{{ comment.commentId }}</h3>

    <div class="audio-section">
      <img
        :src="isPlaying ? pauseSoundIcon : playSoundIcon"
        alt="Play Sound"
        @click="playCommentVoice"
      />
    </div>

    <div class="translation-box">
      <label for="translation">Translation:</label>
      <p id="translation">{{ comment.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CommentData } from '../stores/popupStore';
import { playSound, playVoice, isVoicePlaying } from '@/utils/playAudio';

import playSoundIcon from '../assets/icons/playSoundIcon.svg';
import pauseSoundIcon from '../assets/icons/pauseSoundIcon.svg';

import clickSound from '../assets/sounds/mouseClick.mp3';
import vibhavHiranandani from '../assets/voices/vibhavHiranadani.mp3';
import arjunPurva from '../assets/voices/arjunPurva.mp3';

const comment = defineProps<CommentData>();

const isPlaying = ref(false);

const playCommentVoice = () => {
  playSound(clickSound);
  switch (comment.commentId) {
    case 'Vibhav':
      playVoice(vibhavHiranandani, () => {
        isPlaying.value = false;
      });
      break;
    case 'Arjun':
      playVoice(arjunPurva, () => {
        isPlaying.value = false;
      });
      break;
    default:
      console.error('No audio available for this comment.');
  }
  isPlaying.value = isVoicePlaying();
};
</script>

<style scoped>
.voiced-popup {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

.audio-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 5px;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.audio-section img {
  width: 32px;
  height: 32px;
}
.audio-section:hover {
  background-color: #d2cdcd;
}

.translation-box {
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  word-wrap: break-word;
}

.translation-box label {
  font-weight: 700;
  margin-bottom: 5px;
}

.translation-box p {
  background: #f7f7f7;
  padding: 10px;
  border-radius: 4px;
  margin: 0;
}
</style>
