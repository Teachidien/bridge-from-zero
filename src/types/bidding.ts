export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type BidSuit = Suit | 'NT';

export type SpecialCall = 'PASS' | 'DOUBLE' | 'REDOUBLE';

export interface Bid {
  level: number; // 1 s/d 7
  suit: BidSuit;
}

export type Call = 
  | { type: 'bid'; bid: Bid }
  | { type: 'special'; call: SpecialCall };

export interface BidHistoryItem {
  player: 'north' | 'south' | 'east' | 'west';
  call: Call;
}
