export interface CoupleProfile {
  id: 'com' | 'lavi';
  discordUserId: string;
  fallbackUsername: string;
  name: string;
  caption: string;
  photoDataUrl: string | null;
}

export const COM_PFP_PATH = './assets/aistudio/1e6b927f5877add71dd4deec48ab0716_d965cf8f.jpg';
export const LAVI_PFP_PATH = './assets/aistudio/IMG_20261123_150435_b4cd3e5b.jpg';
export const DISCORD_BANNER_PATH = './assets/aistudio/image_89b2f9de.png';
export const BACKGROUND_IMAGE_PATH = './assets/aistudio/1fc5dc8b249a2df7abc9c0e134d0f0fc_43281f00.jpg';
export const BACKGROUND_SONG_PATH = './assets/aistudio/wave_to_earth_-_seasons_b863d003.mp3';

export const DEFAULT_PROFILES: Record<'com' | 'lavi', CoupleProfile> = {
  com: {
    id: 'com',
    discordUserId: '1561715349911507046',
    fallbackUsername: '764sa',
    name: 'com',
    caption: 'i love lavi',
    photoDataUrl: COM_PFP_PATH,
  },
  lavi: {
    id: 'lavi',
    discordUserId: '1458715644379009135',
    fallbackUsername: 'm7za',
    name: 'lavi',
    caption: 'i love com',
    photoDataUrl: LAVI_PFP_PATH,
  },
};

export const STORAGE_KEY = 'com_nd_lavi_posters_v7';
