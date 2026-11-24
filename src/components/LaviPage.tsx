import React from 'react';
import { motion } from 'motion/react';

export const LaviPage: React.FC = () => {
  return (
    <motion.section
      aria-label="A letter for Lavi"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mt-10 sm:mt-14 pb-12 flex flex-col items-center space-y-8"
    >
      {/* Big Highlight Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center px-4 py-6 rounded-[8px] bg-gradient-to-b from-white/90 via-[#FFF5F8]/92 to-[#FFE9F0]/90 backdrop-blur-md border border-rose-200/80 shadow-[0_20px_48px_-16px_rgba(219,122,148,0.24)]"
      >
        <h2
          className="font-serif italic text-4xl sm:text-5xl md:text-6xl font-normal text-[#8C4A5E] leading-tight"
          style={{ textWrap: 'balance' }}
        >
          mahal ko ikaw babyy lavii so much :&gt;
        </h2>
      </motion.div>

      {/* Cute Pinkish Letter */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-gradient-to-b from-[#FFF6F9] via-[#FFECF2] to-[#FFE2EC] border border-rose-200/90 rounded-[8px] shadow-[0_24px_56px_-16px_rgba(205,120,142,0.26)] px-7 py-8 sm:px-12 sm:py-11 text-left"
      >
        {/* Top Pink Ribbon & Heart Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-rose-200/70">
          <span className="font-serif italic text-sm text-[#B06C80]">
            for my babyy lavii
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <svg
              width="20"
              height="16"
              viewBox="0 0 24 18"
              fill="none"
              aria-hidden="true"
            >
              <ellipse
                cx="6.5"
                cy="9"
                rx="5"
                ry="4.2"
                fill="#FDA4AF"
                stroke="#B06C80"
                strokeWidth="1.2"
              />
              <ellipse
                cx="17.5"
                cy="9"
                rx="5"
                ry="4.2"
                fill="#FDA4AF"
                stroke="#B06C80"
                strokeWidth="1.2"
              />
              <circle
                cx="12"
                cy="9"
                r="2.8"
                fill="#FB7185"
                stroke="#B06C80"
                strokeWidth="1.2"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-rose-400"
              aria-hidden="true"
            >
              <path
                d="M12 20.5C12 20.5 4.5 15.2 4.5 9.6C4.5 7.1 6.4 5.2 8.8 5.2C10.3 5.2 11.4 6 12 7.1C12.6 6 13.7 5.2 15.2 5.2C17.6 5.2 19.5 7.1 19.5 9.6C19.5 15.2 12 20.5 12 20.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="rgba(251, 113, 133, 0.28)"
              />
            </svg>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#8C4A5E] mb-5">
            Hi babyy lavii,
          </h3>

          <div className="space-y-4 font-serif text-lg sm:text-[19px] leading-relaxed text-[#8C4A5E]">
            <p>
              Just wanted to remind you how deeply loved, appreciated, and special you are to me every single day. Everything feels lighter, sweeter, and calmer whenever I&apos;m with you.
            </p>
            <p>
              Thank you for being my comfort, my happiness, and my favorite person in the whole world. No matter how busy or tiring the day gets, coming back to you will always be my favorite part.
            </p>
            <p>
              Mahal ko ikaw sobra, babyy. I&apos;ll always be right here cheering for you, taking care of you, and loving you in every season.
            </p>
          </div>

          <div className="mt-8 pt-5 border-t border-rose-200/70 flex items-end justify-between gap-4">
            <div>
              <p className="font-serif italic text-base text-[#B06C80]">
                forever &amp; always yours,
              </p>
              <p className="font-serif italic text-2xl text-[#8C4A5E] mt-0.5">
                com
              </p>
            </div>
            <span className="font-serif italic text-sm text-rose-400">
              i love you
            </span>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
};
