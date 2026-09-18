import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import Screen from './Screen';

const gardenStyles = {
  lush: {
    mound: 'bg-deepgreen/25',
    flowers: '🌸🌿🌼',
    label: 'blooming',
    labelColor: 'text-deepgreen',
    bounce: true,
  },
  wilting: {
    mound: 'bg-[#9C9280]/40',
    flowers: '🥀🍂',
    label: 'fading',
    labelColor: 'text-[#8a7767]',
    bounce: false,
  },
  fading: {
    mound: 'bg-[#B7AE9C]/40',
    flowers: '🍂',
    label: 'thirsty',
    labelColor: 'text-[#a08f78]',
    bounce: false,
  },
};

function Garden({ state }) {
  const g = gardenStyles[state] ?? gardenStyles.lush;
  return (
    <div
      className={`flex h-5 w-14 items-center justify-center rounded-full text-[11px] ${g.mound} ${
        g.bounce ? 'animate-bob' : ''
      }`}
      title={g.label}
    >
      {g.flowers}
    </div>
  );
}

function HouseNode({ member, onTap }) {
  return (
    <button
      onClick={() => onTap(member)}
      className="absolute flex -translate-x-1/2 flex-col items-center gap-1"
      style={{ top: `${member.top}%`, left: `${member.left}%` }}
    >
      <div className="relative">
        {member.active && (
          <span className="absolute -right-0.5 -top-0.5 z-10 h-2.5 w-2.5 animate-twinkle rounded-full bg-gold ring-2 ring-cream" />
        )}
        <div className="flex h-12 w-12 items-center justify-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-white/70 text-2xl shadow-warm">
          {member.houseEmoji}
        </div>
      </div>
      <Garden state={member.gardenState} />
      <span className="max-w-[70px] truncate text-[11px] font-semibold text-[#5b4636]">
        {member.name}
      </span>
    </button>
  );
}

export default function VillageHome() {
  const navigate = useNavigate();
  const {
    user,
    family,
    timeOfDay,
    cycleTimeOfDay,
    skyGradient,
    mandirSharedToday,
    setSelectedMemberId,
    chowk,
  } = useVillage();
  const [walking, setWalking] = useState(null);

  const dayLabel = {
    morning: '🌅 Morning',
    afternoon: '☀️ Afternoon',
    evening: '🌇 Evening',
  }[timeOfDay];

  const goTo = (path, opts = {}) => {
    setWalking({ emoji: opts.emoji ?? '🚶🏽‍♀️', top: opts.top ?? 50, left: opts.left ?? 50 });
    window.setTimeout(() => {
      if (opts.memberId) setSelectedMemberId(opts.memberId);
      navigate(path);
    }, 420);
  };

  return (
    <Screen>
      <div
        className={`relative overflow-hidden rounded-b-[32px] bg-gradient-to-b ${skyGradient} pb-4 pt-5`}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-5">
          <div>
            <p className="font-display text-lg font-bold text-[#4a3527]">
              आँगन <span className="font-sans text-sm font-medium text-[#7a6753]">Aangan</span>
            </p>
            <p className="text-xs text-[#7a6753]">Sunita ke gaon mein</p>
          </div>
          <button
            onClick={cycleTimeOfDay}
            className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-[#5b4636] shadow-sm"
          >
            {dayLabel}
          </button>
        </div>

        {/* decorative clouds */}
        <div className="pointer-events-none absolute left-6 top-4 animate-cloud text-2xl opacity-70">
          ☁️
        </div>
        <div className="pointer-events-none absolute right-10 top-10 animate-cloud text-xl opacity-60" style={{ animationDelay: '2s' }}>
          ☁️
        </div>

        {/* village map */}
        <div className="relative mx-3 mt-4 h-[min(62vh,560px)] min-h-[440px] rounded-[28px] bg-[#EFE3CE]/60">
          {/* mandir */}
          <button
            onClick={() => goTo('/morning', { emoji: '🛕', top: 6, left: 50 })}
            className="absolute left-1/2 top-2 flex -translate-x-1/2 flex-col items-center gap-1"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-warm ${
                timeOfDay === 'morning' ? 'animate-pulse-glow' : ''
              }`}
            >
              🛕
            </div>
            {mandirSharedToday && (
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">
                shared today ✨
              </span>
            )}
            <span className="text-[11px] font-semibold text-[#5b4636]">Mandir</span>
          </button>

          {/* trees */}
          <span className="absolute left-2 top-24 animate-sway text-2xl">🌳</span>
          <span className="absolute right-3 top-32 animate-sway-slow text-2xl">🌴</span>
          <span className="absolute bottom-24 left-4 animate-sway text-xl">🌿</span>

          {/* family houses */}
          {family.map((member) => (
            <HouseNode
              key={member.id}
              member={member}
              onTap={(m) =>
                goTo('/knock', {
                  emoji: m.houseEmoji,
                  top: m.top,
                  left: m.left,
                  memberId: m.id,
                })
              }
            />
          ))}

          {/* chowk */}
          <button
            onClick={() => goTo('/chai', { emoji: '☕', top: 62, left: 44 })}
            className="absolute flex -translate-x-1/2 flex-col items-center gap-1"
            style={{ top: '62%', left: '44%' }}
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-xl shadow-warm ${
                chowk.kettleOn ? 'bg-saffron/30 animate-pulse-glow-soft' : 'bg-white/70'
              }`}
            >
              🫖
            </div>
            <span className="text-[11px] font-semibold text-[#5b4636]">
              Chowk{chowk.kettleOn ? ' · warm' : ''}
            </span>
          </button>

          {/* user's house */}
          <div
            className="absolute flex -translate-x-1/2 flex-col items-center gap-1"
            style={{ top: '88%', left: '50%' }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-terracotta/20 text-3xl ring-2 ring-terracotta/40 shadow-warm">
              🏡
            </div>
            <span className="text-xs font-bold text-terracotta">{user.name}'s Ghar (you)</span>
          </div>

          {/* walking transition figure */}
          <AnimatePresence>
            {walking && (
              <motion.span
                key="walker"
                initial={{ top: '88%', left: '50%', opacity: 0, scale: 0.6 }}
                animate={{
                  top: `${walking.top}%`,
                  left: `${walking.left}%`,
                  opacity: [0, 1, 1, 0],
                  scale: 1.3,
                }}
                transition={{ duration: 0.42, ease: 'easeInOut' }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-3xl"
              >
                {walking.emoji}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 px-5 text-center text-xs text-[#8a7767]">
        Tap the mandir, a family house, or the chowk kettle to visit 🌿
      </div>
    </Screen>
  );
}
