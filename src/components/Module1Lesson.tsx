import React from 'react';

export const Module1Lesson: React.FC = () => {
  const suits = [
    { name: 'Spade', symbol: '♠', color: '#1E293B', category: 'Major Suit', rank: 1 },
    { name: 'Heart', symbol: '♥', color: '#E11D48', category: 'Major Suit', rank: 2 },
    { name: 'Diamond', symbol: '♦', color: '#D97706', category: 'Minor Suit', rank: 3 },
    { name: 'Club', symbol: '♣', color: '#059669', category: 'Minor Suit', rank: 4 },
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
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                suit.category === 'Major Suit' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {suit.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Kategori Major & Minor Suit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-1.5 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-base">⭐</span>
            <h4 className="font-extrabold text-xs sm:text-sm text-amber-900">Major Suit (Bernilai Tinggi)</h4>
          </div>
          <p className="text-xs text-amber-800/90 leading-relaxed">
            Terdiri dari <strong className="text-amber-950">Spade (♠)</strong> dan <strong className="text-amber-950">Heart (♥)</strong>. Memberikan poin penawaran lebih tinggi dalam permainan.
          </p>
        </div>

        <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-4 space-y-1.5 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-base">🔹</span>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-800">Minor Suit (Bernilai Standar)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Terdiri dari <strong className="text-slate-900">Diamond (♦)</strong> dan <strong className="text-slate-900">Club (♣)</strong>. Digunakan sebagai fondasi dasar atau alternatif penawaran.
          </p>
        </div>
      </div>

      {/* Hirarki Simbol */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-2 shadow-sm">
        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center space-x-2">
          <span>🏆</span>
          <span>Hirarki Urutan Simbol (Tinggi ke Rendah)</span>
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm font-extrabold">
          <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1">
            <span>♠</span> <span>Spade</span>
          </div>
          <span className="text-slate-400 font-bold">&gt;</span>
          <div className="bg-rose-600 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1">
            <span>♥</span> <span>Heart</span>
          </div>
          <span className="text-slate-400 font-bold">&gt;</span>
          <div className="bg-amber-600 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1">
            <span>♦</span> <span>Diamond</span>
          </div>
          <span className="text-slate-400 font-bold">&gt;</span>
          <div className="bg-emerald-700 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1">
            <span>♣</span> <span>Club</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 text-center font-medium pt-1">
          Secara hirarki: <strong>Spade</strong> paling tinggi, diikuti <strong>Heart</strong>, <strong>Diamond</strong>, dan <strong>Club</strong> paling dasar.
        </p>
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


