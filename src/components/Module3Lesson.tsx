import React, { useState } from 'react';
import { CardHand } from './CardHand';
import { dealHands, evaluateHand } from '../utils/dealer';

export const Module3Lesson: React.FC = () => {
  const [deal, setDeal] = useState(() => dealHands());
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);

  const currentHand = deal.hands.south;
  const currentEval = evaluateHand(currentHand);
  const correctHcp = currentEval.hcp;

  // Generate 4 pilihan jawaban yang mencakup jawaban benar & 3 pengalih sekitarnya
  const generateOptions = (targetHcp: number) => {
    const opts = new Set<number>();
    opts.add(targetHcp);
    const offsets = [-3, -2, -1, 1, 2, 3, 4];
    for (const offset of offsets) {
      const candidate = targetHcp + offset;
      if (candidate >= 0 && candidate <= 37) {
        opts.add(candidate);
      }
      if (opts.size === 4) break;
    }
    return Array.from(opts).sort((a, b) => a - b);
  };

  const options = generateOptions(correctHcp);

  const handleRedeal = () => {
    setDeal(dealHands());
    setSelectedPoints(null);
  };

  const honors = [
    { rank: 'A', points: 4 },
    { rank: 'K', points: 3 },
    { rank: 'Q', points: 2 },
    { rank: 'J', points: 1 },
  ];

  return (
    <div className="bg-[#F1F5F9] text-slate-800 flex flex-col gap-3 p-3 sm:p-5 select-none">
      
      {/* Header Modul */}
      <header className="w-full max-w-4xl mx-auto flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              MODUL 3: MENGHITUNG POIN KARTU (HCP)
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full w-full transition-all duration-500"></div>
        </div>
      </header>

      {/* Konten Utama Modul 3 */}
      <main className="max-w-4xl mx-auto w-full">
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-6 shadow-xl flex flex-col space-y-3 sm:space-y-4">
          
          {/* Rumus HCP Ringkas + Tombol Redeal di Dalamnya */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">HCP:</span>
              <div className="flex items-center gap-1">
                {honors.map(({ rank, points }) => (
                  <span key={rank} className="bg-white border border-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                    <span>{rank}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] px-1 rounded font-extrabold">{points}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleRedeal}
              className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow flex items-center gap-1 transition active:scale-95 ml-auto"
            >
              <span>🔄</span>
              <span>Redeal</span>
            </button>
          </div>

          {/* Visualisasi Kartu di Tangan (Skala 125 di HP) */}
          <div className="bg-[#0B231B] p-2 sm:p-4 rounded-2xl border border-emerald-900 shadow-inner overflow-hidden flex justify-center py-2">
            <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
              <CardHand cards={currentHand} />
            </div>
          </div>

          {/* Kuis Interaktif Ringkas */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-3 sm:p-5 space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm font-extrabold text-slate-900">
              Berapa total HCP kartu di atas?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {options.map((pts) => (
                <button
                  key={pts}
                  onClick={() => setSelectedPoints(pts)}
                  className={`text-center p-2.5 sm:p-3 rounded-xl border font-bold text-xs sm:text-sm transition shadow-sm ${
                    selectedPoints === pts
                      ? pts === correctHcp
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-rose-600 text-white border-rose-700'
                      : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-300'
                  }`}
                >
                  {pts} Poin
                </button>
              ))}
            </div>

            {selectedPoints !== null && (
              <div className={`p-2.5 rounded-xl text-xs font-bold border ${selectedPoints === correctHcp ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-rose-100 border-rose-300 text-rose-900'}`}>
                {selectedPoints === correctHcp ? (
                  <span>🎉 <strong>BENAR!</strong> Total High Card Points (HCP) tangan ini adalah <strong>{correctHcp} HCP Poin</strong>!</span>
                ) : (
                  <span>❌ <strong>KURANG TEPAT.</strong> Jawaban yang benar adalah <strong>{correctHcp} HCP Poin</strong>. Ketuk <strong>Redeal</strong> untuk kartu baru.</span>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto w-full flex justify-between items-center">
        <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
          ⬅️ Sebelumnya
        </button>
        <button className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition">
          🏆 Selesai Tingkat 1 ➔
        </button>
      </footer>

    </div>
  );
};
