import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { familyMembers as initialFamily, user } from '../data/family';

const VillageContext = createContext(null);

const TIME_SKY = {
  morning: 'from-[#FDE8C8] via-[#FBD9A8] to-[#FDF6EC]',
  afternoon: 'from-[#A9D6E5] via-[#CFE8EE] to-[#FDF6EC]',
  evening: 'from-[#6B3FA0] via-[#C17B5A] to-[#F5A623]',
};

export function VillageProvider({ children }) {
  const [family, setFamily] = useState(initialFamily);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [mandirSharedToday, setMandirSharedToday] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('meena');
  const [chowk, setChowk] = useState({ kettleOn: false, present: [] });

  const cycleTimeOfDay = useCallback(() => {
    setTimeOfDay((t) =>
      t === 'morning' ? 'afternoon' : t === 'afternoon' ? 'evening' : 'morning'
    );
  }, []);

  const shareMandir = useCallback(() => {
    setMandirSharedToday(true);
  }, []);

  const bloomGarden = useCallback((memberId) => {
    setFamily((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, gardenState: 'lush', lastConnected: 'Just now' }
          : m
      )
    );
  }, []);

  const putKettleOn = useCallback(() => {
    setChowk({ kettleOn: true, present: ['sunita'] });
  }, []);

  const memberJoinsChowk = useCallback((memberId) => {
    setChowk((prev) =>
      prev.present.includes(memberId)
        ? prev
        : { ...prev, present: [...prev.present, memberId] }
    );
  }, []);

  const leaveChowkQuietly = useCallback(() => {
    setChowk((prev) => ({
      ...prev,
      present: prev.present.filter((id) => id !== 'sunita'),
    }));
  }, []);

  const value = useMemo(
    () => ({
      user,
      family,
      timeOfDay,
      cycleTimeOfDay,
      skyGradient: TIME_SKY[timeOfDay],
      mandirSharedToday,
      shareMandir,
      selectedMemberId,
      setSelectedMemberId,
      bloomGarden,
      chowk,
      putKettleOn,
      memberJoinsChowk,
      leaveChowkQuietly,
    }),
    [
      family,
      timeOfDay,
      cycleTimeOfDay,
      mandirSharedToday,
      shareMandir,
      selectedMemberId,
      bloomGarden,
      chowk,
      putKettleOn,
      memberJoinsChowk,
      leaveChowkQuietly,
    ]
  );

  return (
    <VillageContext.Provider value={value}>{children}</VillageContext.Provider>
  );
}

export function useVillage() {
  const ctx = useContext(VillageContext);
  if (!ctx) throw new Error('useVillage must be used within VillageProvider');
  return ctx;
}
