import React from 'react';
import type { Card, CardState, Suit } from '../types/card';
import { COLOR_PALETTE } from '../theme/colors';

interface PlayingCardProps {
  card: Card;
  state?: CardState;
  onClick?: () => void;
  isFaceDown?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Simbol SVG Vektor Tajam 4K
const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

// Map Warna Resmi dari Theme
const SUIT_COLORS: Record<Suit, string> = {
  spades: COLOR_PALETTE.card.spade,
  hearts: COLOR_PALETTE.card.heart,
  diamonds: COLOR_PALETTE.card.diamond,
  clubs: COLOR_PALETTE.card.club,
};

export const PlayingCard: React.FC<PlayingCardProps> = ({
  card,
  state = 'normal',
  onClick,
  isFaceDown = false,
  className = '',
  style = {},
}) => {
  const suitColor = SUIT_COLORS[card.suit];
  const suitSymbol = SUIT_SYMBOLS[card.suit];

  // Jika Kartu Menghadap ke Bawah (Card Back)
  if (isFaceDown) {
    return (
      <div
        onClick={onClick}
        style={style}
        className={`w-16 h-24 sm:w-24 sm:h-36 bg-[#182232] rounded-lg sm:rounded-xl shadow-md border-2 border-slate-700 flex items-center justify-center p-1 sm:p-2 cursor-pointer select-none transition-transform ${className}`}
      >
        <div className="w-full h-full border border-slate-600/60 rounded-md sm:rounded-lg flex items-center justify-center bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:6px_6px]">
          <span className="text-slate-500 font-bold text-xs sm:text-base">♠♥♦♣</span>
        </div>
      </div>
    );
  }

  // Tampilan Kartu Depan (Base Putih)
  const isSelected = state === 'selected';
  const isDimmed = state === 'dimmed';
  const isPlayable = state === 'playable';

  return (
    <div
      onClick={isDimmed ? undefined : onClick}
      style={style}
      className={`
        w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg sm:rounded-xl shadow-md border border-slate-300
        flex flex-col justify-between p-1 sm:p-2 cursor-pointer select-none transition-all duration-150
        ${isSelected ? 'transform -translate-y-6 ring-2 ring-amber-500/80 shadow-2xl border-amber-500' : ''}
        ${isPlayable ? 'ring-2 ring-emerald-500/80 shadow-lg' : ''}
        ${isDimmed ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'hover:-translate-y-6'}
        ${className}
      `}
    >
      {/* Pojok Kiri Atas (Harus Selalu Terlihat) */}
      <div className="font-extrabold text-[11px] sm:text-sm leading-none" style={{ color: suitColor }}>
        {card.rank}
        <br />
        <span className="text-[10px] sm:text-xs">{suitSymbol}</span>
      </div>

      {/* Simbol Utama di Tengah (Tertutup 100% saat menumpuk di tangan) */}
      <div className="text-center font-bold text-sm sm:text-2xl" style={{ color: suitColor }}>
        {suitSymbol}
      </div>

      {/* Pojok Kanan Bawah */}
      <div className="font-extrabold text-[11px] sm:text-sm leading-none text-right" style={{ color: suitColor }}>
        {suitSymbol}
        <br />
        {card.rank}
      </div>
    </div>
  );
};
