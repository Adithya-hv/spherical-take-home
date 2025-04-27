import type { CommentData } from '../stores/popupStore';
import vibhavHiranandani from '../assets/voices/vibhavHiranadani.mp3';
import arjunPurva from '../assets/voices/arjunPurva.mp3';
import momArekere from '../assets/voices/momArekere.mp3';
import meBengaluru from '../assets/voices/meBengaluru.mp3';

// This file contains the hardcoded voiced comments for the map
export const voicedComments: CommentData[] = [
  {
    commentId: 'Vibhav',
    browserId: 'default',
    description:
      "(In Tamil): I've spent most of my life in Hiranandani (An Apartment Complex). It used to be full of greenery, surrounded by trees and forests. But now things have changed. The moment you step outside, the air feels polluted, and even the water is dirty. Trash is being burned openly everywhere—dry leaves, plastic, everything going up in smoke. Trees are being cut down every day, and constant construction adds to the noise and dust all around. 8-10 years ago, this place was completely different—peaceful, green, and clean. Now it\’s all slowly getting worse. I\’m trying to bring some change, but it gets even harder when the people around you don\’t seem to care about the environment.",
    lat: 12.875832933265855,
    lng: 77.61243336715228,
    isVoice: true,
    voice: vibhavHiranandani
  },
  {
    commentId: 'Arjun',
    browserId: 'default',
    description:
      "(In Hindi): I live at Purva Panorama, and the environment here has become really difficult to live in. There's constant noise pollution from traffic and ongoing construction—morning to night, it never stops. The roads are always jammed, and there\’s dust everywhere because of new buildings going up all around. On top of that, so many trees have been cut down over the years that there's barely any green space left. It used to be quieter and greener, but now it just feels like the entire area is being taken over by concrete. It\’s frustrating to see nature slowly disappear while nobody seems to be doing anything about it.",
    lat: 12.976734170016982,
    lng: 77.55711155762174,
    isVoice: true,
    voice: arjunPurva
  },
  {
    commentId: 'Amma (Mom)',
    browserId: 'default',
    description:
      '(In Kannada): First, it was just forests where cows and wildlife would feed on. But they were quickly cut down to make room for buildings, roads, and streetlights all around. There used to be so much wildlife and a variety of trees, with not a road in sight. This was the case just about 4-5 years ago, but they got rid of it all.',
    lat: 12.889654256076255,
    lng: 77.59405082465764,
    isVoice: true,
    voice: momArekere
  },
  {
    commentId: 'Me (Adithya)',
    browserId: 'default',
    description:
      "(In Kannada): I've noticed a lot of environmental issues in my hometown, like pollution, noise, and the loss of green spaces. It\’s been tough seeing how these problems have been ignored, especially when you realize how much things have changed over the years. This inspired me to create an app that gives people a platform to voice their concerns about the environment. The goal is to let people share their experiences and raise awareness by mapping these voices across different locations. I believe it\’s important to give these concerns a space to be heard, and hopefully, it can spark change in the communities that need it most.",
    lat: 12.98619712646152,
    lng: 77.59084183637424,
    isVoice: true,
    voice: meBengaluru
  }
];
