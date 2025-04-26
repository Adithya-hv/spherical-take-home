export function playSound(sound: string) {
  const audio = new Audio(sound);
  audio.currentTime = 0;
  audio.volume = 0.1;
  audio.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
}

let voiceAudio: HTMLAudioElement | null = null;
let currentVoiceSrc: string | null = null;

export function playVoice(sound: string, onEndedCallback?: () => void) {
  if (!voiceAudio || currentVoiceSrc !== sound) {
    if (voiceAudio) {
      voiceAudio.pause();
    }
    voiceAudio = new Audio(sound);
    voiceAudio.volume = 0.8;
    currentVoiceSrc = sound;

    voiceAudio.addEventListener('ended', () => {
      if (onEndedCallback) {
        onEndedCallback();
      }
    });
  }

  if (!voiceAudio.paused) {
    voiceAudio.pause();
    voiceAudio.currentTime = 0; // reset to the start
  } else {
    voiceAudio.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
  }
}

export function isVoicePlaying(): boolean {
  return voiceAudio !== null && !voiceAudio.paused;
}
