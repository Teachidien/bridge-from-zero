import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import type { GameMode } from '../store/useGameStore';
import { subscribeToAuthChanges, loginWithGoogle, loginAsGuest, logoutUser } from '../utils/authService';
import { fetchProgressFromFirestore } from '../utils/progressSync';
import type { User } from 'firebase/auth';

export const Navbar: React.FC<{ onOpenAiCoach?: () => void }> = ({ onOpenAiCoach }) => {
  const { activeMode, setActiveMode } = useGameStore();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProgressFromFirestore(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const modes: { id: GameMode; label: string; icon: string }[] = [
    { id: 'learning', label: 'Modul 1-3 (Belajar)', icon: '📚' },
    { id: 'bidding', label: 'Bidding Practice', icon: '🗣️' },
    { id: 'fullgame', label: 'Full Game vs Bot', icon: '🃏' },
    { id: 'puzzle', label: 'Bridge Puzzles', icon: '🧩' },
  ];

  return (
    <header className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center bg-[#033629] rounded-2xl px-4 py-3 shadow-lg gap-3">
      <div className="flex items-center space-x-3">
        <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
        <span className="font-extrabold text-amber-300 tracking-wider text-sm sm:text-base">BRIDGE FROM ZERO</span>
        <span className="text-[10px] sm:text-xs bg-[#02231A] text-emerald-300 px-2.5 py-1 rounded-full font-bold">Spark Plan</span>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 bg-[#02231A] p-1.5 rounded-xl text-xs font-bold">
        {modes.map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md font-extrabold scale-105'
                  : 'text-emerald-200 hover:text-white hover:bg-[#033629]'
              }`}
            >
              <span className="mr-1">{m.icon}</span>
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAiCoach}
          className="bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold px-3 py-1.5 rounded-xl shadow text-xs flex items-center gap-1.5 transition transform active:scale-95"
        >
          <span>💡</span>
          <span>AI Pelatih</span>
        </button>

        {user ? (
          <div className="flex items-center gap-2 bg-[#02231A] p-1 rounded-xl border border-[#044D39]">
            {user.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" />
            ) : (
              <span className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] font-bold">
                👤
              </span>
            )}
            <span className="text-[11px] font-bold text-emerald-200 max-w-[80px] truncate">
              {user.displayName || (user.isAnonymous ? 'Mode Tamu' : 'Pemain')}
            </span>
            <button
              onClick={() => logoutUser()}
              className="text-[10px] bg-rose-700 hover:bg-rose-600 text-white px-2 py-0.5 rounded-md font-bold transition"
            >
              Keluar
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={() => loginWithGoogle()}
              className="bg-[#059669] hover:bg-[#047857] text-white font-extrabold px-2.5 py-1.5 rounded-xl text-xs shadow flex items-center gap-1 transition"
            >
              <span>🔑</span>
              <span>Google 1-Klik</span>
            </button>
            <button
              onClick={() => loginAsGuest()}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-2 py-1.5 rounded-xl text-xs transition"
            >
              Tamu
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
