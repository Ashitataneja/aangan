import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const items = [
  { key: 'village', path: '/', label: 'Village', emoji: '🏡' },
  { key: 'mandir', path: '/morning', label: 'Mandir', emoji: '🛕' },
  { key: 'chowk', path: '/chai', label: 'Chowk', emoji: '☕' },
  { key: 'profile', path: '/profile', label: 'Profile', emoji: '🧕🏽' },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[430px]">
      <div className="mx-3 mb-3 flex items-center justify-between rounded-[26px] border border-white/60 bg-white/80 px-2 py-2 shadow-warm backdrop-blur-md">
        {items.map((item) => {
          const active =
            item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="sticker-sm absolute inset-0 rounded-2xl bg-gradient-to-b from-saffron to-[#E8901A]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative text-xl transition-transform ${
                  active ? 'scale-110' : 'opacity-60'
                }`}
              >
                {item.emoji}
              </span>
              <span
                className={`relative font-display text-[10px] font-bold ${
                  active ? 'text-white' : 'text-[#8a7767]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
