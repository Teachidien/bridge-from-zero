import React, { useState } from 'react';
import { CardHand } from './CardHand';
import type { Card } from '../types/card';
import type { BidSuit } from '../types/bidding';
import { COLOR_PALETTE } from '../theme/colors';

// Sample Hands untuk Modul 2
const NORTH_CARDS: Card[] = [
  { id: 'n-s-A', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
  { id: 'n-s-K', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
  { id: 'n-s-J', suit: 'spades', rank: 'J', value: 11, hcp: 1 },
  { id: 'n-s-8', suit: 'spades', rank: '8', value: 8, hcp: 0 },
  { id: 'n-s-3', suit: 'spades', rank: '3', value: 3, hcp: 0 },
  { id: 'n-h-Q', suit: 'hearts', rank: 'Q', value: 12, hcp: 2 },
  { id: 'n-h-7', suit: 'hearts', rank: '7', value: 7, hcp: 0 },
  { id: 'n-h-2', suit: 'hearts', rank: '2', value: 2, hcp: 0 },
  { id: 'n-d-K', suit: 'diamonds', rank: 'K', value: 13, hcp: 3 },
  { id: 'n-d-9', suit: 'diamonds', rank: '9', value: 9, hcp: 0 },
  { id: 'n-d-4', suit: 'diamonds', rank: '4', value: 4, hcp: 0 },
  { id: 'n-c-10', suit: 'clubs', rank: '10', value: 10, hcp: 0 },
  { id: 'n-c-5', suit: 'clubs', rank: '5', value: 5, hcp: 0 },
];

const SOUTH_CARDS: Card[] = [
  { id: 's-s-Q', suit: 'spades', rank: 'Q', value: 12, hcp: 2 },
  { id: 's-s-10', suit: 'spades', rank: '10', value: 10, hcp: 0 },
  { id: 's-s-6', suit: 'spades', rank: '6', value: 6, hcp: 0 },
  { id: 's-s-2', suit: 'spades', rank: '2', value: 2, hcp: 0 },
  { id: 's-h-A', suit: 'hearts', rank: 'A', value: 14, hcp: 4 },
  { id: 's-h-5', suit: 'hearts', rank: '5', value: 5, hcp: 0 },
  { id: 's-d-A', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 },
  { id: 's-d-J', suit: 'diamonds', rank: 'J', value: 11, hcp: 1 },
  { id: 's-d-8', suit: 'diamonds', rank: '8', value: 8, hcp: 0 },
  { id: 's-d-3', suit: 'diamonds', rank: '3', value: 3, hcp: 0 },
  { id: 's-c-K', suit: 'clubs', rank: 'K', value: 13, hcp: 3 },
  { id: 's-c-8', suit: 'clubs', rank: '8', value: 8, hcp: 0 },
  { id: 's-c-4', suit: 'clubs', rank: '4', value: 4, hcp: 0 },
];

const SUITS: { suit: BidSuit; symbol: string; color: string }[] = [
  { suit: 'clubs', symbol: '♣', color: COLOR_PALETTE.card.club },
  { suit: 'diamonds', symbol: '♦', color: COLOR_PALETTE.card.diamond },
  { suit: 'hearts', symbol: '♥', color: COLOR_PALETTE.card.heart },
  { suit: 'spades', symbol: '♠', color: COLOR_PALETTE.card.spade },
  { suit: 'NT', symbol: 'NT', color: COLOR_PALETTE.card.spade },
];

export const Module2Lesson: React.FC = () => {
  const [selectedSuit, setSelectedSuit] = useState<BidSuit | null>(null);

  const handleSuitSelect = (suit: BidSuit) => {
    setSelectedSuit(suit);
  };

  return (
    <div className="bg-[#F1F5F9] text-slate-800 flex flex-col gap-3 p-3 sm:p-5 select-none">
      
      {/* Header Modul */}
      <header className="w-full max-w-4xl mx-auto flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              MODUL 2: FIT & PENCOCOKAN KARTU
            </span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            Tingkat 1 (Pemula)
          </span>
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full w-2/3 transition-all duration-500"></div>
        </div>
      </header>

      {/* Konten Utama (2 Set Kartu Normal Berhadapan + Mini Suit Bidding Box) */}
      <main className="max-w-4xl mx-auto w-full">
        
        {/* Meja Kasino Hijau Emerald */}
        <div className="w-full bg-[#0B231B] border border-emerald-900 rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col justify-between space-y-4">
          
          {/* Kartu North (Partner) */}
          <div className="w-full flex flex-col items-center space-y-1">
            <div className="text-xs font-bold text-amber-400 bg-[#061812] px-3 py-1 rounded-full border border-emerald-900">
              👤 KARTU PARTNER (NORTH)
            </div>
            <CardHand cards={NORTH_CARDS} />
          </div>

          {/* Bidding Box Mini Khusus Lambang di Tengah Meja */}
          <div className="w-full max-w-xl mx-auto bg-[#071E17] border border-emerald-800 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col items-center space-y-3">
            <p className="text-xs sm:text-sm font-extrabold text-amber-400 text-center">
              Berdasarkan 2 set kartu berhadapan di atas, manakah <strong className="text-white">SUIT TRUMP</strong> yang paling cocok (Fit ≥ 8 Kartu)?
            </p>

            <div className="w-full flex items-center justify-center gap-2">
              {SUITS.map(({ suit, symbol, color }) => (
                <button
                  key={suit}
                  onClick={() => handleSuitSelect(suit)}
                  style={{ color }}
                  className="flex-1 bg-white hover:bg-slate-100 font-extrabold py-2 sm:py-3 rounded-xl text-lg sm:text-2xl shadow transition border border-slate-200"
                >
                  {symbol}
                </button>
              ))}
            </div>

            {selectedSuit && (
              <div className={`w-full p-3 rounded-xl text-xs font-bold text-center border ${selectedSuit === 'spades' ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-rose-100 border-rose-300 text-rose-900'}`}>
                {selectedSuit === 'spades' ? (
                  <span>🎉 <strong>100% BENAR!</strong> North (5♠) + South (4♠) = <strong>9 Kartu Spades ♠</strong>. Pasangan Anda mencapai FIT 9 kartu Spades ♠!</span>
                ) : (
                  <span>❌ <strong>KURANG TEPAT!</strong> Coba hitung kartu Spades (♠). North punya 5♠ dan South punya 4♠ (Total 9 Kartu Fit). Ketuk lambang ♠!</span>
                )}
              </div>
            )}
          </div>

          {/* Kartu South (Anda) */}
          <div className="w-full flex flex-col items-center space-y-1">
            <CardHand cards={SOUTH_CARDS} />
            <div className="text-xs font-bold text-emerald-300 bg-[#061812] px-3 py-1 rounded-full border border-emerald-900">
              👤 KARTU ANDA (SOUTH)
            </div>
          </div>

        </div>

      </main>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto w-full flex justify-between items-center">
        <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
          ⬅️ Sebelumnya
        </button>
        <button className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition">
          Modul Berikutnya ➔
        </button>
      </footer>

    </div>
  );
};
