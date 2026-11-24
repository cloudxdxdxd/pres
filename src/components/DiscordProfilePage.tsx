import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Smartphone, Globe, Music, Radio, Gamepad2 } from 'lucide-react';
import { getDiscordAvatarUrl, LanyardData } from '../hooks/useLanyard';
import { CoupleProfile, DISCORD_BANNER_PATH } from '../types/profile';

interface DiscordProfilePageProps {
  profiles: [CoupleProfile, CoupleProfile];
  dataById: Record<string, LanyardData>;
  loading: boolean;
}

const STATUS_CONFIG: Record<
  'online' | 'idle' | 'dnd' | 'offline',
  { label: string; dotClass: string }
> = {
  online: { label: 'Online', dotClass: 'bg-emerald-400' },
  idle: { label: 'Idle', dotClass: 'bg-amber-300' },
  dnd: { label: 'Do Not Disturb', dotClass: 'bg-rose-400' },
  offline: { label: 'Offline', dotClass: 'bg-rose-200' },
};

const HelloKittyAvatarDeco: React.FC = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    aria-hidden="true"
    className="pointer-events-none absolute -inset-3.5 w-[calc(100%+28px)] h-[calc(100%+28px)] z-10 drop-shadow-[0_2px_6px_rgba(244,114,182,0.28)]"
  >
    {/* Soft Pink & White Scalloped Halo Ring */}
    <circle
      cx="60"
      cy="62"
      r="43"
      stroke="#F9A8D4"
      strokeWidth="3.2"
      strokeDasharray="3 3"
      strokeLinecap="round"
    />
    <circle
      cx="60"
      cy="62"
      r="40.5"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      opacity="0.9"
    />

    {/* Left Cat Ear */}
    <path
      d="M27 36 C23 23 23 15 26 13 C30 12 37 18 42 25 Z"
      fill="#FFFFFF"
      stroke="#8C4A5E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M29 31 C27 24 27 19 28.5 18 C31 17.5 34.5 21 37.5 25.5 Z"
      fill="#FCE7F3"
    />

    {/* Right Cat Ear */}
    <path
      d="M93 36 C97 23 97 15 94 13 C90 12 83 18 78 25 Z"
      fill="#FFFFFF"
      stroke="#8C4A5E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M91 31 C93 24 93 19 91.5 18 C89 17.5 85.5 21 82.5 25.5 Z"
      fill="#FCE7F3"
    />

    {/* Iconic Hello Kitty Pink Bow on Right Ear */}
    <g transform="translate(86 24) rotate(18)">
      <ellipse
        cx="-8.5"
        cy="0"
        rx="7.5"
        ry="5.8"
        fill="#FB7185"
        stroke="#8C4A5E"
        strokeWidth="1.8"
      />
      <ellipse
        cx="8.5"
        cy="0"
        rx="7.5"
        ry="5.8"
        fill="#FB7185"
        stroke="#8C4A5E"
        strokeWidth="1.8"
      />
      <circle cx="-7" cy="-1.2" r="2" fill="#FDA4AF" opacity="0.7" />
      <circle cx="7" cy="-1.2" r="2" fill="#FDA4AF" opacity="0.7" />
      <circle
        cx="0"
        cy="0"
        r="4.2"
        fill="#F43F5E"
        stroke="#8C4A5E"
        strokeWidth="1.8"
      />
    </g>

    {/* Mini Hello Kitty Charm on Bottom-Left Rim */}
    <g transform="translate(24 90) rotate(-12)">
      <path
        d="M-8 -2 C-10 -6 -10 -10 -9 -11 C-7.5 -11 -4.5 -8.5 -3 -6.5 C-1 -7 1 -7 3 -6.5 C4.5 -8.5 7.5 -11 9 -11 C10 -10 10 -6 8 -2 C9.5 -0.5 10 1.5 10 3.2 C10 7 5.5 10 0 10 C-5.5 10 -10 7 -10 3.2 C-10 1.5 -9.5 -0.5 -8 -2 Z"
        fill="#FFFFFF"
        stroke="#8C4A5E"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <ellipse cx="4.2" cy="-7" rx="2.2" ry="1.7" transform="rotate(-20 4.2 -7)" fill="#FB7185" stroke="#8C4A5E" strokeWidth="0.9" />
      <ellipse cx="8.2" cy="-5.5" rx="2.2" ry="1.7" transform="rotate(-20 8.2 -5.5)" fill="#FB7185" stroke="#8C4A5E" strokeWidth="0.9" />
      <circle cx="6.2" cy="-6.2" r="1.2" fill="#F43F5E" stroke="#8C4A5E" strokeWidth="0.9" />
      <ellipse cx="-3.8" cy="2" rx="1" ry="1.4" fill="#5C2D3D" />
      <ellipse cx="3.8" cy="2" rx="1" ry="1.4" fill="#5C2D3D" />
      <ellipse cx="0" cy="3.8" rx="1.4" ry="0.95" fill="#FBBF24" stroke="#8C4A5E" strokeWidth="0.6" />
      <path d="M-11 0.5 L-7.5 1.5 M-11.5 3 L-7.8 3 M-10.8 5.5 L-7.2 4.5 M11 0.5 L7.5 1.5 M11.5 3 L7.8 3 M10.8 5.5 L7.2 4.5" stroke="#8C4A5E" strokeWidth="1" strokeLinecap="round" />
    </g>

    {/* Delicate Pink Hearts & Sparkles */}
    <path
      d="M17 58 C17 58 12.5 54.8 12.5 51.8 C12.5 50.3 13.7 49.2 15.1 49.2 C16 49.2 16.6 49.7 17 50.3 C17.4 49.7 18 49.2 18.9 49.2 C20.3 49.2 21.5 50.3 21.5 51.8 C21.5 54.8 17 58 17 58 Z"
      fill="#FB7185"
      stroke="#FFFFFF"
      strokeWidth="1.2"
    />
    <path
      d="M103 70 L104.4 73.6 L108 75 L104.4 76.4 L103 80 L101.6 76.4 L98 75 L101.6 73.6 Z"
      fill="#FFFFFF"
      stroke="#F472B6"
      strokeWidth="1.1"
    />
    <path
      d="M54 15 L55 17.5 L57.5 18.5 L55 19.5 L54 22 L53 19.5 L50.5 18.5 L53 17.5 Z"
      fill="#FFFFFF"
      stroke="#F472B6"
      strokeWidth="1"
    />
  </svg>
);

const DiscordBox: React.FC<{
  profile: CoupleProfile;
  index: number;
  lanyard?: LanyardData;
  loading: boolean;
}> = ({ profile, index, lanyard, loading }) => {
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const [bannerFailed, setBannerFailed] = useState(false);
  const [failedAlbumArtUrl, setFailedAlbumArtUrl] = useState<string | null>(null);

  const rawAvatarUrl = getDiscordAvatarUrl(
    profile.discordUserId,
    lanyard?.discord_user?.avatar
  );
  const avatarUrl =
    rawAvatarUrl && failedAvatarUrl !== rawAvatarUrl ? rawAvatarUrl : null;

  const username = lanyard?.discord_user?.username || profile.fallbackUsername;
  const displayName =
    lanyard?.discord_user?.global_name ||
    lanyard?.discord_user?.display_name ||
    profile.name;

  const status = lanyard?.discord_status ?? 'offline';
  const statusInfo = STATUS_CONFIG[status];

  const customStatus = lanyard?.activities.find((a) => a.type === 4 && a.state);
  const richActivities = lanyard?.activities.filter((a) => a.type !== 4) ?? [];

  const platforms: Array<{ key: string; label: string; Icon: typeof Monitor }> = [];
  if (lanyard?.active_on_discord_desktop) {
    platforms.push({ key: 'desktop', label: 'Desktop', Icon: Monitor });
  }
  if (lanyard?.active_on_discord_mobile) {
    platforms.push({ key: 'mobile', label: 'Mobile', Icon: Smartphone });
  }
  if (lanyard?.active_on_discord_web) {
    platforms.push({ key: 'web', label: 'Web', Icon: Globe });
  }

  const slopeAngle = index === 0 ? -2.2 : 2.2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, rotate: slopeAngle }}
      animate={{ opacity: 1, y: 0, rotate: slopeAngle }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -5,
        rotate: index === 0 ? -1 : 1,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      className="w-[310px] sm:w-[348px] h-[472px] bg-gradient-to-b from-white via-[#FFF7F9] to-[#FFEFF3] border border-rose-200/80 rounded-[8px] shadow-[0_24px_50px_-14px_rgba(205,120,142,0.26)] overflow-hidden text-left flex flex-col"
    >
      {/* Soft Blush Pink Profile Banner with Pixel Bunnies */}
      <div className="relative h-32 shrink-0 bg-gradient-to-r from-rose-100/90 via-[#FFF3F6] to-pink-100/90 border-b border-rose-200/60 overflow-hidden">
        {!bannerFailed && (
          <div className="absolute inset-0 flex items-end justify-end pl-24 pr-3 pt-7 pb-2 pointer-events-none">
            <img
              src={DISCORD_BANNER_PATH}
              alt="Pixel bunnies banner"
              referrerPolicy="no-referrer"
              onError={() => setBannerFailed(true)}
              className="w-full h-full object-contain object-right-bottom [image-rendering:pixelated]"
            />
          </div>
        )}
        <div className="absolute top-2.5 right-3 flex items-center gap-1.5 text-[11px] font-medium text-[#8C4A5E] bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-rose-200/70 z-10">
          <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} aria-hidden="true" />
          <span>{loading && !lanyard ? 'Connecting...' : statusInfo.label}</span>
        </div>
      </div>

      <div className="px-5 pb-5 flex-1 flex flex-col min-h-0">
        {/* Overlapping Circular Discord PFP + Hello Kitty Deco */}
        <div className="relative -mt-11 mb-3 flex items-end justify-between shrink-0">
          <div className="relative w-20 h-20 rounded-full p-1 bg-white border border-rose-200/80 shadow-sm">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${displayName} Discord avatar`}
                referrerPolicy="no-referrer"
                onError={() => setFailedAvatarUrl(avatarUrl)}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-rose-50 flex items-center justify-center font-serif italic text-xl text-[#8C4A5E]">
                {profile.name[0]}
              </div>
            )}
            <HelloKittyAvatarDeco />
            <span
              className={`absolute bottom-0.5 right-0.5 z-20 w-4 h-4 rounded-full border-2 border-white ${statusInfo.dotClass}`}
              title={statusInfo.label}
            />
          </div>

          {platforms.length > 0 && (
            <div className="flex items-center gap-2 pb-1 text-[#B47486]">
              {platforms.map(({ key, label, Icon }) => (
                <span
                  key={key}
                  title={`Active on ${label}`}
                  aria-label={`Active on ${label}`}
                  className="flex items-center gap-1 text-[11px]"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Display Name & Discord Username */}
        <div className="shrink-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="font-serif italic text-3xl font-normal text-[#8C4A5E] leading-none">
              {displayName}
            </h2>
            <span className="text-xs text-[#B47486]">
              ({profile.name})
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-[#9E5466]">
            @{username}
          </p>
        </div>

        {/* Middle Presence Area */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-0.5">
          {/* Custom Discord Status */}
          {customStatus?.state && (
            <div className="mt-3.5 pt-3 border-t border-rose-200/60">
              <p className="text-xs text-[#B47486] mb-0.5">Custom status</p>
              <p className="font-serif italic text-base text-[#8C4A5E] truncate" title={customStatus.state}>
                “{customStatus.state}”
              </p>
            </div>
          )}

          {/* Spotify Listening */}
          {lanyard?.listening_to_spotify && lanyard.spotify && (
            <div className="mt-3 p-3 rounded-md bg-white/85 border border-rose-200/70 flex items-center gap-3">
              {lanyard.spotify.album_art_url &&
              failedAlbumArtUrl !== lanyard.spotify.album_art_url ? (
                <img
                  src={lanyard.spotify.album_art_url}
                  alt={lanyard.spotify.album}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedAlbumArtUrl(lanyard.spotify?.album_art_url ?? null)
                  }
                  className="w-10 h-10 rounded-sm object-cover shrink-0 border border-rose-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-sm bg-rose-50 flex items-center justify-center text-rose-400 shrink-0">
                  <Music className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-rose-400">
                  Listening to Spotify
                </p>
                <p className="text-xs font-medium text-[#8C4A5E] truncate">
                  {lanyard.spotify.song}
                </p>
                <p className="text-[11px] text-[#B47486] truncate">
                  {lanyard.spotify.artist}
                </p>
              </div>
            </div>
          )}

          {/* Other Rich Activities (Streaming / Playing / Watching) */}
          {richActivities.slice(0, 1).map((act) => {
            const isStream = act.type === 1;
            const label = isStream
              ? 'Streaming'
              : act.type === 2
                ? 'Listening'
                : act.type === 3
                  ? 'Watching'
                  : 'Playing';

            return (
              <div
                key={act.id}
                className="mt-3 p-3 rounded-md bg-white/85 border border-rose-200/70 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-md bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-400 shrink-0">
                  {isStream ? <Radio className="w-4 h-4" /> : <Gamepad2 className="w-4 h-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-[#B47486]">{label}</p>
                  <p className="text-xs font-medium text-[#8C4A5E] truncate">
                    {act.name}
                  </p>
                  {act.details && (
                    <p className="text-[11px] text-[#B47486] truncate">{act.details}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bio & Discord User ID Footer */}
        <div className="mt-auto pt-3 border-t border-rose-200/60 flex items-center justify-between gap-2 text-[11px] text-[#B47486] shrink-0">
          <span className="font-serif italic text-sm text-[#9E5466]">
            {profile.caption}
          </span>
          <span className="font-mono tabular-nums text-[10px] opacity-80">
            {profile.discordUserId}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export const DiscordProfilePage: React.FC<DiscordProfilePageProps> = ({
  profiles,
  dataById,
  loading,
}) => {
  return (
    <motion.section
      aria-label="Discord profiles"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto mt-10 sm:mt-14 pb-12 flex flex-col items-center"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20">
        <DiscordBox
          profile={profiles[0]}
          index={0}
          lanyard={dataById[profiles[0].discordUserId]}
          loading={loading}
        />
        <DiscordBox
          profile={profiles[1]}
          index={1}
          lanyard={dataById[profiles[1].discordUserId]}
          loading={loading}
        />
      </div>
    </motion.section>
  );
};
