import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import { deitiesByDay, getToday } from '../data/family';
import Screen from './Screen';
import WaveDivider from './WaveDivider';

const PETALS = [
  { emoji: '🌼', left: '18%', delay: 0, drift: '18px' },
  { emoji: '🪷', left: '68%', delay: 1.4, drift: '-14px' },
  { emoji: '🌼', left: '42%', delay: 2.7, drift: '10px' },
  { emoji: '🪷', left: '80%', delay: 0.8, drift: '-20px' },
];

export default function MorningFlow() {
  const navigate = useNavigate();
  const { user, family, mandirSharedToday, shareMandir } = useVillage();
  const [shared, setShared] = useState(mandirSharedToday);

  const today = getToday();
  const deity = deitiesByDay[today];
  const blobs = ['blob-a', 'blob-b', 'blob-c', 'blob-d', 'blob-b'];

  const handleShare = () => {
    shareMandir();
    setShared(true);
  };

  return (
    <Screen className="relative overflow-hidden bg-gradient-to-b from-[#241736] via-[#5B3690] to-cream">
      {/* starfield / temple night sky */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70">
        <span className="absolute left-[12%] top-8 h-1 w-1 animate-twinkle rounded-full bg-white" />
        <span className="absolute left-[76%] top-16 h-1 w-1 animate-twinkle rounded-full bg-white" style={{ animationDelay: '0.6s' }} />
        <span className="absolute left-[52%] top-6 h-[3px] w-[3px] animate-twinkle rounded-full bg-white" style={{ animationDelay: '1.2s' }} />
        <span className="absolute left-[30%] top-24 h-1 w-1 animate-twinkle rounded-full bg-white" style={{ animationDelay: '1.8s' }} />
        <span className="absolute left-[88%] top-28 h-[3px] w-[3px] animate-twinkle rounded-full bg-white" style={{ animationDelay: '0.3s' }} />
      </div>

      {!shared &&
        PETALS.map((p, i) => (
          <span
            key={i}
            className="animate-float-up pointer-events-none absolute bottom-24 text-lg"
            style={{ left: p.left, animationDelay: `${p.delay}s`, '--drift': p.drift }}
          >
            {p.emoji}
          </span>
        ))}

      <div className="relative flex items-center gap-3 px-5 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white"
        >
          ←
        </button>
        <p className="text-sm font-medium text-white/90">Back to the village</p>
      </div>
      <WaveDivider color="#F5A623" className="relative mt-3" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-10">
      <AnimatePresence mode="wait">
        {!shared ? (
          <motion.div
            key="mandir"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center"
          >
            <p className="font-display text-lg font-semibold text-white">
              {deity.greeting}, {user.greetingName} 🙏
            </p>
            <p className="mt-1 text-xs text-white/70">{today} · {deity.name} ka din</p>

            <div className="relative mt-8 flex h-64 w-64 items-center justify-center">
              <div
                className="arch-shape absolute inset-0"
                style={{ background: `linear-gradient(180deg, ${deity.color}3d, transparent 70%)` }}
              />
              <div className="sunburst animate-spin-slow absolute h-52 w-52 rounded-full opacity-40" />
              <div
                className="absolute h-56 w-56 rounded-full animate-pulse-glow"
                style={{ boxShadow: `0 0 60px 20px ${deity.color}55` }}
              />
              <div
                className="sticker relative flex h-48 w-48 items-center justify-center rounded-full text-8xl shadow-glow"
                style={{ background: `radial-gradient(circle, ${deity.color}33, #FDF6EC 70%)` }}
              >
                {deity.emoji}
              </div>
              <span className="absolute -bottom-1 -left-2 animate-diya text-3xl">🪔</span>
              <span
                className="absolute -bottom-1 -right-2 animate-diya text-3xl"
                style={{ animationDelay: '0.6s' }}
              >
                🪔
              </span>
            </div>

            <p className="mt-6 max-w-xs text-center text-sm text-[#4a3527]/80">
              An AI-blessed image of {deity.name} for your morning aangan — offered fresh
              each day.
            </p>

            <button
              onClick={handleShare}
              className="mt-8 flex items-center gap-2 rounded-full bg-saffron px-7 py-3 text-sm font-semibold text-white shadow-warm active:scale-95"
            >
              🙏 Share with the whole village
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="shared"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <p className="font-display text-lg font-semibold text-white">
              Your blessing has reached everyone 🌼
            </p>
            <p className="mt-1 text-center text-xs text-white/75">
              Diyas are lighting up across the village, house by house.
            </p>

            <div className="mt-8 grid w-full max-w-xs grid-cols-3 gap-x-4 gap-y-5">
              {family.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`sticker-sm ${blobs[i % blobs.length]} flex h-14 w-14 items-center justify-center bg-gradient-to-b from-white/90 to-white/60 text-2xl`}
                  >
                    {m.houseEmoji}
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 * i + 0.2 }}
                    className="animate-diya -mt-1 text-lg"
                  >
                    🪔
                  </motion.span>
                  <span className="font-display text-[10px] font-semibold text-white">{m.name}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-10 rounded-full bg-deepgreen/90 px-7 py-3 text-sm font-semibold text-white shadow-warm active:scale-95"
            >
              Return to the village
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </Screen>
  );
}
