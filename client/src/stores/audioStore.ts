import { defineStore } from 'pinia';
import { ref } from 'vue';

// This store manages the audio playback state and provides a method to play audio files.
export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false);
  let voiceAudio: HTMLAudioElement | null = null;
  let currentVoiceSrc: string | null = null;

  const playVoice = (audioUrl: string) => {
    // If the audio is not already playing or the source has changed, create a new Audio object
    if (!voiceAudio || currentVoiceSrc !== audioUrl) {
      // If a different audio is playing, pause it
      if (voiceAudio) {
        voiceAudio.pause();
      }
      voiceAudio = new Audio(audioUrl);
      voiceAudio.volume = 0.8;
      currentVoiceSrc = audioUrl;
    }

    // If the audio is already playing, pause it and reset
    if (!voiceAudio.paused) {
      voiceAudio.pause();
      voiceAudio.currentTime = 0; // Reset to the start
      isPlaying.value = false;
    } else {
      // If the audio is not playing, play it
      voiceAudio.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
      isPlaying.value = true;
    }

    // Event listener to reset `isPlaying` when voice finishes
    voiceAudio.addEventListener('ended', () => {
      isPlaying.value = false;
    });
  };

  return {
    isPlaying,
    playVoice,
  };
});
