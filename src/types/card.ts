export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
  id: string;        // Unique identifier (contoh: 'spades-A')
  suit: Suit;
  rank: Rank;
  value: number;     // Nilai numerik untuk perbandingan (Ace = 14, 2 = 2)
  hcp: number;       // High Card Points (A=4, K=3, Q=2, J=1, 10-2 = 0)
}

export type CardState = 'normal' | 'selected' | 'playable' | 'dimmed';
