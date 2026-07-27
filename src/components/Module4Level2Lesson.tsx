import React, { useState } from 'react';
import { CardHand } from './CardHand';
import { PlayingCard } from './PlayingCard';
import type { Card } from '../types/card';

interface FinesseVariant {
  title: string;
  northHand: Card[];
  southHand: Card[];
  explanation: string;
  correctCardId: string;
  correctFeedback: string;
  wrongFeedback: string;
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
  finesseVariants?: FinesseVariant[];
  correctCardId?: string;
  correctFeedback?: string;
  wrongFeedback?: string;
}

const LEVEL_2_LESSONS: VisualLesson[] = [
  {
    id: 'finesse',
    title: 'Teknik Finesse (Jebakan Kartu High)',
    category: 'Play',
    description: 'Finesse adalah teknik menjebak kartu kehormatan musuh (seperti King lawan) yang tersembunyi dengan mengalirkan kartu kecil dari tangan menuju kartu kombinasi kehormatan.',
    keyRule: 'Prinsip Finesse: Selalu jalankan kartu kecil menuju kombinasi tenas (A-Q / A-Q-10)!',
    northHand: [],
    southHand: [],
    actionNote: '',
    finesseVariants: [
      {
        title: 'Variasi 1: Finesse Standard (A-Q-J vs 2-3-4 + Tangga ♦)',
        northHand: [
          { id: 'f1-n-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
          { id: 'f1-n-2', suit: 'spades', rank: 'Q', value: 12, hcp: 2 },
          { id: 'f1-n-3', suit: 'spades', rank: 'J', value: 11, hcp: 1 },
          { id: 'f1-n-4', suit: 'diamonds', rank: '3', value: 3, hcp: 0 },
        ],
        southHand: [
          { id: 'f1-s-1', suit: 'spades', rank: '4', value: 4, hcp: 0 },
          { id: 'f1-s-2', suit: 'spades', rank: '3', value: 3, hcp: 0 },
          { id: 'f1-s-3', suit: 'spades', rank: '2', value: 2, hcp: 0 },
          { id: 'f1-s-4', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 },
        ],
        correctCardId: 'f1-s-3', // ♠2 dari South
        correctFeedback: '🎉 TEPAT SEKALI! Anda memainkan ♠2 kecil dari South menuju ♠A-Q-J North. Jika West (Kiri) pasang ♠K, sergap dengan ♠A. Jika West pasang kecil, pasang ♠J / ♠Q ➔ Menang 3 Trick!',
        wrongFeedback: '❌ KURANG TEPAT! Memainkan ♠A langsung dari North akan membuat ♠K musuh selamat. Selalu jalan kartu kecil (♠2) dari tangan South menuju kombinasi ♠A-Q-J!',
        explanation: 'Bagaimana cara agar kombinasi kartu A-Q-J di North dan 2-3-4 di South bisa menang 3x (3 Trick)? Syarat utamanya: King lawan (K) harus berada di KIRI (West / Sebelum North), bukan di kanan (East)! Kartu ♦A di South & ♦3 di North digunakan sebagai "Tangga (Entry)" untuk masuk kembali ke tangan South.',
      },
      {
        title: 'Variasi 2: Finesse Lanjutan (A-Q-10 vs J-2-3 + Tangga ♦)',
        northHand: [
          { id: 'f2-n-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
          { id: 'f2-n-2', suit: 'spades', rank: 'Q', value: 12, hcp: 2 },
          { id: 'f2-n-3', suit: 'spades', rank: '10', value: 10, hcp: 0 },
          { id: 'f2-n-4', suit: 'diamonds', rank: '2', value: 2, hcp: 0 },
        ],
        southHand: [
          { id: 'f2-s-1', suit: 'spades', rank: 'J', value: 11, hcp: 1 },
          { id: 'f2-s-2', suit: 'spades', rank: '3', value: 3, hcp: 0 },
          { id: 'f2-s-3', suit: 'spades', rank: '2', value: 2, hcp: 0 },
          { id: 'f2-s-4', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 },
        ],
        correctCardId: 'f2-s-1', // ♠J atau ♠2 dari South
        correctFeedback: '🎉 TEPAT SEKALI! Anda mengalirkan ♠J (atau ♠2) dari South. Jika West tidak pasang ♠K, biarkan ♠J terus berjalan! Jika West membalas ♠K, sergap dengan ♠A.',
        wrongFeedback: '❌ KURANG TEPAT! Memainkan ♠A atau ♠Q langsung dari North membuat ♠K musuh bisa memakan kartu kehormatan Anda. Alirkan ♠J dari South!',
        explanation: 'Pada variasi A-Q-10 di North dan J-2-3 di South, Anda mengalirkan Jack (♠J) dari South. Jika West tidak menutup dengan ♠K, biarkan ♠J berjalan! Jika ditutup ♠K, makan dengan ♠A ➔ ♠Q & ♠10 milik North menjadi kartu pemenang!',
      }
    ]
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
    description: 'Dengan Spades ♠ sebagai Trump, North memotong (ruff) suit Hearts ♥ menggunakan ♠K, dan South memotong suit Clubs ♣ menggunakan ♠A. Keduanya saling memotong secara bergantian!',
    keyRule: 'Prinsip Cross-Ruff: Potong silang suit yang Anda tidak miliki menggunakan kartu Trump pasangan!',
    northHand: [
      { id: 'cr-n-1', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
      { id: 'cr-n-2', suit: 'clubs', rank: '3', value: 3, hcp: 0 },
    ],
    southHand: [
      { id: 'cr-s-1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
      { id: 'cr-s-2', suit: 'hearts', rank: '3', value: 3, hcp: 0 },
    ],
    correctCardId: 'cr-s-2', // ♥3 dari South ke North ♠K
    correctFeedback: '🎉 TEPAT SEKALI! South memainkan ♥3 ➔ North potong dengan ♠K! Kemudian North memimpin ♣3 ➔ South potong dengan ♠A ➔ Berhasil menang 2 Trick!',
    wrongFeedback: '❌ KURANG TEPAT! Memainkan ♠A langsung dari South membuang kartu Trump Anda tanpa hasil. Jalan ♥3 dulu dari South agar North bisa memotongnya!',
    actionNote: 'Alur Main (Trump ♠ Spades): South jalan ♥3 ➔ North potong dengan ♠K (Ruff ♥)! Lalu North jalan ♣3 ➔ South potong dengan ♠A (Ruff ♣) ➔ Menang 2 Trick!'
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
  const [finesseSubTab, setFinesseSubTab] = useState<number>(0);
  const [playResult, setPlayResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  const currentLesson = LEVEL_2_LESSONS[activeTab];

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setFinesseSubTab(0);
    setPlayResult(null);
  };

  const handleSubTabChange = (subIdx: number) => {
    setFinesseSubTab(subIdx);
    setPlayResult(null);
  };

  const handleCardClick = (card: Card) => {
    // Cek Finesse / Crossruff interactive play
    if (currentLesson.id === 'finesse' && currentLesson.finesseVariants) {
      const variant = currentLesson.finesseVariants[finesseSubTab];
      if (card.id === variant.correctCardId || (finesseSubTab === 1 && card.id === 'f2-s-3')) {
        setPlayResult({ isCorrect: true, feedback: variant.correctFeedback });
      } else {
        setPlayResult({ isCorrect: false, feedback: variant.wrongFeedback });
      }
    } else if (currentLesson.id === 'crossruff') {
      if (card.id === currentLesson.correctCardId) {
        setPlayResult({ isCorrect: true, feedback: currentLesson.correctFeedback! });
      } else {
        setPlayResult({ isCorrect: false, feedback: currentLesson.wrongFeedback! });
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
          
          {/* Judul Utama Teknik */}
          <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-white flex justify-between items-center">
            <h3 className="text-sm sm:text-base font-extrabold text-amber-400 flex items-center gap-1.5">
              <span>{currentLesson.category === 'Play' ? '🃏' : '🛡️'}</span>
              {currentLesson.title}
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 uppercase">
              {currentLesson.category}
            </span>
          </div>

          {/* KHUSUS FINESSE: Sub-Tab Variasi (Variasi 1 vs Variasi 2) */}
          {currentLesson.finesseVariants && (
            <div className="flex gap-2 justify-center">
              {currentLesson.finesseVariants.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSubTabChange(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition border ${
                    finesseSubTab === idx
                      ? 'bg-amber-500 text-slate-900 border-amber-400 shadow-md scale-105'
                      : 'bg-[#071E17] text-slate-300 border-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  {v.title.split(':')[0]}
                </button>
              ))}
            </div>
          )}

          {/* Pertanyaan Utama di Atas Kartu (Finesse & Cross-Ruff) */}
          {currentLesson.id === 'finesse' && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-center">
              <p className="text-xs sm:text-sm font-extrabold text-amber-300">
                ❓ Pertanyaan: KETUK/MAINKAN KARTU ANDA di bawah ini untuk menang 3x (3 Trick)!
              </p>
            </div>
          )}

          {currentLesson.id === 'crossruff' && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-center">
              <p className="text-xs sm:text-sm font-extrabold text-amber-300">
                ❓ Pertanyaan: KETUK/MAINKAN KARTU ANDA di bawah ini untuk menang 2x (Trump ♠ Spades)!
              </p>
            </div>
          )}

          {/* 1. VISUALISASI KARTU DI ATAS (INTERAKTIF KETUK KARTU) */}
          <div className="space-y-3 py-1">
            {currentLesson.finesseVariants ? (
              (() => {
                const variant = currentLesson.finesseVariants[finesseSubTab];
                return (
                  <div className="space-y-3">
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-[10px] font-bold text-slate-400">NORTH (DUMMY)</span>
                      <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
                        <CardHand cards={variant.northHand} onSelectCard={handleCardClick} />
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
                        <CardHand cards={variant.southHand} onSelectCard={handleCardClick} />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-300">SOUTH (ANDA - KETUK KARTU UNTUK MAIN)</span>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="space-y-3">
                {currentLesson.northHand.length > 0 && (
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-[10px] font-bold text-slate-400">PARTNER / DUMMY (NORTH)</span>
                    <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
                      <CardHand cards={currentLesson.northHand} onSelectCard={handleCardClick} />
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
                    <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
                      <CardHand cards={currentLesson.southHand} onSelectCard={handleCardClick} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300">KARTU ANDA (SOUTH - KETUK KARTU)</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* HASIL PERCOBAAN BERMAIN (JIKA MAIN SALAH ATAU BENAR) */}
          {playResult && (
            <div className={`p-3 rounded-xl text-xs font-bold border text-center ${
              playResult.isCorrect
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                : 'bg-rose-100 border-rose-300 text-rose-900'
            }`}>
              {playResult.feedback}
            </div>
          )}

          {/* 2. PENJELASAN MURNI BARU MUNCIUL SETELAH DIMAIN KAN / SECARA NORMAL TERSEMBUNYI UNTUK FITUR INTERAKTIF */}
          {(playResult || (!currentLesson.finesseVariants && currentLesson.id !== 'crossruff')) && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-2xl p-3 text-white space-y-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-400">
                💡 {currentLesson.finesseVariants ? currentLesson.finesseVariants[finesseSubTab].title : 'Penjelasan Teknik:'}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentLesson.finesseVariants ? currentLesson.finesseVariants[finesseSubTab].explanation : currentLesson.description}
              </p>
            </div>
          )}

          {/* 3. ALUR AKSI MAIN */}
          {(playResult || (!currentLesson.finesseVariants && currentLesson.id !== 'crossruff')) && (
            <div className="bg-[#071E17] border border-emerald-800 rounded-xl p-2.5 text-xs text-amber-200 font-bold text-center">
              ⚡ {currentLesson.actionNote || (playResult?.isCorrect ? 'Langkah bermain Anda sudah tepat!' : 'Cobalah alur langkah yang disarankan di atas.')}
            </div>
          )}

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

