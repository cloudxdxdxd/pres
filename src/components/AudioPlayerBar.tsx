import React from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

interface AudioPlayerBarProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSeek: (time: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  onTogglePlay,
  onToggleMute,
  onSeek,
}) => {
  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-[0_10px_28px_-12px_rgba(219,122,148,0.28)]">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-400 text-white hover:bg-rose-500 active:scale-95 transition-all shrink-0 cursor-pointer shadow-sm shadow-rose-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-[#8C4A5E] truncate">
                seasons
              </span>
              <span className="text-xs text-rose-300" aria-hidden="true">
                ·
              </span>
              <span className="text-xs text-[#B47486] truncate">
                wave to earth
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
                  <span className="w-0.5 bg-rose-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-rose-400 rounded-full animate-[pulse_0.65s_ease-in-out_infinite] h-3" />
                  <span className="w-0.5 bg-rose-400 rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-1.5" />
                </span>
              )}
              <span className="text-[11px] font-mono tabular-nums text-[#B47486]">
                {formatTime(currentTime)} / {formatTime(duration || 256)}
              </span>
            </div>
          </div>

          <div className="relative flex items-center h-3">
            <div className="w-full h-1 rounded-full bg-rose-100 overflow-hidden">
              <div
                className="h-full bg-rose-400 transition-[width] duration-150"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 256}
              step={0.5}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              aria-label="Seek music progress"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-[#B47486] hover:text-[#8C4A5E] hover:bg-rose-50 transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
