import React, { useState } from 'react';

export const Module1Lesson: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const suits = [
    { name: 'Spade', symbol: '♠', color: '#1E293B' },
    { name: 'Heart', symbol: '♥', color: '#E11D48' },
    { name: 'Diamond', symbol: '♦', color: '#D97706' },
    { name: 'Club', symbol: '♣', color: '#059669' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 text-slate-800 select-none">
      {/* Header Modul */}
      <div className="flex justify-between items-center pb-3 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Modul 1 • Pemula</span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Pengenalan Kartu & Simbol</h3>
        </div>
        <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full w-1/3"></div>
        </div>
      </div>

      {/* Simbol 4 Kartu */}
      <div className="space-y-3">
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Dalam permainan Bridge, 52 kartu standar terbagi dalam 4 simbol utama:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {suits.map((suit) => (
            <div key={suit.name} className="bg-white border border-slate-200/80 p-4 rounded-xl flex flex-col items-center justify-center space-y-1 shadow-sm hover:border-emerald-300 transition">
              <span className="text-3xl font-bold" style={{ color: suit.color }}>{suit.symbol}</span>
              <span className="font-extrabold text-xs text-slate-800">{suit.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kuis Interaktif */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-600 tracking-wider">🎯 KUIS CEPAT</span>
          <span className="text-[11px] text-slate-400 font-medium">Soal 1 dari 3</span>
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-900">
          Manakah di bawah ini yang merupakan simbol <strong className="text-emerald-700">Major Suit</strong> (Simbol Bernilai Tinggi)?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => setSelectedAnswer(true)}
            className={`text-left p-3.5 rounded-xl border font-bold text-xs transition flex items-center justify-between shadow-sm ${
              selectedAnswer === true
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span>A. Spades (♠) & Hearts (♥)</span>
            <span className="text-slate-400">➔</span>
          </button>

          <button
            onClick={() => setSelectedAnswer(false)}
            className={`text-left p-3.5 rounded-xl border font-bold text-xs transition flex items-center justify-between shadow-sm ${
              selectedAnswer === false
                ? 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span>B. Clubs (♣) & Diamonds (♦)</span>
            <span className="text-slate-400">➔</span>
          </button>
        </div>

        {selectedAnswer !== null && (
          <div className={`p-3 rounded-xl text-xs font-bold border ${selectedAnswer ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-rose-100 border-rose-300 text-rose-900'}`}>
            {selectedAnswer ? (
              <span>🎉 <strong>BENAR!</strong> Spades (♠) dan Hearts (♥) adalah Major Suit.</span>
            ) : (
              <span>❌ <strong>KURANG TEPAT.</strong> Clubs (♣) & Diamonds (♦) adalah Minor Suit. Major Suit adalah Spades (♠) & Hearts (♥).</span>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigasi Modul */}
      <div className="flex justify-between items-center pt-2">
        <button disabled className="bg-slate-200 text-slate-400 text-xs font-bold px-4 py-2 rounded-xl cursor-not-allowed">
          ⬅️ Sebelumnya
        </button>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition">
          Modul Berikutnya ➔
        </button>
      </div>
    </div>
  );
};

