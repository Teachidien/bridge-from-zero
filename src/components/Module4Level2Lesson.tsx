import React, { useState } from 'react';
import { CardHand } from './CardHand';
import { PlayingCard } from './PlayingCard';
import type { Card } from '../types/card';

interface StepSimulation {
  prompt: string;
  allowedCards: string[]; // ID card yang benar untuk dimainkan pada step ini
  westResponseCard?: Card;
  eastResponseCard?: Card;
  dummyCardPlayed?: Card;
  feedbackSuccess: string;
  feedbackFailure: string;
}

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
  simulationSteps?: StepSimulation[];
}

const FINESSE_1_NORTH: Card[] = [
  { id: 'f1-n-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
  { id: 'f1-n-2', suit: 'spades', rank: 'Q', value: 12, hcp: 2 },
  { id: 'f1-n-3', suit: 'spades', rank: 'J', value: 11, hcp: 1 },
  { id: 'f1-n-4', suit: 'diamonds', rank: '3', value: 3, hcp: 0 },
];

const FINESSE_1_SOUTH: Card[] = [
  { id: 'f1-s-1', suit: 'spades', rank: '4', value: 4, hcp: 0 },
  { id: 'f1-s-2', suit: 'spades', rank: '3', value: 3, hcp: 0 },
  { id: 'f1-s-3', suit: 'spades', rank: '2', value: 2, hcp: 0 },
  { id: 'f1-s-4', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 },
];

const CROSSRUFF_NORTH: Card[] = [
  { id: 'cr-n-1', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
  { id: 'cr-n-2', suit: 'clubs', rank: '3', value: 3, hcp: 0 },
];

const CROSSRUFF_SOUTH: Card[] = [
  { id: 'cr-s-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
  { id: 'cr-s-2', suit: 'hearts', rank: '3', value: 3, hcp: 0 },
];

const LEVEL_2_LESSONS: VisualLesson[] = [
  {
    id: 'finesse',
    title: 'Teknik Finesse (A-Q-J vs 2-3-4 + Tangga ♦)',
    category: 'Play',
    description: 'Finesse adalah teknik menjebak King lawan di KIRI (West). Alirkan kartu kecil ♠2 dari South menuju ♠A-Q-J North. Setelah North menang dengan ♠J, gunakan "Tangga" ♦3 ke ♦A di South untuk mengulangi Finesse sekali lagi!',
    keyRule: 'Prinsip Finesse: Jalankan kartu kecil ke arah kehormatan, dan gunakan Tangga (Entry) untuk kembali!',
    northHand: FINESSE_1_NORTH,
    southHand: FINESSE_1_SOUTH,
    actionNote: 'Teka-teki Finesse: Mainkan ♠2 ➔ West keluarkan ♠5 ➔ North pasang ♠J (Menang 1)! Lalu jalan ♦3 ke ♦A di South (Menang 2)! Lalu mainkan ♠3 ke ♠Q North (Menang 3)!'
  },
  {
    id: 'crossruff',
    title: 'Teknik Cross-Ruff (Memotong Silang)',
    category: 'Play',
    description: 'Dengan Spades ♠ sebagai Trump, South memimpin ♥3 agar North memotong dengan ♠K! Kemudian North memimpin ♣3 agar South memotong dengan ♠A secara bergantian.',
    keyRule: 'Prinsip Cross-Ruff: Potong silang suit yang Anda tidak miliki menggunakan kartu Trump pasangan!',
    northHand: CROSSRUFF_NORTH,
    southHand: CROSSRUFF_SOUTH,
    actionNote: 'Alur Cross-Ruff: South jalan ♥3 ➔ North potong dengan ♠K! Lalu North jalan ♣3 ➔ South potong dengan ♠A ➔ Menang 2 Trick!'
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
  
  // State Simulasi Bermain Kartu Real-Time
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [northCards, setNorthCards] = useState<Card[]>(FINESSE_1_NORTH);
  const [southCards, setSouthCards] = useState<Card[]>(FINESSE_1_SOUTH);
  const [trickCards, setTrickCards] = useState<{ south?: Card; west?: Card; north?: Card; east?: Card }>({});
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);
  const [tricksWon, setTricksWon] = useState<number>(0);

  const currentLesson = LEVEL_2_LESSONS[activeTab];

  // Reset Simulasi saat ganti Tab
  const resetSimulation = (lessonId: string) => {
    setStepIndex(0);
    setTrickCards({});
    setFeedback(null);
    setTricksWon(0);

    if (lessonId === 'finesse') {
      setNorthCards(FINESSE_1_NORTH);
      setSouthCards(FINESSE_1_SOUTH);
    } else if (lessonId === 'crossruff') {
      setNorthCards(CROSSRUFF_NORTH);
      setSouthCards(CROSSRUFF_SOUTH);
    }
  };

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    resetSimulation(LEVEL_2_LESSONS[idx].id);
  };

  // Logika Eksekusi Langkah Bermain (Finesse & Cross-Ruff)
  const handlePlayCard = (card: Card, source: 'south' | 'north') => {
    if (currentLesson.id === 'finesse') {
      // FINESSE SIMULATION
      if (stepIndex === 0) {
        // Step 1: South harus mainkan kartu kecil Spades (♠2/♠3/♠4)
        if (source === 'south' && card.suit === 'spades' && card.rank !== 'A') {
          // West pasang ♠5 (kecil), North pasang ♠J, East pasang ♠8 ➔ North menang!
          const westCard: Card = { id: 'w-5s', suit: 'spades', rank: '5', value: 5, hcp: 0 };
          const northPlayed: Card = { id: 'f1-n-3', suit: 'spades', rank: 'J', value: 11, hcp: 1 };
          const eastCard: Card = { id: 'e-8s', suit: 'spades', rank: '8', value: 8, hcp: 0 };

          setTrickCards({ south: card, west: westCard, north: northPlayed, east: eastCard });
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setNorthCards(prev => prev.filter(c => c.id !== northPlayed.id));
          setTricksWon(1);
          setStepIndex(1);
          setFeedback({
            isError: false,
            message: '🎉 BANGET TEPAT! South jalan ♠2 ➔ West pasang ♠5 ➔ North sergap ♠J ➔ Menang Trick 1! Sekarang giliran North (karena North yang menang).'
          });
        } else {
          setFeedback({
            isError: true,
            message: '❌ CARA BERMAIN ANDA SALAH! Jangan memimpin ♠A dari North atau Diamonds dulu. Jalan kartu kecil Spades (♠2/♠3) dari South!'
          });
        }
      } else if (stepIndex === 1) {
        // Step 2: North di atas harus memainkan ♦3 (Tangga) menuju South
        if (source === 'north' && card.suit === 'diamonds') {
          const eastCard: Card = { id: 'e-4d', suit: 'diamonds', rank: '4', value: 4, hcp: 0 };
          const southPlayed: Card = { id: 'f1-s-4', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 };
          const westCard: Card = { id: 'w-2d', suit: 'diamonds', rank: '2', value: 2, hcp: 0 };

          setTrickCards({ north: card, east: eastCard, south: southPlayed, west: westCard });
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setSouthCards(prev => prev.filter(c => c.id !== southPlayed.id));
          setTricksWon(2);
          setStepIndex(2);
          setFeedback({
            isError: false,
            message: '🎉 HEBAT! North jalan ♦3 ➔ South makan dengan ♦A (Tangga/Entry)! Sekarang giliran pindah kembali ke South untuk Finesse ke-2.'
          });
        } else {
          setFeedback({
            isError: true,
            message: '❌ CARA BERMAIN ANDA SALAH! Gunakan "Tangga" Diamond ♦3 dari North ke South agar giliran kembali ke South!'
          });
        }
      } else if (stepIndex === 2) {
        // Step 3: South jalan ♠3 ke ♠Q North ➔ Menang Trick 3!
        if (source === 'south' && card.suit === 'spades') {
          const westCard: Card = { id: 'w-9s', suit: 'spades', rank: '9', value: 9, hcp: 0 };
          const northPlayed: Card = { id: 'f1-n-2', suit: 'spades', rank: 'Q', value: 12, hcp: 2 };
          const eastCard: Card = { id: 'e-[#s]', suit: 'spades', rank: '10', value: 10, hcp: 0 };

          setTrickCards({ south: card, west: westCard, north: northPlayed, east: eastCard });
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setNorthCards(prev => prev.filter(c => c.id !== northPlayed.id));
          setTricksWon(3);
          setStepIndex(3);
          setFeedback({
            isError: false,
            message: '🏆 LUAR BIASA! Finesse 2x Berhasil! South jalan ♠3 ➔ West ♠9 ➔ North ♠Q ➔ Total Menang 3 Trick!'
          });
        } else {
          setFeedback({
            isError: true,
            message: '❌ CARA BERMAIN ANDA SALAH! Jalan kartu kecil ♠3 dari South menuju ♠Q di North!'
          });
        }
      }
    } else if (currentLesson.id === 'crossruff') {
      // CROSS-RUFF SIMULATION
      if (stepIndex === 0) {
        // Step 1: South jalan ♥3 ➔ North potong dengan ♠K
        if (source === 'south' && card.suit === 'hearts') {
          const westCard: Card = { id: 'w-kh', suit: 'hearts', rank: 'K', value: 13, hcp: 3 };
          const northPlayed: Card = { id: 'cr-n-1', suit: 'spades', rank: 'K', value: 13, hcp: 3 };
          const eastCard: Card = { id: 'e-5h', suit: 'hearts', rank: '5', value: 5, hcp: 0 };

          setTrickCards({ south: card, west: westCard, north: northPlayed, east: eastCard });
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setNorthCards(prev => prev.filter(c => c.id !== northPlayed.id));
          setTricksWon(1);
          setStepIndex(1);
          setFeedback({
            isError: false,
            message: '🎉 TEPAT! South jalan ♥3 ➔ West pasang ♥K ➔ North POTONG SILANG dengan ♠K (Ruff)! North Menang 1 Trick!'
          });
        } else {
          setFeedback({
            isError: true,
            message: '❌ CARA BERMAIN ANDA SALAH! Jalan ♥3 dari South dulu agar North bisa memotongnya dengan ♠K!'
          });
        }
      } else if (stepIndex === 1) {
        // Step 2: North jalan ♣3 ➔ South potong dengan ♠A
        if (source === 'north' && card.suit === 'clubs') {
          const eastCard: Card = { id: 'e-kc', suit: 'clubs', rank: 'K', value: 13, hcp: 3 };
          const southPlayed: Card = { id: 'cr-s-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 };
          const westCard: Card = { id: 'w-4c', suit: 'clubs', rank: '4', value: 4, hcp: 0 };

          setTrickCards({ north: card, east: eastCard, south: southPlayed, west: westCard });
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setSouthCards(prev => prev.filter(c => c.id !== southPlayed.id));
          setTricksWon(2);
          setStepIndex(2);
          setFeedback({
            isError: false,
            message: '🏆 SEMPURNA! North jalan ♣3 ➔ East pasang ♣K ➔ South POTONG SILANG dengan ♠A (Ruff)! Berhasil Menang 2 Trick!'
          });
        } else {
          setFeedback({
            isError: true,
            message: '❌ CARA BERMAIN ANDA SALAH! Jalan ♣3 dari North agar South bisa memotongnya dengan ♠A!'
          });
        }
      }
    }
  };

  return (
    <div className="bg-[#F1F5F9] text-slate-800 p-3 sm:p-5 select-none">
      <div className="space-y-3 max-w-4xl mx-auto w-full">
        {/* Header Modul */}
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

        {/* Tab Buttons (5 Teknik) */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {LEVEL_2_LESSONS.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => handleTabChange(idx)}
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

        {/* Meja Kasino Hijau Emerald */}
        <div className="w-full bg-[#0B231B] border border-emerald-900 rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col space-y-4">
          
          {/* Header Meja & Tombol Redeal / Reset */}
          <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-amber-400">
                {currentLesson.title}
              </h3>
              {(currentLesson.id === 'finesse' || currentLesson.id === 'crossruff') && (
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Trick Menang: {tricksWon}
                </span>
              )}
            </div>
            {(currentLesson.id === 'finesse' || currentLesson.id === 'crossruff') && (
              <button
                onClick={() => resetSimulation(currentLesson.id)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-3 py-1 rounded-xl text-xs font-extrabold shadow transition active:scale-95"
              >
                🔄 Redeal / Reset
              </button>
            )}
          </div>

          {/* Pertanyaan Utama di Atas Kartu */}
          {(currentLesson.id === 'finesse' || currentLesson.id === 'crossruff') && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-2.5 text-center">
              <p className="text-xs sm:text-sm font-extrabold text-amber-300">
                ❓ {currentLesson.id === 'finesse' 
                    ? `[Langkah ${stepIndex + 1}/3]: ${stepIndex === 0 ? 'Mainkan ♠2 kecil dari South!' : stepIndex === 1 ? 'Mainkan ♦3 (Tangga) dari North!' : 'Mainkan ♠3 dari South menuju ♠Q North!'}`
                    : `[Langkah ${stepIndex + 1}/2]: ${stepIndex === 0 ? 'Mainkan ♥3 dari South agar North potong dengan ♠K!' : 'Mainkan ♣3 dari North agar South potong dengan ♠A!'}`}
              </p>
            </div>
          )}

          {/* 1. VISUALISASI KARTU MEJA (NORTH, WEST, EAST, SOUTH & TRICK MAT) */}
          <div className="space-y-3 py-1">
            {/* North Hand */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400">NORTH (DUMMY)</span>
              <div className="transform scale-[1.25] sm:scale-100 origin-center my-1">
                <CardHand cards={currentLesson.id === 'finesse' || currentLesson.id === 'crossruff' ? northCards : currentLesson.northHand} onSelectCard={(c) => handlePlayCard(c, 'north')} />
              </div>
            </div>

            {/* Middle Play Area: West Card, Played Trick, East Card */}
            <div className="flex justify-center items-center gap-4 py-2 min-h-[100px]">
              {/* West Opponent Card */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-rose-400">WEST (KIRI)</span>
                <div className="transform scale-90">
                  {trickCards.west ? (
                    <PlayingCard card={trickCards.west} />
                  ) : (
                    <div className="w-16 h-24 sm:w-20 sm:h-28 border-2 border-dashed border-emerald-800 rounded-xl flex items-center justify-center text-[10px] text-emerald-600 font-bold">
                      WEST
                    </div>
                  )}
                </div>
              </div>

              {/* Mat Arena Tengah / Status Kartu Dimainkan */}
              <div className="flex flex-col items-center justify-center px-3 py-2 bg-[#061812] border border-emerald-800 rounded-2xl">
                <span className="text-[10px] font-bold text-amber-300 mb-1">TRICK BERJALAN</span>
                <div className="flex gap-2">
                  {trickCards.south && (
                    <div className="text-center">
                      <span className="text-[9px] text-emerald-300 block">South</span>
                      <div className="transform scale-75 origin-top"><PlayingCard card={trickCards.south} /></div>
                    </div>
                  )}
                  {trickCards.north && (
                    <div className="text-center">
                      <span className="text-[9px] text-amber-300 block">North</span>
                      <div className="transform scale-75 origin-top"><PlayingCard card={trickCards.north} /></div>
                    </div>
                  )}
                </div>
              </div>

              {/* East Opponent Card */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-rose-400">EAST (KANAN)</span>
                <div className="transform scale-90">
                  {trickCards.east ? (
                    <PlayingCard card={trickCards.east} />
                  ) : (
                    <div className="w-16 h-24 sm:w-20 sm:h-28 border-2 border-dashed border-emerald-800 rounded-xl flex items-center justify-center text-[10px] text-emerald-600 font-bold">
                      EAST
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* South Hand */}
            <div className="flex flex-col items-center space-y-1">
              <div className="transform scale-[1.25] sm:scale-100 origin-center my-1">
                <CardHand cards={currentLesson.id === 'finesse' || currentLesson.id === 'crossruff' ? southCards : currentLesson.southHand} onSelectCard={(c) => handlePlayCard(c, 'south')} />
              </div>
              <span className="text-[10px] font-bold text-emerald-300">SOUTH (ANDA - KETUK KARTU UNTUK BERMAIN)</span>
            </div>
          </div>

          {/* EVALUASI HASIL BERMAIN (TERHUBUNG KE FEEDBACK AKSI) */}
          {feedback && (
            <div className={`p-3 rounded-xl text-xs font-bold border text-center ${
              feedback.isError
                ? 'bg-rose-950/80 border-rose-800 text-rose-200'
                : 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
            }`}>
              {feedback.message}
            </div>
          )}

          {/* 2. PENJELASAN MURNI BARU MUNCIUL JIKA BUKAN TAB INTERAKTIF ATAU SETELAH MAIN */}
          {(feedback || (currentLesson.id !== 'finesse' && currentLesson.id !== 'crossruff')) && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-white space-y-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-400">
                💡 Penjelasan Teknik:
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentLesson.description}
              </p>
            </div>
          )}

          {/* 3. ALUR AKSI MAIN */}
          <div className="bg-[#071E17] border border-emerald-800 rounded-xl p-2.5 text-xs text-amber-200 font-bold text-center">
            ⚡ {currentLesson.actionNote}
          </div>

          {/* 4. KUNCI PRINSIP */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-300 font-bold flex items-center gap-2">
            <span>📌</span>
            <span>{currentLesson.keyRule}</span>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-2 w-full">
          <button
            disabled={activeTab === 0}
            onClick={() => handleTabChange(activeTab - 1)}
            className="bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-300 font-bold px-4 py-2 rounded-xl text-xs shadow-sm"
          >
            ⬅️ Teknik Sebelumnya
          </button>

          <button
            disabled={activeTab === LEVEL_2_LESSONS.length - 1}
            onClick={() => handleTabChange(activeTab + 1)}
            className="bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow transition"
          >
            Teknik Selanjutnya ➔
          </button>
        </div>
      </div>
    </div>
  );
};

