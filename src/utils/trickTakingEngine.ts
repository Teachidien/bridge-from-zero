import type { Card, Suit } from '../types/card';
import type { PlayerPosition } from './dealer';
import type { BidSuit } from '../types/bidding';

export interface PlayedCard {
  player: PlayerPosition;
  card: Card;
}

export interface TrickState {
  trickNumber: number; // 1 - 13
  leader: PlayerPosition;
  ledSuit: Suit | null;
  playedCards: PlayedCard[]; // max 4 cards
  winner: PlayerPosition | null;
}

export interface GameTrickScore {
  nsTricks: number;
  ewTricks: number;
}

const RANK_VALUES: Record<string, number> = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
};

/**
 * Mengevaluasi pemenang 1 trick (4 kartu di tengah meja)
 * Mengikuti aturan resmi Bridge:
 * 1. Jika ada kartu Trump, kartu Trump dengan rank tertinggi MENANG.
 * 2. Jika tidak ada Trump, kartu dengan Led Suit bernilai rank tertinggi MENANG.
 */
export function evaluateTrickWinner(
  playedCards: PlayedCard[],
  trumpSuit: BidSuit
): PlayerPosition {
  if (playedCards.length === 0) {
    throw new Error('Tidak ada kartu dimainkan dalam trick ini');
  }

  const ledSuit = playedCards[0].card.suit;
  const isTrumpContract = trumpSuit !== 'NT';
  const targetTrumpSuit = isTrumpContract ? (trumpSuit.toLowerCase() as Suit) : null;

  // Filter apakah ada kartu Trump yang dimainkan
  const trumpPlays = targetTrumpSuit
    ? playedCards.filter((p) => p.card.suit === targetTrumpSuit)
    : [];

  if (trumpPlays.length > 0) {
    // Ada kartu Trump yang keluar (Ruffing), Trump tertinggi menang!
    trumpPlays.sort((a, b) => RANK_VALUES[b.card.rank] - RANK_VALUES[a.card.rank]);
    return trumpPlays[0].player;
  }

  // Jika tidak ada Trump, filter kartu yang mengikuti Led Suit
  const ledSuitPlays = playedCards.filter((p) => p.card.suit === ledSuit);
  ledSuitPlays.sort((a, b) => RANK_VALUES[b.card.rank] - RANK_VALUES[a.card.rank]);

  return ledSuitPlays[0].player;
}

/**
 * Mengecek apakah kartu tertentu dari pemain valid untuk dimainkan (Mandatory Follow Suit Check)
 */
export function isCardPlayValid(
  cardToPlay: Card,
  playerHand: Card[],
  ledSuit: Suit | null
): boolean {
  // Jika ini kartu pertama di trick (Lead), bebas memilih kartu apapun
  if (!ledSuit) {
    return true;
  }

  // Cek apakah pemain memiliki kartu ber-suit sama dengan ledSuit di tangannya
  const hasLedSuit = playerHand.some((c) => c.suit === ledSuit);

  if (hasLedSuit) {
    // Pemain WAJIB mengeluarkan kartu yang suit-nya sama dengan ledSuit
    return cardToPlay.suit === ledSuit;
  }

  // Jika tidak punya ledSuit di tangan, pemain bebas mengeluarkan kartu apapun (Trump / Discard)
  return true;
}
