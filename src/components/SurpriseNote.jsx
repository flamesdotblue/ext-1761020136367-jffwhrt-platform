import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';

const confettiEmojis = ['🎉', '🎈', '🎊', '✨', '🎁', '💫'];

export default function SurpriseNote() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">A Little Birthday Surprise</h2>
        <p className="mt-3 text-slate-600">
          May your day be full of sparkles, laughter, and unforgettable moments. Click the gift to reveal a special wish!
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="group relative inline-flex items-center gap-2 rounded-2xl border border-sky-200 bg-white px-6 py-4 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-sky-500 text-white shadow-md">
            <Gift />
          </span>
          <span className="text-slate-800 font-semibold">
            {revealed ? 'Hide the Surprise' : 'Reveal the Surprise'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 mx-auto max-w-2xl rounded-3xl border border-sky-100 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-xl"
          >
            <p className="text-center text-lg sm:text-xl text-slate-700">
              Wishing you a day as bright as your smile and a year filled with dreams come true. Keep shining!
            </p>
            <p className="text-center mt-3 text-sky-700 font-semibold">You are loved, today and always. 💙</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji confetti burst */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {revealed && (
            <>
              {Array.from({ length: 24 }).map((_, i) => {
                const delay = (i % 12) * 0.08;
                const x = Math.random() * 100; // viewport width percentage
                const rot = Math.random() * 40 - 20;
                const emoji = confettiEmojis[i % confettiEmojis.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: '110vh', x: `${x}vw`, rotate: rot }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.4 + Math.random() * 0.6, delay, ease: 'easeOut' }}
                    className="absolute top-0 left-0 text-2xl select-none"
                    style={{ left: `${x}vw` }}
                    aria-hidden
                  >
                    {emoji}
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
