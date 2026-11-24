import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export const LoveLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => setIsOpen((prev) => !prev);

  return (
    <motion.section
      aria-label="Com's letter to Lavi"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mt-20 sm:mt-28 mb-10 flex justify-center"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="closed-envelope"
            type="button"
            onClick={toggleLetter}
            aria-expanded={false}
            aria-label="Open com's letter to lavi"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md aspect-[16/10] bg-gradient-to-b from-white via-[#FFF7F9] to-[#FFEAF0] border border-rose-200/90 rounded-[6px] shadow-[0_24px_52px_-16px_rgba(205,120,142,0.26)] overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
          >
            {/* Envelope Flap Lines */}
            <svg
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <path
                d="M0 0 L200 135 L400 0"
                fill="rgba(255, 255, 255, 0.72)"
                stroke="rgba(244, 169, 184, 0.55)"
                strokeWidth="1.5"
              />
              <path
                d="M0 250 L150 105 M400 250 L250 105"
                fill="none"
                stroke="rgba(244, 169, 184, 0.38)"
                strokeWidth="1.2"
              />
            </svg>

            {/* Rose Heart Seal */}
            <span className="relative z-10 w-11 h-11 rounded-full bg-rose-400 shadow-md shadow-rose-200/80 border-2 border-white flex items-center justify-center mb-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M12 20.5C12 20.5 4.5 15.2 4.5 9.6C4.5 7.1 6.4 5.2 8.8 5.2C10.3 5.2 11.4 6 12 7.1C12.6 6 13.7 5.2 15.2 5.2C17.6 5.2 19.5 7.1 19.5 9.6C19.5 15.2 12 20.5 12 20.5Z" />
              </svg>
            </span>

            <span className="relative z-10 mt-1 block">
              <span className="block font-serif italic text-2xl text-[#8C4A5E]">
                com&apos;s letter to lavi
              </span>
              <span className="block mt-1 text-xs text-[#B47486]">
                click to open
              </span>
            </span>
          </motion.button>
        ) : (
          <motion.article
            key="open-letter"
            role="button"
            tabIndex={0}
            aria-expanded={true}
            aria-label="Close com's letter to lavi"
            onClick={toggleLetter}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLetter();
              }
            }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full bg-gradient-to-b from-white via-[#FFF7F9] to-[#FFEFF3] border border-rose-200/80 rounded-[6px] shadow-[0_24px_54px_-16px_rgba(205,120,142,0.22)] px-7 py-8 sm:px-12 sm:py-11 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-rose-200/60">
              <span className="font-serif italic text-sm text-[#B47486]">
                com&apos;s letter to lavi
              </span>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-[11px] text-[#B47486]">
                  click to close
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-rose-300"
                  aria-hidden="true"
                >
                  <path
                    d="M12 20.5C12 20.5 4.5 15.2 4.5 9.6C4.5 7.1 6.4 5.2 8.8 5.2C10.3 5.2 11.4 6 12 7.1C12.6 6 13.7 5.2 15.2 5.2C17.6 5.2 19.5 7.1 19.5 9.6C19.5 15.2 12 20.5 12 20.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="rgba(251, 113, 133, 0.14)"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#8C4A5E] mb-5">
                Dear lavi,
              </h3>

              <div className="space-y-4 font-serif text-lg sm:text-[19px] leading-relaxed text-[#8C4A5E]/95">
                <p>
                  Thank you for being the softest and brightest part of my every day—for every laugh, every quiet moment, and the warmth you bring into my life just by being yourself.
                </p>
                <p>
                  No matter how the seasons change around us, I will always choose you in all the little moments, holding your hand through every ordinary afternoon and every dream waiting ahead of us.
                </p>
                <p>
                  I&apos;m so grateful I get to call you mine, today and in every season to come.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-rose-200/50">
                <p className="font-serif italic text-base text-[#B47486]">
                  always yours,
                </p>
                <p className="font-serif italic text-2xl text-[#8C4A5E] mt-0.5">
                  com
                </p>
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
