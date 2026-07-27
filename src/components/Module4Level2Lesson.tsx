import React, { useState } from 'react';

interface TechLesson {
  id: string;
  title: string;
  category: 'Play' | 'Defense';
  description: string;
  example: string;
  keyRule: string;
}

const LEVEL_2_LESSONS: TechLesson[] = [
  {
    id: 'finesse',
    title: 'Teknik Finesse (Jebakan Kartu High)',
    category: 'Play',
    description: 'Finesse adalah teknik menjebak kartu kehormatan musuh (seperti King lawan) yang berada di sebelah kiri atau kanan Anda dengan memainkan kartu kecil dari tangan menuju kartu kombinasi Ace-Queen.',
    example: 'Jika Dummy punya A-Q dan South punya 3-4-5: Mainkan kartu kecil dari South ke arah Dummy. Jika East pasang King, sergap dengan Ace. Jika East pasang kecil, mainkan Queen!',
    keyRule: 'Prinsip Finesse: Selalu jalankan kartu kecil menuju kombinasi tenas (A-Q / K-J).'
  },
  {
    id: 'drop',
    title: 'Teknik Drop (Menjatuhkan Kartu Musuh)',
    category: 'Play',
    description: 'Drop digunakan ketika pasangan Anda memiliki 9+ kartu suit tersebut. Peluang King musuh jatuh secara alami (tanpa finesse) sangat tinggi.',
    example: 'Pasangan memegang 9 kartu Spades berdua termasuk A-K. Mainkan Ace dan King langsung. King/Queen musuh dipastikan akan jatuh (drop) dalam 2 putaran!',
    keyRule: 'Prinsip Drop: "Eight ever, Nine never" (9+ Kartu = Mainkan A-K langsung untuk Drop).'
  },
  {
    id: 'crossruff',
    title: 'Teknik Cross-Ruff (Memotong Silang)',
    category: 'Play',
    description: 'Cross-Ruff dilakukan saat Declarer dan Dummy sama-sama memiliki void (habis suit) di suit yang berbeda, sehingga bisa saling memotong (ruff) menggunakan kartu Trump.',
    example: 'North memotong Hearts dengan Trump Spades, South memotong Diamonds dengan Trump Spades secara bergantian.',
    keyRule: 'Prinsip Cross-Ruff: Ambil semua trick samping (Side Suit High Winners) sebelum memulai potong silang!'
  },
  {
    id: 'lead',
    title: 'Teknik Opening Lead (Kartu Pertama)',
    category: 'Defense',
    description: 'Defender di sebelah kiri Declarer memberikan kartu pertama game. Pilihan kartu lead menentukan keberhasilan pertahanan!',
    example: 'Dari urutan kehormatan beruntun (Sequence seperti K-Q-J atau Q-J-10), selalu Lead kartu teratas (Top of Sequence). Dari 4+ kartu tanpa sequence, Lead kartu ke-4 tertinggi (4th Best).',
    keyRule: 'Prinsip Lead: Top of Sequence atau 4th Best dari Suit Terpanjang!'
  },
  {
    id: 'followlead',
    title: 'Teknik Follow Lead Partner',
    category: 'Defense',
    description: 'Sebagai Defender kedua (Partner Lead), tugas Anda adalah mendukung penyerangan partner.',
    example: 'Jika partner Lead kartu kecil, mainkan kartu tertinggi Anda (Third Hand High) untuk memaksa Declarer menghabiskan kartu tingginya.',
    keyRule: 'Prinsip Defense: Third Hand High (Tangan Ke-3 Mainkan Kartu Tinggi)!'
  }
];

export const Module4Level2Lesson: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentLesson = LEVEL_2_LESSONS[activeTab];

  return (
    <div className="bg-[#F1F5F9] text-slate-800 p-4 sm:p-6 min-h-[500px] flex flex-col justify-between">
      <div className="space-y-4 max-w-4xl mx-auto w-full">
        {/* Header Modul */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-300 pb-3">
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Tingkat 2 (Pemula - Katalog Teknik)</span>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900">Teknik Play Declarer & Defense Strategy</h2>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300">
            Katalog Bebas Dipilih
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {LEVEL_2_LESSONS.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                activeTab === idx
                  ? 'bg-[#059669] text-white border-[#047857] shadow-md'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span className="mr-1">{l.category === 'Play' ? '🃏' : '🛡️'}</span>
              {l.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Lesson Card Detail */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="text-xl">{currentLesson.category === 'Play' ? '🎯' : '🛡️'}</span>
              {currentLesson.title}
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
              Kategori: {currentLesson.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {currentLesson.description}
          </p>

          <div className="bg-[#0B231B] text-slate-100 p-4 rounded-xl space-y-2 border border-emerald-900">
            <span className="text-xs font-extrabold text-amber-300 block">💡 CONTOH SIMULASI:</span>
            <p className="text-xs leading-relaxed text-emerald-100 font-mono">
              {currentLesson.example}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
            <span>📌</span>
            <span>{currentLesson.keyRule}</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-4 max-w-4xl mx-auto w-full">
        <button
          disabled={activeTab === 0}
          onClick={() => setActiveTab(activeTab - 1)}
          className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
        >
          ⬅️ Teknik Sebelumnya
        </button>

        <button
          disabled={activeTab === LEVEL_2_LESSONS.length - 1}
          onClick={() => setActiveTab(activeTab + 1)}
          className="bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow transition"
        >
          Teknik Selanjutnya ➔
        </button>
      </div>
    </div>
  );
};
