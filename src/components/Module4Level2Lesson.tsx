import React, { useState } from 'react';
import { CardHand } from './CardHand';
import { PlayingCard } from './PlayingCard';
import type { Card } from '../types/card';

interface VisualLesson {
  id: string;
  title: string;
  category: 'Play' | 'Defense';
  description: string;
  keyRule: string;
  northHand: Card[];
  southHand: Card[];
  eastCard?: Card;
  westCard?: Card;
  playedCard?: Card;
  actionNote: string;
}

const LEVEL_2_LESSONS: VisualLesson[] = [
  {
    id: 'finesse',
    title: 'Teknik Finesse (Jebakan Kartu High)',
    category: 'Play',
    description: 'Bagaimana cara agar kombinasi kartu A-Q-J di North dan 2-3-4 di South bisa menang 3x (3 Trick)? Syarat utamanya: King lawan (K) harus berada di KIRI (West / Sebelum North), bukan di kanan (East)!',
    keyRule: 'Prinsip Finesse: Finesse hanya berhasil jika King lawan berada di sebelah KIRI (sebelum kartu kehormatan A-Q-J)!',
    northHand: [
      { id: 'fin-n-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
      { id: 'fin-n-2', suit: 'spades', rank: 'Q', value: 12, hcp: 2 },
      { id: 'fin-n-3', suit: 'spades', rank: 'J', value: 11, hcp: 1 },
    ],
    southHand: [
      { id: 'fin-s-1', suit: 'spades', rank: '4', value: 4, hcp: 0 },
      { id: 'fin-s-2', suit: 'spades', rank: '3', value: 3, hcp: 0 },
      { id: 'fin-s-3', suit: 'spades', rank: '2', value: 2, hcp: 0 },
    ],
    westCard: { id: 'fin-w-1', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
    actionNote: 'Teka-Teki Finesse: Mainkan kartu kecil ♠2 dari South ➔ West (Kiri) memegang ♠K. Jika West pasang ♠K, sergap dengan ♠A. Jika West pasang kecil, mainkan ♠J / ♠Q ➔ Menang 3x (3 Trick)!'
  },
  {
    id: 'drop',
    title: 'Teknik Drop (Menjatuhkan Kartu Musuh)',
    category: 'Play',
    description: 'Ketika pasangan memiliki 9+ kartu suit (seperti A-K-J-10-x), King/Queen lawan dipastikan akan jatuh (drop) saat A dan K dimainkan.',
    keyRule: 'Prinsip Drop: "Eight Ever, Nine Never" (9+ Kartu = Mainkan A-K langsung)!',
    northHand: [
      { id: 'drp-n-1', suit: 'hearts', rank: 'A', value: 14, hcp: 4 },
      { id: 'drp-n-2', suit: 'hearts', rank: 'K', value: 13, hcp: 3 },
      { id: 'drp-n-3', suit: 'hearts', rank: 'J', value: 11, hcp: 1 },
      { id: 'drp-n-4', suit: 'hearts', rank: '10', value: 10, hcp: 0 },
      { id: 'drp-n-5', suit: 'hearts', rank: '6', value: 6, hcp: 0 },
    ],
    southHand: [
      { id: 'drp-s-1', suit: 'hearts', rank: '9', value: 9, hcp: 0 },
      { id: 'drp-s-2', suit: 'hearts', rank: '8', value: 8, hcp: 0 },
      { id: 'drp-s-3', suit: 'hearts', rank: '4', value: 4, hcp: 0 },
      { id: 'drp-s-4', suit: 'hearts', rank: '2', value: 2, hcp: 0 },
    ],
    eastCard: { id: 'drp-e-1', suit: 'hearts', rank: 'Q', value: 12, hcp: 2 },
    actionNote: 'Total 9 Kartu ♥! Tarik ♥A lalu ♥K ➔ ♥Q milik lawan langsung jatuh (drop).'
  },
  {
    id: 'crossruff',
    title: 'Teknik Cross-Ruff (Memotong Silang)',
    category: 'Play',
    description: 'North dan South saling memotong (ruff) menggunakan kartu Trump Spades ♠ di suit yang berbeda (Hearts ♥ dan Diamonds ♦).',
    keyRule: 'Prinsip Cross-Ruff: Habiskan kartu samping sebelum memotong silang!',
    northHand: [
      { id: 'cr-n-1', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
      { id: 'cr-n-2', suit: 'spades', rank: '8', value: 8, hcp: 0 },
      { id: 'cr-n-3', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 },
    ],
    southHand: [
      { id: 'cr-s-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
      { id: 'cr-s-2', suit: 'spades', rank: '9', value: 9, hcp: 0 },
      { id: 'cr-s-3', suit: 'hearts', rank: 'A', value: 14, hcp: 4 },
    ],
    actionNote: 'North potong ♥ dengan ♠K ➔ South potong ♦ dengan ♠A secara bergantian!'
  },
  {
    id: 'lead',
    title: 'Teknik Opening Lead (Kartu Pertama)',
    category: 'Defense',
    description: 'Defender di sebelah kiri Declarer memimpin serangan pertama. Lead teratas dari deretan kehormatan (Sequence K-Q-J / Q-J-10).',
    keyRule: 'Prinsip Lead: Top of Sequence (Kartu Teratas dari Deretan Kehormatan)!',
    northHand: [],
    southHand: [
      { id: 'ld-s-1', suit: 'diamonds', rank: 'Q', value: 12, hcp: 2 },
      { id: 'ld-s-2', suit: 'diamonds', rank: 'J', value: 11, hcp: 1 },
      { id: 'ld-s-3', suit: 'diamonds', rank: '10', value: 10, hcp: 0 },
      { id: 'ld-s-4', suit: 'diamonds', rank: '4', value: 4, hcp: 0 },
    ],
    playedCard: { id: 'ld-s-1', suit: 'diamonds', rank: 'Q', value: 12, hcp: 2 },
    actionNote: 'Pegang Sequence Q-J-10 ➔ Lead kartu teratas ♦Q untuk menghancurkan pertahanan Declarer!'
  },
  {
    id: 'followlead',
    title: 'Teknik Follow Lead Partner',
    category: 'Defense',
    description: 'Sebagai Defender ketiga (Partner Lead), sambut serangan partner dengan memainkankan kartu tertinggi (Third Hand High).',
    keyRule: 'Prinsip Defense: Third Hand High (Tangan Ke-3 Mainkan Kartu Tinggi)!',
    northHand: [],
    southHand: [
      { id: 'fl-s-1', suit: 'clubs', rank: 'K', value: 13, hcp: 3 },
      { id: 'fl-s-2', suit: 'clubs', rank: '8', value: 8, hcp: 0 },
      { id: 'fl-s-3', suit: 'clubs', rank: '3', value: 3, hcp: 0 },
    ],
    westCard: { id: 'fl-w-1', suit: 'clubs', rank: '5', value: 5, hcp: 0 },
    playedCard: { id: 'fl-s-1', suit: 'clubs', rank: 'K', value: 13, hcp: 3 },
    actionNote: 'Partner (West) Lead ♣5 (kecil) ➔ Anda (South) sambut dengan kartu tertinggi ♣K!'
  }
];

export const Module4Level2Lesson: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentLesson = LEVEL_2_LESSONS[activeTab];

  return (
    <div className="bg-[#F1F5F9] text-slate-800 p-3 sm:p-5 select-none">
      <div className="space-y-3 max-w-4xl mx-auto w-full">
        <header className="w-full flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              TINGKAT 2: KATALOG TEKNIK PLAY & DEFENSE
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full w-full"></div>
          </div>
        </header>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {LEVEL_2_LESSONS.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                activeTab === idx
                  ? 'bg-[#059669] text-white border-[#047857] shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span className="mr-1">{l.category === 'Play' ? '🃏' : '🛡️'}</span>
              {l.title.split(' ')[1]}
            </button>
          ))}
        </div>

        <div className="w-full bg-[#0B231B] border border-emerald-900 rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col space-y-4">
          <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-white space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base font-extrabold text-amber-400 flex items-center gap-1.5">
                <span>{currentLesson.category === 'Play' ? '🃏' : '🛡️'}</span>
                {currentLesson.title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 uppercase">
                {currentLesson.category}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentLesson.description}
            </p>
          </div>

          <div className="space-y-3 py-1">
            <div className="text-center">
              <span className="text-[11px] font-extrabold text-amber-300 bg-[#061812] px-3 py-1 rounded-full border border-emerald-900">
                🎮 SIMULASI VISUAL KARTU
              </span>
            </div>

            {currentLesson.northHand.length > 0 && (
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400">PARTNER / DUMMY (NORTH)</span>
                <div className="transform scale-[1.1] sm:scale-100 origin-center my-1">
                  <CardHand cards={currentLesson.northHand} />
                </div>
              </div>
            )}

            {(currentLesson.eastCard || currentLesson.westCard || currentLesson.playedCard) && (
              <div className="flex justify-center items-center gap-4 py-2">
                {currentLesson.westCard && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-rose-400">PARTNER LEAD (WEST)</span>
                    <div className="transform scale-90">
                      <PlayingCard card={currentLesson.westCard} />
                    </div>
                  </div>
                )}

                {currentLesson.eastCard && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-rose-400">KARTU MUSUH (EAST)</span>
                    <div className="transform scale-90">
                      <PlayingCard card={currentLesson.eastCard} />
                    </div>
                  </div>
                )}

                {currentLesson.playedCard && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-emerald-300">LEAD TERBAIK</span>
                    <div className="transform scale-90 ring-4 ring-amber-400 rounded-xl shadow-2xl">
                      <PlayingCard card={currentLesson.playedCard} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentLesson.southHand.length > 0 && (
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-emerald-300">KARTU ANDA (SOUTH)</span>
                <div className="transform scale-[1.1] sm:scale-100 origin-center my-1">
                  <CardHand cards={currentLesson.southHand} />
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#071E17] border border-emerald-800 rounded-xl p-2.5 text-xs text-amber-200 font-bold text-center">
            ⚡ {currentLesson.actionNote}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-300 font-bold flex items-center gap-2">
            <span>📌</span>
            <span>{currentLesson.keyRule}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 w-full">
          <button
            disabled={activeTab === 0}
            onClick={() => setActiveTab(activeTab - 1)}
            className="bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-300 font-bold px-4 py-2 rounded-xl text-xs shadow-sm"
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
    </div>
  );
};
