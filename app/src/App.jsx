import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import VillageHome from './components/VillageHome';
import MorningFlow from './components/MorningFlow';
import KnockFlow from './components/KnockFlow';
import ChaiFlow from './components/ChaiFlow';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';

export default function App() {
  const location = useLocation();

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-cream">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<VillageHome />} />
          <Route path="/morning" element={<MorningFlow />} />
          <Route path="/knock" element={<KnockFlow />} />
          <Route path="/chai" element={<ChaiFlow />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
