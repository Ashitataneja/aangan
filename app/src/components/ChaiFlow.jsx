import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import Screen from './Screen';
import WaveDivider from './WaveDivider';

const AVATARS = { sunita: '🧕🏽', priya: '👩🏽', rahul: '🧑🏽', papa: '👴🏽', meena: '👵🏽', chachi: '👩🏽‍🦳' };

export default function ChaiFlow() {
  const navigate = useNavigate();
  const { family, chowk, putKettleOn, memberJoinsChowk, leaveChowkQuietly } = useVillage();
  const [step, setStep] = useState(chowk.kettleOn ? 'chowk' : 'kettle');
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (step !== 'kettle') return;
    const t = setTimeout(() => {
      putKettleOn();
      setStep('chowk');
    }, 1500);
    return () => clearTimeout(t);
  }, [step, putKettleOn]);

  useEffect(() => {
    if (step !== 'chowk') return;
    const t = setTimeout(() => {
      memberJoinsChowk('rahul');
      setNotice('rahul');
      setStep('joining');
    }, 2000);
    return () => clearTimeout(t);
  }, [step, memberJoinsChowk]);

  useEffect(() => {
    if (step !== 'joining') return;
    const t = setTimeout(() => setStep('together'), 1400);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 'together') return;
    const t = setTimeout(() => memberJoinsChowk('priya'), 2600);
    return () => clearTimeout(t);
  }, [step, memberJoinsChowk]);

  const present = ['sunita', ...chowk.present.filter((id) => id !== 'sunita')];
  const presentMembers = present.map((id) =>
    id === 'sunita'
      ? { id: 'sunita', name: 'You' }
      : family.find((m) => m.id === id)
  ).filter(Boolean);

  const handleLeave = () => {
    leaveChowkQuietly();
    setStep('left');
  };

  return (
    <Screen className="relative overflow-hidden bg-gradient-to-b from-[#FDE8C8] to-cream">
      <span className="pointer-events-none absolute right-5 top-16 animate-sway-slow text-xl opacity-30">🌿</span>
      <div className="relative flex items-center gap-3 px-5 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#5b4636] shadow-sm"
        >
          ←
        </button>
        <p className="text-sm font-medium text-[#5b4636]">Chowk · village square</p>
      </div>
      <WaveDivider color="#F5A623" className="relative mt-3" />

      <AnimatePresence mode="wait">
        {step === 'kettle' && (
          <motion.div
            key="kettle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-14 flex flex-col items-center px-6"
          >
            <div className="sticker relative flex h-32 w-32 items-center justify-center rounded-full bg-saffron/20">
              <span className="text-6xl">🫖</span>
              <span className="absolute -top-2 left-9 animate-steam text-2xl">〰️</span>
              <span
                className="absolute -top-2 left-16 animate-steam text-2xl"
                style={{ animationDelay: '0.7s' }}
              >
                〰️
              </span>
            </div>
            <p className="mt-6 text-sm font-medium text-[#5b4636]">Putting the kettle on…</p>
          </motion.div>
        )}

        {(step === 'chowk' || step === 'joining') && (
          <motion.div
            key="chowk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col items-center px-6"
          >
            <div className="sticker relative flex h-24 w-24 items-center justify-center rounded-full bg-saffron/25 animate-pulse-glow-soft">
              <span className="text-5xl">🫖</span>
            </div>
            <p className="mt-4 max-w-xs text-center text-sm font-medium text-[#4a3527]">
              You've put the kettle on. Family can see this and drop by.
            </p>

            <div className="mt-6 grid grid-cols-5 gap-3">
              {family.map((m, i) => {
                const isPresent = chowk.present.includes(m.id);
                const blobs = ['blob-a', 'blob-b', 'blob-c', 'blob-d', 'blob-b'];
                return (
                  <div key={m.id} className="flex flex-col items-center gap-1">
                    <div
                      className={`sticker-sm ${blobs[i % blobs.length]} flex h-10 w-10 items-center justify-center text-lg ${
                        isPresent ? 'bg-gold/25 animate-pulse-glow-soft' : 'bg-white/60 opacity-60'
                      }`}
                    >
                      {m.houseEmoji}
                    </div>
                    <span className="text-[9px] text-[#8a7767]">{m.name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>

            <AnimatePresence>
              {step === 'joining' && notice && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-8 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-warm"
                >
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    className="text-xl"
                  >
                    {AVATARS[notice]}
                  </motion.span>
                  <span className="text-xs font-medium text-[#5b4636]">
                    {family.find((m) => m.id === notice)?.name} is walking over ☕
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {step === 'together' && (
          <motion.div
            key="together"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex flex-col items-center px-6"
          >
            <div className="relative flex h-72 w-full max-w-xs flex-col items-center overflow-hidden rounded-[32px] bg-gradient-to-b from-[#F3E2C7] to-[#E9D2AE] shadow-warm">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-28"
                style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(245,166,35,0.3), transparent 70%)' }}
              />
              <div className="mt-14 flex flex-1 items-end gap-6">
                {presentMembers.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="text-4xl">{AVATARS[m.id] ?? '🧑🏽'}</span>
                    <span className="h-2.5 w-12 rounded-[50%] bg-terracotta/40 blur-[1px]" />
                    <span className="font-display text-[10px] font-semibold text-[#5b4636]">{m.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="relative -mt-2 mb-3 flex h-14 w-14 items-center justify-center">
                <span className="absolute h-10 w-10 animate-pulse-glow-soft rounded-full bg-saffron/40 blur-md" />
                <span className="relative text-3xl">🔥</span>
              </div>

              <div className="flex items-end gap-1 pb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="animate-wave-bar block h-4 w-1.5 rounded-full bg-terracotta/50"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>

              {/* woven mat floor */}
              <div
                className="h-6 w-full"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(193,123,90,0.3) 0px, rgba(193,123,90,0.3) 10px, rgba(212,160,23,0.25) 10px, rgba(212,160,23,0.25) 20px)',
                }}
              />
            </div>

            <p className="mt-4 text-center text-xs text-[#8a7767]">
              No agenda. Just ambient company, like sitting in the same room.
            </p>

            <button
              onClick={handleLeave}
              className="mt-8 rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-[#5b4636] shadow-warm active:scale-95"
            >
              Leave quietly
            </button>
          </motion.div>
        )}

        {step === 'left' && (
          <motion.div
            key="left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-14 flex flex-col items-center px-6"
          >
            <div className="sticker flex h-24 w-24 items-center justify-center rounded-full bg-saffron/20 text-5xl animate-pulse-glow-soft">
              🫖
            </div>
            <p className="mt-6 max-w-xs text-center text-sm font-medium text-[#4a3527]">
              You left quietly. The chai is still on for others.
            </p>
            <p className="mt-1 text-xs text-[#a08f78]">The chowk stays warm ✨</p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 rounded-full bg-deepgreen/90 px-7 py-3 text-sm font-semibold text-white shadow-warm active:scale-95"
            >
              Return to the village
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
