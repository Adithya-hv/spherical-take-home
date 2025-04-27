// This file contains a utility function to playing sounds like mouse clicks but not voices / people talking
export function playSound(sound: string) {
  const audio = new Audio(sound);
  audio.currentTime = 0;
  audio.volume = 0.1;
  audio.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
}
