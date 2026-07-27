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
  
  // State Simulasi Real-Time 4 Arah Mata Angin
  const [turnState, setTurnState] = useState<number>(0); 
  const [northCards, setNorthCards] = useState<Card[]>(FINESSE_1_NORTH);
  const [southCards, setSouthCards] = useState<Card[]>(FINESSE_1_SOUTH);
  
  const [tableCenterCards, setTableCenterCards] = useState<{
    north?: Card;
    south?: Card;
    west?: Card;
    east?: Card;
  }>({});
  
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);
  const [tricksWon, setTricksWon] = useState<number>(0);

  const currentLesson = LEVEL_2_LESSONS[activeTab];

  const resetSimulation = (lessonId: string) => {
    setTurnState(0);
    setTableCenterCards({});
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

  // Eksekusi Giliran Real-Time 4 Arah
  const handlePlayCard = (card: Card, source: 'south' | 'north') => {
    if (currentLesson.id === 'finesse') {
      if (turnState === 0) {
        if (source === 'south' && card.suit === 'spades' && card.rank !== 'A') {
          const westPlayed: Card = { id: 'w-5s', suit: 'spades', rank: '5', value: 5, hcp: 0 };
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards({ south: card, west: westPlayed });
          setTurnState(1);
          setFeedback({ isError: false, message: '✔️ South memimpin ♠2 ➔ West merespons ♠5! Sekarang pilih ♠J dari North!' });
        } else {
          setFeedback({ isError: true, message: '❌ SALAH! Jalankan kartu kecil Spades (♠2/♠3/♠4) dari South!' });
        }
      } else if (turnState === 1) {
        if (source === 'north' && card.rank === 'J') {
          const eastPlayed: Card = { id: 'e-8s', suit: 'spades', rank: '8', value: 8, hcp: 0 };
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards(prev => ({ ...prev, north: card, east: eastPlayed }));
          setTricksWon(1);
          setTurnState(2);
          setFeedback({ isError: false, message: '🎉 North menang Trick 1! Giliran North jalan ♦3 (Tangga)!' });
        } else {
          setFeedback({ isError: true, message: '❌ SALAH! North harus menyergap dengan ♠J!' });
        }
      } else if (turnState === 2) {
        if (source === 'north' && card.suit === 'diamonds') {
          setTableCenterCards({}); // Clear trick
          const eastPlayed: Card = { id: 'e-4d', suit: 'diamonds', rank: '4', value: 4, hcp: 0 };
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards({ north: card, east: eastPlayed });
          setTurnState(3);
          setFeedback({ isError: false, message: '✔️ North jalan ♦3 ➔ East merespons ♦4! Sekarang pilih ♦A dari South!' });
        } else {
          setFeedback({ isError: true, message: '❌ SALAH! Jalan ♦3 dari North!' });
        }
      } else if (turnState === 3) {
        if (source === 'south' && card.suit === 'diamonds') {
          const westPlayed: Card = { id: 'w-2d', suit: 'diamonds', rank: '2', value: 2, hcp: 0 };
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards(prev => ({ ...prev, south: card, west: westPlayed }));
          setTricksWon(2);
          setTurnState(4);
          setFeedback({ isError: false, message: '🎉 South menang Trick 2! Jalan ♠3 dari South ke ♠Q di North!' });
        } else {
          setFeedback({ isError: true, message: '❌ SALAH! Pilih ♦A dari South!' });
        }
      } else if (turnState === 4) {
        if (source === 'south' && card.suit === 'spades') {
          setTableCenterCards({}); // Clear trick
          const westPlayed: Card = { id: 'w-9s', suit: 'spades', rank: '9', value: 9, hcp: 0 };
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards({ south: card, west: westPlayed });
          setTurnState(5);
          setFeedback({ isError: false, message: '✔️ South jalan ♠3 ➔ West merespons ♠9! Pilih ♠Q dari North!' });
        } else {
          setFeedback({ isError: true, message: '❌ SALAH! Jalan ♠3 dari South!' });
        }
      } else if (turnState === 5) {
        if (source === 'north' && card.rank === 'Q') {
          const eastPlayed: Card = { id: 'e-10s', suit: 'spades', rank: '10', value: 10, hcp: 0 };
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards(prev => ({ ...prev, north: card, east: eastPlayed }));
          setTricksWon(3);
          setTurnState(6);
          setFeedback({ isError: false, message: '🏆 SEMPURNA! North ♠Q menang! Finesse 2x Berhasil!' });
        } else {
          setFeedback({ isError: true, message: '❌ SALAH! Pilih ♠Q dari North!' });
        }
      }
    } else if (currentLesson.id === 'crossruff') {
      if (turnState === 0) {
        if (source === 'south' && card.suit === 'hearts') {
          const westPlayed: Card = { id: 'w-kh', suit: 'hearts', rank: 'K', value: 13, hcp: 3 };
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards({ south: card, west: westPlayed });
          setTurnState(1);
          setFeedback({ isError: false, message: '✔️ South jalan ♥3 ➔ West pasang ♥K! Pilih Trump ♠K dari North untuk MEMOTONG (Ruff)!' });
        }
      } else if (turnState === 1) {
        if (source === 'north' && card.suit === 'spades') {
          const eastPlayed: Card = { id: 'e-5h', suit: 'hearts', rank: '5', value: 5, hcp: 0 };
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards(prev => ({ ...prev, north: card, east: eastPlayed }));
          setTricksWon(1);
          setTurnState(2);
          setFeedback({ isError: false, message: '🎉 North potong ♠K! Giliran North jalan ♣3!' });
        }
      } else if (turnState === 2) {
        if (source === 'north' && card.suit === 'clubs') {
          setTableCenterCards({}); // Clear
          const eastPlayed: Card = { id: 'e-kc', suit: 'clubs', rank: 'K', value: 13, hcp: 3 };
          setNorthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards({ north: card, east: eastPlayed });
          setTurnState(3);
          setFeedback({ isError: false, message: '✔️ North jalan ♣3 ➔ East pasang ♣K! Pilih Trump ♠A di South untuk MEMOTONG (Ruff)!' });
        }
      } else if (turnState === 3) {
        if (source === 'south' && card.suit === 'spades') {
          const westPlayed: Card = { id: 'w-4c', suit: 'clubs', rank: '4', value: 4, hcp: 0 };
          setSouthCards(prev => prev.filter(c => c.id !== card.id));
          setTableCenterCards(prev => ({ ...prev, south: card, west: westPlayed }));
          setTricksWon(2);
          setTurnState(4);
          setFeedback({ isError: false, message: '🏆 CROSS-RUFF SUKSES! Total 2 Trick!' });
        }
      }
    }
  };

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

        <div className="w-full bg-[#0B231B] border border-emerald-900 rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col space-y-4">
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
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-3 py-1 rounded-xl text-xs font-extrabold shadow transition active:scale-95 flex items-center gap-1"
              >
                🔄 Redeal / Reset
              </button>
            )}
          </div>

          {(currentLesson.id === 'finesse' || currentLesson.id === 'crossruff') && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-2.5 text-center">
              <p className="text-xs sm:text-sm font-extrabold text-amber-300">
                🎯 {turnState % 2 === 0 ? 'GILIRAN LEADER (Mainkan kartu dari tangan)' : 'GILIRAN FOLLOW / RESPONS (Sambut kartu lawan)'}
              </p>
            </div>
          )}

          {/* ARENA MEJA KASINO POLA 4 ARAH MATA ANGIN "+" (CROSS / PLUS SHAPE) */}
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            
            {/* 1. NORTH HAND (DUMMY ATAS) */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400">NORTH (DUMMY)</span>
              <div className="transform scale-[1.1] sm:scale-100 origin-center">
                <CardHand cards={currentLesson.id === 'finesse' || currentLesson.id === 'crossruff' ? northCards : currentLesson.northHand} onSelectCard={(c) => handlePlayCard(c, 'north')} />
              </div>
            </div>

            {/* 2. MAT ARENA TRICK BENTUK TANDA TAMBAH "+" (CENTER MATRIX IS EMPTY IN MIDDLE) */}
            <div className="w-full max-w-md my-2 bg-[#061812] border border-emerald-800/80 rounded-3xl p-4 sm:p-6 shadow-inner flex items-center justify-center relative min-h-[220px]">
              
              {/* SLOT NORTH (UJUNG ATAS POLA +) */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <span className="text-[9px] font-bold text-slate-400 mb-0.5">NORTH</span>
                {tableCenterCards.north ? (
                  <div className="transform scale-80 sm:scale-90">
                    <PlayingCard card={tableCenterCards.north} />
                  </div>
                ) : (
                  <div className="w-14 h-20 border border-dashed border-emerald-800/50 rounded-lg flex items-center justify-center text-[9px] text-emerald-700 font-bold">N</div>
                )}
              </div>

              {/* SLOT WEST (UJUNG KIRI POLA +) */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                <span className="text-[9px] font-bold text-rose-400 mb-0.5">WEST</span>
                {tableCenterCards.west ? (
                  <div className="transform scale-80 sm:scale-90">
                    <PlayingCard card={tableCenterCards.west} />
                  </div>
                ) : (
                  <div className="w-14 h-20 border border-dashed border-emerald-800/50 rounded-lg flex items-center justify-center text-[9px] text-emerald-700 font-bold">W</div>
                )}
              </div>

              {/* CENTER SPACE (TENGAH POLA + KOSONG) */}
              <div className="w-16 h-16 rounded-full border border-emerald-900/30 flex items-center justify-center text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                ✚
              </div>

              {/* SLOT EAST (UJUNG KANAN POLA +) */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                <span className="text-[9px] font-bold text-rose-400 mb-0.5">EAST</span>
                {tableCenterCards.east ? (
                  <div className="transform scale-80 sm:scale-90">
                    <PlayingCard card={tableCenterCards.east} />
                  </div>
                ) : (
                  <div className="w-14 h-20 border border-dashed border-emerald-800/50 rounded-lg flex items-center justify-center text-[9px] text-emerald-700 font-bold">E</div>
                )}
              </div>

              {/* SLOT SOUTH (UJUNG BAWAH POLA +) */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                {tableCenterCards.south ? (
                  <div className="transform scale-80 sm:scale-90">
                    <PlayingCard card={tableCenterCards.south} />
                  </div>
                ) : (
                  <div className="w-14 h-20 border border-dashed border-emerald-800/50 rounded-lg flex items-center justify-center text-[9px] text-emerald-700 font-bold">S</div>
                )}
                <span className="text-[9px] font-bold text-emerald-300 mt-0.5">SOUTH</span>
              </div>

            </div>

            {/* 3. SOUTH HAND (ANDA BAWAH) */}
            <div className="flex flex-col items-center space-y-1">
              <div className="transform scale-[1.1] sm:scale-100 origin-center">
                <CardHand cards={currentLesson.id === 'finesse' || currentLesson.id === 'crossruff' ? southCards : currentLesson.southHand} onSelectCard={(c) => handlePlayCard(c, 'south')} />
              </div>
              <span className="text-[10px] font-bold text-emerald-300">SOUTH (ANDA)</span>
            </div>

          </div>

          {feedback && (
            <div className={`p-3 rounded-xl text-xs font-bold border text-center ${
              feedback.isError ? 'bg-rose-950/80 border-rose-800 text-rose-200' : 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
            }`}>
              {feedback.message}
            </div>
          )}

          {(feedback || (currentLesson.id !== 'finesse' && currentLesson.id !== 'crossruff')) && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-white space-y-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-400">💡 Penjelasan Teknik:</h4>
              <p className="text-xs text-slate-200 leading-relaxed">{currentLesson.description}</p>
            </div>
          )}

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

