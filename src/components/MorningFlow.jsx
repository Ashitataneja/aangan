import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import { deitiesByDay, getToday } from '../data/family';
import Screen from './Screen';

export default function MorningFlow() {
  const navigate = useNavigate();
  const { user, family, mandirSharedToday, shareMandir } = useVillage();
  const [shared, setShared] = useState(mandirSharedToday);

  const today = getToday();
  const deity = deitiesByDay[today];

  const handleShare = () => {
    shareMandir();
    setShared(true);
  };

  return (
    <Screen className="bg-gradient-to-b from-[#3D2A5C] via-[#6B3FA0]/90 to-cream">
      <div className="flex items-center gap-3 px-5 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white"
        >
          ←
        </button>
        <p className="text-sm font-medium text-white/90">Back to the village</p>
      </div>

      <AnimatePresence mode="wait">
        {!shared ? (
          <motion.div
            key="mandir"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="mt-4 flex flex-col items-center px-6"
          >
            <p className="font-display text-lg font-semibold text-white">
              {deity.greeting}, {user.greetingName} 🙏
            </p>
            <p className="mt-1 text-xs text-white/70">{today} · {deity.name} ka din</p>

            <div className="relative mt-8 flex h-56 w-56 items-center justify-center">
              <div
                className="absolute inset-0 animate-pulse-glow rounded-full"
                style={{ boxShadow: `0 0 60px 20px ${deity.color}55` }}
              />
              <div
                className="flex h-48 w-48 items-center justify-center rounded-full text-8xl shadow-glow"
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
            className="mt-6 flex flex-col items-center px-6"
          >
            <p className="font-display text-lg font-semibold text-white">
              Your blessing has reached everyone 🌼
            </p>
            <p className="mt-1 text-center text-xs text-white/75">
              Diyas are lighting up across the village, house by house.
            </p>

            <div className="mt-8 grid w-full max-w-xs grid-cols-3 gap-4">
              {family.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.4 }}
                  className="flex flex-col items-center gap-1 rounded-2xl bg-white/70 py-3 shadow-warm"
                >
                  <span className="text-2xl">{m.houseEmoji}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 * i + 0.2 }}
                    className="animate-diya text-lg"
                  >
                    🪔
                  </motion.span>
                  <span className="text-[10px] font-medium text-[#5b4636]">{m.name}</span>
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
    </Screen>
  );
}
