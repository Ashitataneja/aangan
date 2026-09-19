import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import Screen from './Screen';
import WaveDivider from './WaveDivider';

function useTimer(active) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function KnockFlow() {
  const navigate = useNavigate();
  const { family, selectedMemberId, bloomGarden } = useVillage();
  const member = family.find((m) => m.id === selectedMemberId) ?? family[0];

  const [step, setStep] = useState('exterior'); // exterior | knocking | waiting | connected | ended
  const [muted, setMuted] = useState(false);
  const timer = useTimer(step === 'connected');

  useEffect(() => {
    if (step === 'knocking') {
      const t = setTimeout(() => setStep('waiting'), 900);
      return () => clearTimeout(t);
    }
    if (step === 'waiting') {
      const t = setTimeout(() => setStep('connected'), 2400);
      return () => clearTimeout(t);
    }
  }, [step]);

  const endCall = () => {
    bloomGarden(member.id);
    setStep('ended');
  };

  const isFadingGarden = member.gardenState !== 'lush';

  return (
    <Screen className="relative overflow-hidden bg-gradient-to-b from-[#F6E7C8] via-[#EFE3CE] to-cream">
      <span className="pointer-events-none absolute left-4 top-20 text-2xl opacity-40">🌳</span>
      <span className="pointer-events-none absolute right-6 top-32 text-xl opacity-30">🌿</span>
      <div className="relative flex items-center gap-3 px-5 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#5b4636] shadow-sm"
        >
          ←
        </button>
        <p className="text-sm font-medium text-[#5b4636]">
          {member.name}'s house · {member.location}
        </p>
      </div>
      <WaveDivider color="#C17B5A" className="relative mt-3" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-10">
      <AnimatePresence mode="wait">
        {(step === 'exterior' || step === 'knocking') && (
          <motion.div
            key="exterior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div
              className={`sticker blob-b flex h-24 w-32 items-center justify-center text-4xl ${
                isFadingGarden ? 'bg-[#B7AE9C]/40' : 'bg-deepgreen/20'
              }`}
            >
              {isFadingGarden ? '🥀🍂🥀' : '🌸🌿🌼'}
            </div>
            {member.lastConnected && isFadingGarden && (
              <p className="mt-2 text-[11px] italic text-[#a08f78]">
                Last connected: {member.lastConnected}
              </p>
            )}

            <div className="relative mt-8">
              <button
                onClick={() => setStep('knocking')}
                className="sticker relative flex h-40 w-32 flex-col items-center justify-end rounded-t-[60px] rounded-b-xl bg-gradient-to-b from-[#D68F68] to-terracotta pb-6 active:scale-95"
              >
                <span className="absolute top-8 text-4xl">🚪</span>
                {step === 'knocking' && (
                  <>
                    <span className="absolute top-8 h-14 w-14 animate-ripple rounded-full border-2 border-white/80" />
                    <span
                      className="absolute top-8 h-14 w-14 animate-ripple rounded-full border-2 border-white/80"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-[#8a7767]">
                {step === 'knocking' ? 'Knock knock... 👋' : 'Tap the door to visit'}
              </p>
            </div>
          </motion.div>
        )}

        {step === 'waiting' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="sticker blob-b relative flex h-32 w-32 items-center justify-center bg-terracotta/20 animate-pulse-glow-soft">
              <span className="text-6xl">🚪</span>
            </div>
            <p className="mt-6 text-center text-sm font-medium text-[#5b4636]">
              Waiting for {member.name} to open the door
              <span className="inline-block animate-bob">...</span>
            </p>
            <p className="mt-2 text-xs text-[#a08f78]">The village lets them know you're here</p>
          </motion.div>
        )}

        {step === 'connected' && (
          <motion.div
            key="connected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative flex h-80 w-full max-w-xs flex-col items-center overflow-hidden rounded-[32px] bg-gradient-to-b from-[#F3E2C7] to-[#E9D2AE] shadow-warm">
              {/* ambient warm light */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-32"
                style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(245,166,35,0.25), transparent 70%)' }}
              />
              <div className="arch-shape absolute left-6 top-5 h-12 w-9 overflow-hidden bg-gradient-to-b from-white/70 to-[#A9D6E5]/50">
                <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-white/70" />
                <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-white/70" />
              </div>
              <span className="absolute right-7 top-6 animate-diya text-2xl">🪔</span>

              <div className="mt-16 flex flex-1 items-end gap-10">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-5xl">🧕🏽</span>
                  <span className="h-2.5 w-14 rounded-[50%] bg-terracotta/40 blur-[1px]" />
                  <span className="font-display text-[10px] font-semibold text-[#5b4636]">You</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-5xl">{member.emoji}</span>
                  <span className="h-2.5 w-14 rounded-[50%] bg-purple/30 blur-[1px]" />
                  <span className="font-display text-[10px] font-semibold text-[#5b4636]">{member.name}</span>
                </div>
              </div>

              {/* woven rug floor */}
              <div
                className="mt-3 h-8 w-full"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(193,123,90,0.35) 0px, rgba(193,123,90,0.35) 10px, rgba(212,160,23,0.3) 10px, rgba(212,160,23,0.3) 20px)',
                }}
              />

              <span className="absolute bottom-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#5b4636] shadow-sm">
                {timer}
              </span>
            </div>

            <p className="mt-4 text-center text-xs text-[#8a7767]">
              Just sitting together, like the old days ☕
            </p>

            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={() => setMuted((m) => !m)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-sm ${
                  muted ? 'bg-[#5b4636] text-white' : 'bg-white/80 text-[#5b4636]'
                }`}
              >
                {muted ? '🔇' : '🎙️'}
              </button>
              <button
                onClick={endCall}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-2xl text-white shadow-warm active:scale-95"
              >
                📞
              </button>
            </div>
          </motion.div>
        )}

        {step === 'ended' && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="sticker blob-a flex h-28 w-36 items-center justify-center bg-deepgreen/20 text-5xl animate-bob"
            >
              🌸🌿🌼
            </motion.div>
            <p className="mt-6 max-w-xs text-center text-sm font-medium text-[#4a3527]">
              Your garden with {member.name} is blooming again 🌸
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 rounded-full bg-deepgreen/90 px-7 py-3 text-sm font-semibold text-white shadow-warm active:scale-95"
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
