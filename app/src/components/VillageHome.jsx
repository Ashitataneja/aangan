import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillage } from '../state/VillageContext';
import Screen from './Screen';

const USER_POS = { top: 91, left: 50 };

const gardenStyles = {
  lush: {
    flowers: '🌸🌿🌼',
    label: 'blooming',
    pillBg: 'bg-deepgreen/20',
    bounce: true,
    hut: 'from-[#F6E3C4] to-[#E9C99A]',
    aura: 'shadow-[0_0_0_7px_rgba(212,160,23,0.16)]',
    pathStroke: '#C17B5A',
    pathOpacity: 0.6,
    pathDash: undefined,
    pathWidth: 0.7,
  },
  wilting: {
    flowers: '🥀🍂',
    label: 'fading',
    pillBg: 'bg-[#9C9280]/30',
    bounce: false,
    hut: 'from-[#E4DAC3] to-[#CBBD9E]',
    aura: 'shadow-[0_0_0_6px_rgba(140,130,110,0.22)]',
    pathStroke: '#A08F78',
    pathOpacity: 0.5,
    pathDash: '2.2 2.4',
    pathWidth: 0.55,
  },
  fading: {
    flowers: '🍂',
    label: 'thirsty',
    pillBg: 'bg-[#B7AE9C]/30',
    bounce: false,
    hut: 'from-[#DED4BE] to-[#C4B89C]',
    aura: 'shadow-[0_0_0_5px_rgba(150,140,120,0.16)]',
    pathStroke: '#B7AE9C',
    pathOpacity: 0.4,
    pathDash: '1 3.2',
    pathWidth: 0.45,
  },
};

function Garden({ state }) {
  const g = gardenStyles[state] ?? gardenStyles.lush;
  return (
    <div
      className={`flex h-5 w-14 items-center justify-center rounded-full text-[11px] ${g.pillBg} ${
        g.bounce ? 'animate-bob' : ''
      }`}
      title={g.label}
    >
      {g.flowers}
    </div>
  );
}

function HouseNode({ member, onTap }) {
  const g = gardenStyles[member.gardenState] ?? gardenStyles.lush;
  return (
    <button
      onClick={() => onTap(member)}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
      style={{ top: `${member.top}%`, left: `${member.left}%` }}
    >
      <div className="relative flex flex-col items-center">
        {member.active && (
          <span className="absolute -right-1 -top-1 z-10 h-2.5 w-2.5 animate-twinkle rounded-full bg-gold ring-2 ring-cream" />
        )}
        <div
          className={`sticker flex h-14 w-14 items-center justify-center bg-gradient-to-b text-2xl ${g.hut} ${g.aura} ${
            member.blob ?? 'blob-a'
          }`}
        >
          {member.houseEmoji}
        </div>
        <span className="-mt-1.5 h-2 w-9 rounded-full ground-shadow" />
      </div>
      <Garden state={member.gardenState} />
      <span className="max-w-[72px] truncate font-display text-xs font-bold text-[#4a3527]">
        {member.name}
      </span>
    </button>
  );
}

function VillagePaths({ family }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      {family.map((m) => {
        const g = gardenStyles[m.gardenState] ?? gardenStyles.lush;
        return (
          <line
            key={m.id}
            x1={USER_POS.left}
            y1={USER_POS.top}
            x2={m.left}
            y2={m.top}
            stroke={g.pathStroke}
            strokeOpacity={g.pathOpacity}
            strokeWidth={g.pathWidth}
            strokeDasharray={g.pathDash}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
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

  const dayMeta = {
    morning: { label: '🌅 Morning', orb: '☀️', orbGlow: 'rgba(245,166,35,0.5)' },
    afternoon: { label: '☀️ Afternoon', orb: '🌤️', orbGlow: 'rgba(169,214,229,0.6)' },
    evening: { label: '🌇 Evening', orb: '🌙', orbGlow: 'rgba(107,63,160,0.5)' },
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
        className={`relative overflow-hidden rounded-b-[36px] bg-gradient-to-b ${skyGradient} pb-4 pt-5`}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-5">
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#8a7767]">आँगन</p>
            <p className="font-display text-xl font-bold leading-tight text-[#4a3527]">
              Aangan
            </p>
            <p className="text-xs text-[#7a6753]">Sunita ke gaon mein</p>
          </div>
          <button
            onClick={cycleTimeOfDay}
            className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-[#5b4636] shadow-sm"
          >
            {dayMeta.label}
          </button>
        </div>

        {/* sky orb */}
        <div
          className="pointer-events-none absolute right-6 top-3 flex h-14 w-14 items-center justify-center rounded-full text-3xl"
          style={{ boxShadow: `0 0 32px 10px ${dayMeta.orbGlow}` }}
        >
          {dayMeta.orb}
        </div>

        {/* decorative clouds */}
        <div className="pointer-events-none absolute left-6 top-4 animate-cloud text-2xl opacity-70">
          ☁️
        </div>
        <div
          className="pointer-events-none absolute right-24 top-14 animate-cloud text-lg opacity-50"
          style={{ animationDelay: '2s' }}
        >
          ☁️
        </div>

        {/* village map */}
        <div className="relative mx-3 mt-4 h-[min(68vh,620px)] min-h-[480px] overflow-hidden rounded-[32px] shadow-[inset_0_2px_10px_rgba(58,46,39,0.12)]">
          {/* ground texture */}
          <div
            className="grain absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 30% 20%, rgba(45,80,22,0.10), transparent 60%), radial-gradient(ellipse 55% 45% at 80% 75%, rgba(212,160,23,0.12), transparent 60%), radial-gradient(ellipse 70% 50% at 50% 95%, rgba(193,123,90,0.14), transparent 65%), #EFE3CE',
            }}
          />

          <VillagePaths family={family} />

          {/* mandir */}
          <button
            onClick={() => goTo('/morning', { emoji: '🛕', top: 6, left: 50 })}
            className="absolute left-1/2 top-1 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`sticker arch-shape flex h-16 w-16 items-center justify-center bg-gradient-to-b from-[#FCE7B8] to-[#F0BE6A] text-3xl ${
                  timeOfDay === 'morning' ? 'animate-pulse-glow' : ''
                }`}
              >
                🛕
              </div>
              <span className="-mt-1 h-2.5 w-11 rounded-b-md bg-gradient-to-b from-[#D4A017]/70 to-[#D4A017]/40" />
            </div>
            {mandirSharedToday && (
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">
                shared today ✨
              </span>
            )}
            <span className="font-display text-[11px] font-semibold text-[#5b4636]">Mandir</span>
          </button>

          {/* trees */}
          <span className="absolute left-2 top-28 z-10 animate-sway text-2xl">🌳</span>
          <span className="absolute right-3 top-36 z-10 animate-sway-slow text-2xl">🌴</span>
          <span className="absolute bottom-28 left-4 z-10 animate-sway text-xl">🌿</span>

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
            onClick={() => goTo('/chai', { emoji: '☕', top: 66, left: 42 })}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ top: '66%', left: '42%' }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`sticker-sm flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                  chowk.kettleOn
                    ? 'bg-gradient-to-b from-saffron/40 to-terracotta/30 animate-pulse-glow-soft'
                    : 'bg-gradient-to-b from-white/80 to-[#EAD9BC]'
                }`}
              >
                🫖
              </div>
              <span className="-mt-1 h-2 w-8 rounded-full ground-shadow" />
            </div>
            <span className="font-display text-[11px] font-semibold text-[#5b4636]">
              Chowk{chowk.kettleOn ? ' · warm' : ''}
            </span>
          </button>

          {/* user's house */}
          <div
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ top: `${USER_POS.top}%`, left: `${USER_POS.left}%` }}
          >
            <div className="relative flex flex-col items-center">
              <div className="sticker blob-c flex h-[4.5rem] w-[4.5rem] items-center justify-center bg-gradient-to-b from-[#E9A57C] to-terracotta text-3xl">
                🏡
              </div>
              <span className="-mt-1.5 h-2.5 w-12 rounded-full ground-shadow" />
            </div>
            <span className="font-display text-xs font-bold text-terracotta">
              {user.name}'s Ghar (you)
            </span>
          </div>

          {/* walking transition figure */}
          <AnimatePresence>
            {walking && (
              <motion.span
                key="walker"
                initial={{ top: `${USER_POS.top}%`, left: `${USER_POS.left}%`, opacity: 0, scale: 0.6 }}
                animate={{
                  top: `${walking.top}%`,
                  left: `${walking.left}%`,
                  opacity: [0, 1, 1, 0],
                  scale: 1.3,
                }}
                transition={{ duration: 0.42, ease: 'easeInOut' }}
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 text-3xl"
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
