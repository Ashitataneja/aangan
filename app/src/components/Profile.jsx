import { useNavigate } from 'react-router-dom';
import { useVillage } from '../state/VillageContext';
import Screen from './Screen';

export default function Profile() {
  const navigate = useNavigate();
  const { user, family } = useVillage();

  return (
    <Screen className="bg-gradient-to-b from-[#FDE8C8]/60 to-cream">
      <div className="flex items-center gap-3 px-5 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#5b4636] shadow-sm"
        >
          ←
        </button>
        <p className="text-sm font-medium text-[#5b4636]">Your aangan</p>
      </div>

      <div className="mt-8 flex flex-col items-center px-6">
        <div className="relative flex flex-col items-center">
          <div className="blob-c flex h-24 w-24 items-center justify-center bg-gradient-to-b from-[#F6E3C4] to-terracotta/40 text-5xl shadow-warm ring-2 ring-white/60">
            🧕🏽
          </div>
          <span className="-mt-1.5 h-2.5 w-14 rounded-full ground-shadow" />
        </div>
        <p className="mt-3 font-display text-lg font-bold text-[#4a3527]">{user.name}</p>
        <p className="text-xs text-[#8a7767]">{user.age} · {user.location}</p>

        <div className="mt-8 w-full max-w-xs rounded-[28px] bg-white/70 p-4 shadow-warm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#a08f78]">
            Your village
          </p>
          {family.map((m, i) => {
            const blobs = ['blob-a', 'blob-b', 'blob-c', 'blob-d', 'blob-b'];
            return (
              <div key={m.id} className="flex items-center justify-between py-2 text-sm">
                <span className="flex items-center gap-2.5 text-[#5b4636]">
                  <span
                    className={`${blobs[i % blobs.length]} flex h-8 w-8 items-center justify-center bg-gradient-to-b from-white to-[#EAD9BC] text-sm`}
                  >
                    {m.houseEmoji}
                  </span>
                  <span className="font-display font-semibold">{m.name}</span>
                </span>
                <span className="text-xs text-[#a08f78]">{m.relation}</span>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-xs text-center text-xs text-[#a08f78]">
          Aangan keeps your family close, one warm visit at a time. 🌿
        </p>
      </div>
    </Screen>
  );
}
