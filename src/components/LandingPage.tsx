import React, { useState } from 'react';
import { loginWithGoogle, loginAsGuest } from '../utils/authService';

export const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await loginAsGuest();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#064E3B] text-slate-100 flex flex-col justify-between p-4 select-none">
      {/* Top Brand Bar */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-extrabold text-amber-300 tracking-wider text-lg sm:text-xl">BRIDGE FROM ZERO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-300 font-bold bg-[#033629] px-3 py-1 rounded-full border border-[#055C45]">
            Educational Bridge App
          </span>
        </div>
      </header>

      {/* Main Hero Login Box */}
      <main className="flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center my-8">
        <div className="w-full bg-[#033629] border border-[#055C45] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center space-y-6">
          
          {/* Card Suit Icons Banner */}
          <div className="flex items-center justify-center space-x-3 text-3xl pt-2">
            <span className="text-slate-900 drop-shadow">♠</span>
            <span className="text-rose-500 drop-shadow">♥</span>
            <span className="text-amber-500 drop-shadow">♦</span>
            <span className="text-emerald-400 drop-shadow">♣</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Belajar Bridge Dari Nol
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              Platform interaktif belajar olahraga kartu Bridge modern: Pembelajaran Modul, Latihan Bidding, Game vs Bot, dan Puzzles.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3 pt-2">
            <button
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2.5 transition transform active:scale-98 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z" />
              </svg>
              <span>Masuk dengan Google (1-Klik)</span>
            </button>

            <button
              disabled={loading}
              onClick={handleGuestLogin}
              className="w-full bg-[#02231A] hover:bg-[#044D39] text-emerald-200 font-bold py-3 px-4 rounded-2xl border border-[#055C45] text-xs transition disabled:opacity-50"
            >
              🚀 Masuk Langsung Tanpa Akun (Mode Tamu)
            </button>
          </div>

          <div className="text-[11px] text-emerald-300/60 pt-2 border-t border-[#044D39] w-full">
            Progres belajar otomatis tersimpan di browser & cloud
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto text-center py-4 text-xs text-emerald-300/80 font-medium">
        bridge from zero made by sat
      </footer>
    </div>
  );
};
