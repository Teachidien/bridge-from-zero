import type { Card, Rank, Suit } from '../types/card';

// Nilai High Card Points (HCP) resmi Bridge
const HCP_MAP: Record<Rank, number> = {
  'A': 4,
  'K': 3,
  'Q': 2,
  'J': 1,
  '10': 0, '9': 0, '8': 0, '7': 0, '6': 0, '5': 0, '4': 0, '3': 0, '2': 0
};

// Nilai numerik untuk menentukan kartu tertinggi saat trick-taking
const VALUE_MAP: Record<Rank, number> = {
  'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10,
  '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
};

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * Menggenerasi 1 dek kartu Bridge lengkap (52 kartu)
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        value: VALUE_MAP[rank],
        hcp: HCP_MAP[rank]
      });
    }
  }
  
  return deck;
}

/**
 * Mengocok dek kartu (Fisher-Yates Shuffle)
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Mengurutkan kartu di tangan pemain secara otomatis (♠ -> ♥ -> ♦ -> ♣, dan A -> 2)
 */
export function sortHand(hand: Card[]): Card[] {
  const suitOrder: Record<Suit, number> = { spades: 0, hearts: 1, diamonds: 2, clubs: 3 };
  
  return [...hand].sort((a, b) => {
    if (suitOrder[a.suit] !== suitOrder[b.suit]) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return b.value - a.value; // Tertinggi ke terendah (A ke 2)
  });
}
