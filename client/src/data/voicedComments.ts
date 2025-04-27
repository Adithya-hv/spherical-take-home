import type { CommentData } from '../stores/popupStore';
import vibhavHiranandani from '../assets/voices/vibhavHiranadani.mp3';
import arjunPurva from '../assets/voices/arjunPurva.mp3';

export const voicedComments: CommentData[] = [
  {
    commentId: 'Vibhav',
    browserId: 'default',
    description:
      "(In Tamil): I've spent most of my life in Hiranandani (An Apartment Complex). It used to be full of greenery, surrounded by trees and forests. But now things have changed. The moment you step outside, the air feels polluted, and even the water is dirty. Trash is being burned openly everywhere—dry leaves, plastic, everything going up in smoke. Trees are being cut down every day, and constant construction adds to the noise and dust all around. 8-10 years ago, this place was completely different—peaceful, green, and clean. Now it\’s all slowly getting worse. I\’m trying to bring some change, but it gets even harder when the people around you don\’t seem to care about the environment.",
    lat: 12.875832933265855,
    lng: 77.61243336715228,
    isVoice: true,
    voice: vibhavHiranandani,
  },
  {
    commentId: 'Arjun',
    browserId: 'default',
    description:
      "(In Hindi): I live at Purva Panorama, and the environment here has become really difficult to live in. There's constant noise pollution from traffic and ongoing construction—morning to night, it never stops. The roads are always jammed, and there’s dust everywhere because of new buildings going up all around. On top of that, so many trees have been cut down over the years that there's barely any green space left. It used to be quieter and greener, but now it just feels like the entire area is being taken over by concrete. It’s frustrating to see nature slowly disappear while nobody seems to be doing anything about it.",
    lat: 12.976734170016982,
    lng: 77.55711155762174,
    isVoice: true,
    voice: arjunPurva,
  },
];
