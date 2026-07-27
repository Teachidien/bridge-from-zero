import React, { useState } from 'react';
import { CardHand } from './CardHand';
import type { Card } from '../types/card';

// Sample 13 Kartu Tangan untuk Modul 3 (A♠=4, K♠=3, Q♥=2, J♦=1, A♣=4 -> Total = 14 HCP)
const SAMPLE_CARDS: Card[] = [
  { id: 'm3-s-A', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
  { id: 'm3-s-K', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
  { id: 'm3-s-10', suit: 'spades', rank: '10', value: 10, hcp: 0 },
  { id: 'm3-h-Q', suit: 'hearts', rank: 'Q', value: 12, hcp: 2 },
  { id: 'm3-h-7', suit: 'hearts', rank: '7', value: 7, hcp: 0 },
  { id: 'm3-h-2', suit: 'hearts', rank: '2', value: 2, hcp: 0 },
  { id: 'm3-d-J', suit: 'diamonds', rank: 'J', value: 11, hcp: 1 },
  { id: 'm3-d-9', suit: 'diamonds', rank: '9', value: 9, hcp: 0 },
  { id: 'm3-d-4', suit: 'diamonds', rank: '4', value: 4, hcp: 0 },
  { id: 'm3-c-A', suit: 'clubs', rank: 'A', value: 14, hcp: 4 },
  { id: 'm3-c-8', suit: 'clubs', rank: '8', value: 8, hcp: 0 },
  { id: 'm3-c-5', suit: 'clubs', rank: '5', value: 5, hcp: 0 },
  { id: 'm3-c-2', suit: 'clubs', rank: '2', value: 2, hcp: 0 },
];

export const Module3Lesson: React.FC = () => {
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);

  const honors = [
    { rank: 'A', points: 4 },
    { rank: 'K', points: 3 },
    { rank: 'Q', points: 2 },
    { rank: 'J', points: 1 },
  ];

  return (
    <div className="bg-[#F1F5F9] text-slate-800 min-h-screen flex flex-col justify-between p-3 sm:p-6 select-none">
      
      {/* Header Modul */}
      <header className="w-full max-w-4xl mx-auto flex flex-col space-y-3 py-2 px-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              MODUL 3: MENGHITUNG POIN KARTU (HCP)
            </span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            Tingkat 1 (Pemula)
          </span>
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full w-full transition-all duration-500"></div>
        </div>
      </header>

      {/* Konten Utama Modul 3 */}
      <main className="flex-1 max-w-3xl mx-auto w-full flex flex-col items-center justify-center my-4">
        <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col space-y-6">
          
          {/* Rumus HCP Ringkas Horizontal */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🧮</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">Nilai Poin Kartu Honor (HCP):</span>
            </div>

            <div className="flex items-center gap-2">
              {honors.map(({ rank, points }) => (
                <span key={rank} className="bg-white border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                  <span>{rank}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] px-1.5 py-0.5 rounded-md font-extrabold">{points}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Visualisasi Kartu di Tangan */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-700">HITUNG TOTAL POIN HCP PADA 13 KARTU DI TANGAN ANDA:</span>
            
            <div className="bg-[#0B231B] p-3 rounded-2xl border border-emerald-900 shadow-inner">
              <CardHand cards={SAMPLE_CARDS} />
            </div>
          </div>

          {/* Kuis Interaktif */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-600 tracking-wider">🎯 KUIS HITUNG HCP</span>
              <span className="text-[10px] text-slate-500 font-bold">Soal 3 dari 3</span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-900">
              Berapa total nilai High Card Points (HCP) pada 13 kartu di tangan Anda di atas?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[10, 12, 14, 16].map((pts) => (
                <button
                  key={pts}
                  onClick={() => setSelectedPoints(pts)}
                  className="bg-white hover:bg-emerald-50 text-center p-3 rounded-xl border border-slate-300 font-bold text-sm text-slate-800 shadow-sm transition"
                >
                  {pts} Poin
                </button>
              ))}
            </div>

            {selectedPoints !== null && (
              <div className={`p-3 rounded-xl text-xs font-bold border ${selectedPoints === 14 ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-rose-100 border-rose-300 text-rose-900'}`}>
                {selectedPoints === 14 ? (
                  <span>🎉 <strong>100% BENAR!</strong> Rinciannya: A♠ (4) + K♠ (3) + Q♥ (2) + J♦ (1) + A♣ (4) = <strong>14 HCP Poin</strong>!</span>
                ) : (
                  <span>❌ <strong>KURANG TEPAT!</strong> Coba hitung kartu Honor Anda: A♠(4) + K♠(3) + Q♥(2) + J♦(1) + A♣(4). Total = 14 Poin!</span>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="max-w-3xl mx-auto w-full flex justify-between items-center pt-2">
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
