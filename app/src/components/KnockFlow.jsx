import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import Screen from './Screen';

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
    <Screen className="bg-gradient-to-b from-[#EFE3CE] to-cream">
      <div className="flex items-center gap-3 px-5 pt-6">
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

      <AnimatePresence mode="wait">
        {(step === 'exterior' || step === 'knocking') && (
          <motion.div
            key="exterior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex flex-col items-center px-6"
          >
            <div
              className={`flex h-24 w-32 items-center justify-center rounded-full text-4xl ${
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
                className="relative flex h-40 w-32 flex-col items-center justify-end rounded-t-[60px] rounded-b-xl bg-terracotta/80 pb-6 shadow-warm active:scale-95"
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
            className="mt-16 flex flex-col items-center px-6"
          >
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-terracotta/20 animate-pulse-glow-soft">
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
            className="mt-4 flex flex-col items-center px-6"
          >
            <div className="relative flex h-72 w-full max-w-xs items-center justify-center rounded-[32px] bg-gradient-to-b from-[#F3E2C7] to-[#E9D2AE] shadow-warm">
              <span className="absolute left-6 top-6 text-2xl opacity-70">🪔</span>
              <span className="absolute right-6 top-6 text-2xl opacity-70">🪟</span>
              <div className="flex items-end gap-8">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-5xl">🧕🏽</span>
                  <span className="text-[10px] font-medium text-[#5b4636]">You</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-5xl">{member.emoji}</span>
                  <span className="text-[10px] font-medium text-[#5b4636]">{member.name}</span>
                </div>
              </div>
              <span className="absolute bottom-4 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#5b4636]">
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
            className="mt-10 flex flex-col items-center px-6"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="flex h-28 w-36 items-center justify-center rounded-full bg-deepgreen/20 text-5xl animate-bob"
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
    </Screen>
  );
}
