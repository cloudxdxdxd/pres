import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { getDiscordAvatarUrl, LanyardData } from '../hooks/useLanyard';
import { CoupleProfile } from '../types/profile';

interface LanyardCardProps {
  profile: CoupleProfile;
  index: number;
  lanyard?: LanyardData;
  onUploadPhoto: (id: 'com' | 'lavi', dataUrl: string) => void;
}

const STATUS_META: Record<
  'online' | 'idle' | 'dnd' | 'offline',
  { label: string; dotClass: string }
> = {
  online: { label: 'online', dotClass: 'bg-emerald-400' },
  idle: { label: 'idle', dotClass: 'bg-amber-300' },
  dnd: { label: 'do not disturb', dotClass: 'bg-rose-400' },
  offline: { label: 'offline', dotClass: 'bg-rose-200' },
};

function getPresenceLine(lanyard?: LanyardData): string | null {
  if (!lanyard) return null;

  if (lanyard.listening_to_spotify && lanyard.spotify) {
    return `listening to ${lanyard.spotify.song} · ${lanyard.spotify.artist}`;
  }

  const primaryActivity = lanyard.activities.find((a) => a.type !== 4);
  const customStatus = lanyard.activities.find((a) => a.type === 4 && a.state);

  if (primaryActivity) {
    const verb =
      primaryActivity.type === 1
        ? 'streaming'
        : primaryActivity.type === 2
          ? 'listening to'
          : primaryActivity.type === 3
            ? 'watching'
            : 'playing';
    const base = `${verb} ${primaryActivity.name}`;
    return customStatus?.state ? `${customStatus.state} · ${base}` : base;
  }

  if (customStatus?.state) {
    return customStatus.state;
  }

  return null;
}

export const LanyardCard: React.FC<LanyardCardProps> = ({
  profile,
  index,
  lanyard,
  onUploadPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFailedSrc(null);
        onUploadPhoto(profile.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const slopeAngle = index === 0 ? -3 : 3;
  const hoverSlope = index === 0 ? -1.5 : 1.5;

  const discordAvatarUrl = getDiscordAvatarUrl(
    profile.discordUserId,
    lanyard?.discord_user?.avatar
  );
  const candidateSrc = profile.photoDataUrl || discordAvatarUrl;
  const portraitSrc =
    candidateSrc && failedSrc !== candidateSrc
      ? candidateSrc
      : discordAvatarUrl && failedSrc !== discordAvatarUrl
        ? discordAvatarUrl
        : null;

  const username = lanyard?.discord_user?.username || profile.fallbackUsername;
  const displayName =
    lanyard?.discord_user?.global_name || lanyard?.discord_user?.display_name || null;
  const status = lanyard?.discord_status ?? 'offline';
  const statusInfo = STATUS_META[status];
  const presenceLine = getPresenceLine(lanyard);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, rotate: slopeAngle }}
      animate={{ opacity: 1, y: 0, rotate: slopeAngle }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        rotate: hoverSlope,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      className="relative w-[296px] sm:w-[324px] h-[464px] sm:h-[490px] bg-gradient-to-b from-white via-[#FFF7F9] to-[#FFEFF3] border border-rose-200/80 rounded-[4px] shadow-[0_24px_50px_-14px_rgba(205,120,142,0.26)] flex flex-col p-4 sm:p-5 select-none"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload photo for ${profile.name}`}
      />

      {/* Top Poster Margin with Live Discord Status */}
      <div className="flex items-center justify-between text-[11px] font-serif italic text-[#B47486] mb-3">
        <span>{index === 0 ? 'no. i' : 'no. ii'}</span>

        <span className="flex items-center gap-1.5 not-italic font-sans text-[11px] text-[#B47486]">
          <span
            className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`}
            aria-hidden="true"
          />
          <span>{statusInfo.label}</span>
        </span>
      </div>

      {/* Tall Gallery Portrait Frame */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        aria-label={`Upload photo for ${profile.name} poster`}
        className="relative group flex-1 w-full overflow-hidden border border-rose-200/70 bg-rose-50/40 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 text-left"
      >
        {portraitSrc ? (
          <img
            src={portraitSrc}
            alt={`${profile.name} (@${username}) profile picture`}
            referrerPolicy="no-referrer"
            onError={() => setFailedSrc(portraitSrc)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <span className="w-full h-full bg-gradient-to-b from-white via-rose-50/80 to-pink-100/50 flex flex-col items-center justify-center text-rose-300 px-6 text-center">
            <svg
              width="54"
              height="54"
              viewBox="0 0 48 48"
              fill="none"
              className="mb-3 text-rose-300"
              aria-hidden="true"
            >
              <circle cx="24" cy="18" r="7.5" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M11 39C11 32.3726 16.8203 27 24 27C31.1797 27 37 32.3726 37 39"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-serif italic text-xl text-[#B47486]">
              {profile.name}
            </span>
          </span>
        )}

        <span className="pointer-events-none absolute inset-0 bg-rose-950/0 group-hover:bg-rose-200/15 transition-colors flex items-end justify-end p-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-white/95 text-[#8C4A5E] border border-rose-200/70 text-[11px] font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-3.5 h-3.5" />
            <span>Change Photo</span>
          </span>
        </span>
      </button>

      {/* Editorial Poster Typography + Username + Live Lanyard Activity */}
      <div className="pt-3.5 pb-0.5 text-center">
        <h2 className="font-serif italic text-4xl font-normal tracking-tight text-[#8C4A5E] leading-none">
          {profile.name}
        </h2>

        <p className="mt-1.5 text-xs text-[#B47486] truncate">
          <span>@{username}</span>
          {displayName && (
            <>
              <span className="mx-1.5 text-rose-300" aria-hidden="true">
                ·
              </span>
              <span>{displayName}</span>
            </>
          )}
        </p>

        <p className="mt-1.5 text-sm font-serif italic tracking-wide text-[#9E5466]">
          {profile.caption}
        </p>

        <div className="mt-2.5 pt-2 border-t border-rose-200/60 min-h-[26px] flex items-center justify-center">
          <p
            className="text-[11px] text-[#B47486] truncate max-w-full"
            title={presenceLine ?? statusInfo.label}
          >
            {presenceLine ?? statusInfo.label}
          </p>
        </div>
      </div>
    </motion.article>
  );
};
