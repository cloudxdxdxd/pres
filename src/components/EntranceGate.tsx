import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface EntranceGateProps {
  onEnter: () => void;
}

const NO_OFFSETS: Array<{ x: number; y: number }> = [
  { x: 64, y: -50 },
  { x: -92, y: 46 },
  { x: 70, y: 52 },
  { x: -84, y: -52 },
];

const MAX_NO_CLICKS = 4;

export const EntranceGate: React.FC<EntranceGateProps> = ({ onEnter }) => {
  const [noClicks, setNoClicks] = useState(0);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleNoClick = () => {
    const nextCount = noClicks + 1;
    setNoClicks(nextCount);
    const nextPos = NO_OFFSETS[(nextCount - 1) % NO_OFFSETS.length];
    setNoOffset(nextPos);
  };

  const isNoGone = noClicks >= MAX_NO_CLICKS;
  const yesScale = Math.min(1.76, 1 + noClicks * 0.19);
  const noScale = Math.max(0, 1 - noClicks * 0.24);
  const noOpacity = Math.max(0, 1 - noClicks * 0.25);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen w-full flex items-center justify-center px-5 py-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-gradient-to-b from-white via-[#FFF7F9] to-[#FFEFF3] border border-rose-200/80 rounded-[8px] shadow-[0_26px_56px_-16px_rgba(205,120,142,0.28)] px-7 py-10 sm:px-10 sm:py-12 text-center"
      >
        <p className="font-serif italic text-sm text-[#B47486] mb-3">
          com nd lavi
        </p>

        <h1
          className="font-serif italic text-3xl sm:text-4xl font-normal text-[#8C4A5E] leading-snug"
          style={{ textWrap: 'balance' }}
        >
          does lavi and com cute together?
        </h1>

        <div className="mt-11 flex items-center justify-center gap-4 min-h-[104px]">
          <motion.button
            layout="position"
            type="button"
            onClick={onEnter}
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            whileHover={{ scale: yesScale * 1.04 }}
            whileTap={{ scale: yesScale * 0.96 }}
            className="relative z-20 min-w-[104px] px-7 py-2.5 rounded-lg text-sm font-medium bg-rose-400 text-white hover:bg-rose-500 transition-colors cursor-pointer shadow-sm shadow-rose-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          >
            Yes
          </motion.button>

          <AnimatePresence>
            {!isNoGone && (
              <motion.button
                type="button"
                onClick={handleNoClick}
                animate={{
                  x: noOffset.x,
                  y: noOffset.y,
                  scale: noScale,
                  opacity: noOpacity,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                className="relative z-30 min-w-[104px] px-7 py-2.5 rounded-lg text-sm font-medium bg-white text-[#8C4A5E] border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
              >
                No
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
