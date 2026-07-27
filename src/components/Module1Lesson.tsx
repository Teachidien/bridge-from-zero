import React, { useState } from 'react';

export const Module1Lesson: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const suits = [
    { name: 'Spade (Sekop)', symbol: '♠', color: '#1E293B', category: 'Tinggi #1 (Major)' },
    { name: 'Heart (Hati)', symbol: '♥', color: '#E11D48', category: 'Tinggi #2 (Major)' },
    { name: 'Diamond (Wajik)', symbol: '♦', color: '#D97706', category: 'Tinggi #3 (Minor)' },
    { name: 'Club (Keriting)', symbol: '♣', color: '#059669', category: 'Tinggi #4 (Minor)' },
  ];

  return (
    <div className="bg-[#F1F5F9] text-slate-800 flex flex-col gap-3 p-3 sm:p-5 select-none">
      
      {/* Header Modul */}
      <header className="w-full max-w-4xl mx-auto flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              MODUL 1: PENGENALAN KARTU & SIMBOL
            </span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            Tingkat 1 (Pemula)
          </span>
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full w-1/3 transition-all duration-500"></div>
        </div>
      </header>

      {/* Konten Utama (Template Light Ivory Clean) */}
      <main className="max-w-3xl mx-auto w-full">
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col space-y-4">
          
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>♦️</span> 1. Simbol Kartu Bridge (4-Color Muted Deck)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dalam permainan Bridge, 52 kartu dibagi menjadi 4 simbol (suit). Setiap simbol memiliki hirarki dan warna khusus:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {suits.map((suit) => (
                <div key={suit.name} className="bg-[#F8FAFC] border border-slate-200 p-3.5 rounded-2xl flex flex-col items-center space-y-1 shadow-sm hover:-translate-y-1 transition">
                  <span className="text-2xl font-bold" style={{ color: suit.color }}>{suit.symbol}</span>
                  <span className="font-extrabold text-xs text-slate-900">{suit.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold">{suit.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kuis Interaktif */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-600 tracking-wider">🎯 KUIS CEPAT MODUL 1</span>
              <span className="text-[10px] text-slate-500 font-bold">Soal 1 dari 3</span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-900">
              Manakah di bawah ini yang merupakan simbol <strong className="text-amber-600">Major Suit (Simbol Bernilai Tinggi)</strong>?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => setSelectedAnswer(true)}
                className="bg-white hover:bg-emerald-50 text-left p-3.5 rounded-xl border border-slate-300 transition flex items-center justify-between group shadow-sm"
              >
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">A. Spades (♠) & Hearts (♥)</span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-600">➔</span>
              </button>

              <button
                onClick={() => setSelectedAnswer(false)}
                className="bg-white hover:bg-emerald-50 text-left p-3.5 rounded-xl border border-slate-300 transition flex items-center justify-between group shadow-sm"
              >
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">B. Clubs (♣) & Diamonds (♦)</span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-600">➔</span>
              </button>
            </div>

            {selectedAnswer !== null && (
              <div className={`p-3 rounded-xl text-xs font-bold border ${selectedAnswer ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-rose-100 border-rose-300 text-rose-900'}`}>
                {selectedAnswer ? (
                  <span>🎉 <strong>BENAR!</strong> Spades (♠) dan Hearts (♥) adalah Major Suit (bernilai tinggi dalam Bridge).</span>
                ) : (
                  <span>❌ <strong>KURANG TEPAT!</strong> Clubs (♣) & Diamonds (♦) merupakan Minor Suit. Major Suit adalah Spades (♠) & Hearts (♥).</span>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="max-w-3xl mx-auto w-full flex justify-between items-center">
        <button disabled className="bg-slate-200 text-slate-400 text-xs font-bold px-4 py-2 rounded-xl cursor-not-allowed border border-slate-300">
          ⬅️ Sebelumnya
        </button>
        <button className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition">
          Modul Berikutnya ➔
        </button>
      </footer>

    </div>
  );
};
