import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { CherryBlossomFall } from './components/CherryBlossomFall';
import { DiscordProfilePage } from './components/DiscordProfilePage';
import { EntranceGate } from './components/EntranceGate';
import { FloatingHearts } from './components/FloatingHearts';
import { LanyardCard } from './components/LanyardCard';
import { LaviPage } from './components/LaviPage';
import { LoveLetterSection } from './components/LoveLetterSection';
import { useLanyard } from './hooks/useLanyard';
import {
  BACKGROUND_IMAGE_PATH,
  BACKGROUND_SONG_PATH,
  CoupleProfile,
  DEFAULT_PROFILES,
  STORAGE_KEY,
} from './types/profile';

type ActivePage = 'colavi' | 'dc' | 'lavi';

function loadProfiles(): Record<'com' | 'lavi', CoupleProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Record<'com' | 'lavi', CoupleProfile>>;
      return {
        com: { ...DEFAULT_PROFILES.com, ...(parsed.com ?? {}) },
        lavi: { ...DEFAULT_PROFILES.lavi, ...(parsed.lavi ?? {}) },
      };
    }
    return DEFAULT_PROFILES;
  } catch {
    return DEFAULT_PROFILES;
  }
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>('colavi');
  const [profiles, setProfiles] = useState<Record<'com' | 'lavi', CoupleProfile>>(loadProfiles);
  const [bgFailed, setBgFailed] = useState(false);

  const { dataById, loading } = useLanyard([
    DEFAULT_PROFILES.com.discordUserId,
    DEFAULT_PROFILES.lavi.discordUserId,
  ]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch {
      // Ignore quota errors if very large photo is stored
    }
  }, [profiles]);

  const handleEnterSite = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.65;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
    setHasEntered(true);
  };

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        audio.volume = 0.65;
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const clamped = Math.max(0, Math.min(time, audio.duration));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const handleUploadPhoto = (id: 'com' | 'lavi', dataUrl: string) => {
    setProfiles((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        photoDataUrl: dataUrl,
      },
    }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between">
      {/* Shared Background Audio */}
      <audio
        ref={audioRef}
        src={BACKGROUND_SONG_PATH}
        loop
        preload="auto"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Full-viewport Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {!bgFailed && (
          <img
            src={BACKGROUND_IMAGE_PATH}
            alt="Misty willow pond framed in white lace"
            referrerPolicy="no-referrer"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Subtle Floating Hearts & Cherry Blossom Fall */}
      <FloatingHearts />
      <CherryBlossomFall />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <EntranceGate key="entrance-gate" onEnter={handleEnterSite} />
        ) : (
          <motion.main
            key="main-site"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-20 flex-1 flex flex-col items-center"
          >
            {/* Top Page Switcher: "colavi", "dc", and "lavi" */}
            <nav
              aria-label="Page navigation"
              className="mb-7 inline-flex items-center gap-1 p-1 rounded-xl bg-white/88 backdrop-blur-md border border-rose-200/80 shadow-[0_8px_24px_-12px_rgba(219,122,148,0.28)]"
            >
              <button
                type="button"
                aria-current={activePage === 'colavi' ? 'page' : undefined}
                onClick={() => setActivePage('colavi')}
                className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                  activePage === 'colavi'
                    ? 'bg-rose-400 text-white shadow-sm shadow-rose-200'
                    : 'text-[#8C4A5E] hover:bg-rose-50'
                }`}
              >
                colavi
              </button>
              <button
                type="button"
                aria-current={activePage === 'dc' ? 'page' : undefined}
                onClick={() => setActivePage('dc')}
                className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                  activePage === 'dc'
                    ? 'bg-rose-400 text-white shadow-sm shadow-rose-200'
                    : 'text-[#8C4A5E] hover:bg-rose-50'
                }`}
              >
                dc
              </button>
              <button
                type="button"
                aria-current={activePage === 'lavi' ? 'page' : undefined}
                onClick={() => setActivePage('lavi')}
                className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                  activePage === 'lavi'
                    ? 'bg-rose-400 text-white shadow-sm shadow-rose-200'
                    : 'text-[#8C4A5E] hover:bg-rose-50'
                }`}
              >
                lavi
              </button>
            </nav>

            {/* Top Title Section */}
            <header className="w-full max-w-2xl mx-auto text-center">
              <h1
                className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#8C4A5E] leading-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]"
                style={{ textWrap: 'balance' }}
              >
                {activePage === 'colavi' ? (
                  <>
                    com <span className="italic font-normal text-[#B86E82]">nd</span> lavi
                  </>
                ) : activePage === 'dc' ? (
                  <>
                    dc <span className="italic font-normal text-[#B86E82]">profiles</span>
                  </>
                ) : (
                  <>
                    babyy <span className="italic font-normal text-[#B86E82]">lavi</span>
                  </>
                )}
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-[#9E5466] tracking-wide drop-shadow-[0_1px_6px_rgba(255,255,255,0.95)]">
                {activePage === 'colavi' ? (
                  <>
                    <span>our little corner</span>
                    <span className="mx-2 text-rose-300" aria-hidden="true">
                      ·
                    </span>
                    <span>just you &amp; me</span>
                  </>
                ) : activePage === 'dc' ? (
                  <>
                    <span>live discord presence</span>
                    <span className="mx-2 text-rose-300" aria-hidden="true">
                      ·
                    </span>
                    <span>com &amp; lavi</span>
                  </>
                ) : (
                  <>
                    <span>a letter for you</span>
                    <span className="mx-2 text-rose-300" aria-hidden="true">
                      ·
                    </span>
                    <span>always &amp; forever</span>
                  </>
                )}
              </p>

              <div className="mt-6">
                <AudioPlayerBar
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  currentTime={currentTime}
                  duration={duration}
                  onTogglePlay={handleTogglePlay}
                  onToggleMute={handleToggleMute}
                  onSeek={handleSeek}
                />
              </div>
            </header>

            <AnimatePresence mode="wait">
              {activePage === 'colavi' ? (
                <motion.div
                  key="colavi-page"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Profile Posters */}
                  <section
                    aria-label="Couple profile posters"
                    className="w-full max-w-4xl mx-auto mt-10 sm:mt-14 flex flex-col items-center"
                  >
                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20">
                      <LanyardCard
                        profile={profiles.com}
                        index={0}
                        lanyard={dataById[profiles.com.discordUserId]}
                        onUploadPhoto={handleUploadPhoto}
                      />
                      <LanyardCard
                        profile={profiles.lavi}
                        index={1}
                        lanyard={dataById[profiles.lavi.discordUserId]}
                        onUploadPhoto={handleUploadPhoto}
                      />
                    </div>
                  </section>

                  {/* Bottom Space: Com's Letter to Lavi */}
                  <LoveLetterSection />
                </motion.div>
              ) : activePage === 'dc' ? (
                <DiscordProfilePage
                  key="dc-page"
                  profiles={[profiles.lavi, profiles.com]}
                  dataById={dataById}
                  loading={loading}
                />
              ) : (
                <LaviPage key="lavi-page" />
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
