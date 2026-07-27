import React, { useState } from 'react';
import { CardHand } from './CardHand';
import type { BidSuit } from '../types/bidding';
import type { Suit } from '../types/card';
import { COLOR_PALETTE } from '../theme/colors';
import { dealHands } from '../utils/dealer';

const SUITS: { suit: BidSuit; symbol: string; color: string }[] = [
  { suit: 'clubs', symbol: '♣', color: COLOR_PALETTE.card.club },
  { suit: 'diamonds', symbol: '♦', color: COLOR_PALETTE.card.diamond },
  { suit: 'hearts', symbol: '♥', color: COLOR_PALETTE.card.heart },
  { suit: 'spades', symbol: '♠', color: COLOR_PALETTE.card.spade },
  { suit: 'NT', symbol: 'NT', color: COLOR_PALETTE.card.spade },
];

export const Module2Lesson: React.FC = () => {
  const [deal, setDeal] = useState(() => dealHands());
  const [selectedSuit, setSelectedSuit] = useState<BidSuit | null>(null);

  const northCards = deal.hands.north;
  const southCards = deal.hands.south;

  // Hitung jumlah gabungan North + South per suit untuk menentukan suit mana yang Fit (>= 8 kartu)
  const getCombinedCounts = () => {
    const counts: Record<Suit, { north: number; south: number; total: number }> = {
      spades: { north: 0, south: 0, total: 0 },
      hearts: { north: 0, south: 0, total: 0 },
      diamonds: { north: 0, south: 0, total: 0 },
      clubs: { north: 0, south: 0, total: 0 },
    };

    northCards.forEach((c) => counts[c.suit].north++);
    southCards.forEach((c) => counts[c.suit].south++);
    (Object.keys(counts) as Suit[]).forEach((s) => {
      counts[s].total = counts[s].north + counts[s].south;
    });

    return counts;
  };

  const combinedCounts = getCombinedCounts();

  // Temukan suit dengan total gabungan terbesar (best fit)
  const bestFitSuit = (Object.keys(combinedCounts) as Suit[]).reduce((best, current) => {
    return combinedCounts[current].total > combinedCounts[best].total ? current : best;
  }, 'spades' as Suit);

  const bestFitTotal = combinedCounts[bestFitSuit].total;

  const handleSuitSelect = (suit: BidSuit) => {
    setSelectedSuit(suit);
  };

  const handleRedeal = () => {
    setDeal(dealHands());
    setSelectedSuit(null);
  };

  const suitNameMap: Record<Suit, string> = {
    spades: 'Spades ♠',
    hearts: 'Hearts ♥',
    diamonds: 'Diamonds ♦',
    clubs: 'Clubs ♣',
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
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full w-2/3 transition-all duration-500"></div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-4xl mx-auto w-full">
        
        {/* Meja Kasino Hijau Emerald */}
        <div className="w-full bg-[#0B231B] border border-emerald-900 rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col justify-between space-y-4">
          
          {/* Kartu North (Partner) + Tombol Redeal */}
          <div className="w-full flex flex-col items-center space-y-1">
            <div className="w-full flex justify-between items-center px-1 sm:px-2">
              <div className="text-[10px] sm:text-xs font-bold text-amber-400 bg-[#061812] px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-900">
                👤 PARTNER (NORTH)
              </div>
              <button
                onClick={handleRedeal}
                className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded-xl shadow flex items-center gap-1 transition active:scale-95"
              >
                <span>🔄</span>
                <span>Redeal</span>
              </button>
            </div>
            
            <div className="w-full overflow-hidden flex justify-center py-1">
              <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
                <CardHand cards={northCards} />
              </div>
            </div>
          </div>

          {/* Bidding Box Mini Ringkas di Tengah Meja */}
          <div className="w-full max-w-md mx-auto bg-[#071E17] border border-emerald-800 rounded-2xl p-2 sm:p-3 shadow-xl flex flex-col items-center space-y-1.5">
            <p className="text-[11px] sm:text-xs font-extrabold text-amber-400 text-center">
              Apa kontrak yang cocok?
            </p>

            <div className="w-full flex items-center justify-center gap-1">
              {SUITS.map(({ suit, symbol, color }) => (
                <button
                  key={suit}
                  onClick={() => handleSuitSelect(suit)}
                  style={{ color }}
                  className={`flex-1 bg-white hover:bg-slate-100 font-extrabold py-1 sm:py-2 rounded-lg text-sm sm:text-lg shadow transition border ${
                    selectedSuit === suit ? 'ring-2 ring-amber-500 scale-105' : 'border-slate-200'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>

            {selectedSuit && (
              <div className={`w-full p-2 rounded-xl text-[10px] sm:text-xs font-bold text-center border ${
                selectedSuit === bestFitSuit || (bestFitTotal < 8 && selectedSuit === 'NT')
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                  : 'bg-rose-100 border-rose-300 text-rose-900'
              }`}>
                {selectedSuit === bestFitSuit ? (
                  <span>🎉 <strong>BENAR!</strong> North ({combinedCounts[bestFitSuit].north}) + South ({combinedCounts[bestFitSuit].south}) = <strong>{bestFitTotal} Kartu {suitNameMap[bestFitSuit]}</strong>!</span>
                ) : bestFitTotal < 8 && selectedSuit === 'NT' ? (
                  <span>🎉 <strong>BENAR!</strong> Tidak ada suit 8+ fit, No-Trump (NT) paling tepat!</span>
                ) : (
                  <span>❌ <strong>KURANG TEPAT.</strong> Fit terbanyak adalah <strong>{suitNameMap[bestFitSuit]} ({bestFitTotal} Kartu)</strong>.</span>
                )}
              </div>
            )}
          </div>

          {/* Kartu South (Anda) */}
          <div className="w-full flex flex-col items-center space-y-1">
            <div className="w-full overflow-hidden flex justify-center py-1">
              <div className="transform scale-[1.25] sm:scale-100 origin-center my-2">
                <CardHand cards={southCards} />
              </div>
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-emerald-300 bg-[#061812] px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-900">
              👤 ANDA (SOUTH)
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

