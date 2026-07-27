import React, { useState } from 'react';
import type { BidSuit, Call } from '../types/bidding';
import { COLOR_PALETTE } from '../theme/colors';

interface BiddingBoxProps {
  onMakeCall: (call: Call) => void;
  canDouble?: boolean;
  canRedouble?: boolean;
  className?: string;
}

const SUITS: { suit: BidSuit; symbol: string; color: string }[] = [
  { suit: 'clubs', symbol: '♣', color: COLOR_PALETTE.card.club },
  { suit: 'diamonds', symbol: '♦', color: COLOR_PALETTE.card.diamond },
  { suit: 'hearts', symbol: '♥', color: COLOR_PALETTE.card.heart },
  { suit: 'spades', symbol: '♠', color: COLOR_PALETTE.card.spade },
  { suit: 'NT', symbol: 'NT', color: COLOR_PALETTE.card.spade },
];

export const BiddingBox: React.FC<BiddingBoxProps> = ({
  onMakeCall,
  canDouble = false,
  canRedouble = false,
  className = '',
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(1);

  const handleSuitClick = (suit: BidSuit) => {
    if (!selectedLevel) return;
    onMakeCall({
      type: 'bid',
      bid: { level: selectedLevel, suit },
    });
  };

  const handlePass = () => {
    onMakeCall({ type: 'special', call: 'PASS' });
  };

  const handleDouble = () => {
    onMakeCall({ type: 'special', call: 'DOUBLE' });
  };

  const handleRedouble = () => {
    onMakeCall({ type: 'special', call: 'REDOUBLE' });
  };

  return (
    <div className={`w-full max-w-3xl mx-auto bg-[#0B2A20] border border-emerald-800/80 rounded-2xl p-2.5 sm:p-3 shadow-xl flex flex-col space-y-2 select-none ${className}`}>
      
      {/* Baris 1: Tombol PASS + Level 1 - 7 */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={handlePass}
          className="bg-[#059669] hover:bg-[#047857] text-white font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs shadow-md transition border border-emerald-500 flex-shrink-0"
        >
          PASS
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5 flex-1">
          {[1, 2, 3, 4, 5, 6, 7].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`
                  flex-1 font-extrabold py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm shadow transition border
                  ${isSelected ? 'bg-amber-500 text-slate-900 ring-2 ring-amber-400 border-amber-500' : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-200'}
                `}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Baris 2: Simbol Suits (♣ ♦ ♥ ♠ NT) + DBL / RDBL */}
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1">
          {SUITS.map(({ suit, symbol, color }) => (
            <button
              key={suit}
              onClick={() => handleSuitClick(suit)}
              style={{ color }}
              className="flex-1 bg-white hover:bg-slate-100 font-extrabold py-1.5 sm:py-2 rounded-xl text-base sm:text-lg shadow transition border border-slate-200"
            >
              {symbol}
            </button>
          ))}
        </div>

        <div className="flex space-x-1 flex-shrink-0">
          <button
            onClick={handleDouble}
            disabled={!canDouble}
            className={`font-extrabold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[11px] sm:text-xs shadow transition ${
              canDouble ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white' : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
            }`}
          >
            DBL
          </button>
          <button
            onClick={handleRedouble}
            disabled={!canRedouble}
            className={`font-extrabold px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl text-[11px] sm:text-xs shadow transition ${
              canRedouble ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white' : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
            }`}
          >
            RDBL
          </button>
        </div>
      </div>

    </div>
  );
};
