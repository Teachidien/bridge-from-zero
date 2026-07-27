import type { Card, Suit } from '../types/card';
import { createDeck, shuffleDeck, sortHand } from './deck';

export type PlayerPosition = 'north' | 'south' | 'east' | 'west';

export interface HandEvaluation {
  hcp: number;
  distribution: string; // e.g., "5-4-2-2"
  suitCounts: Record<Suit, number>;
}

export interface DealResult {
  hands: Record<PlayerPosition, Card[]>;
  evaluations: Record<PlayerPosition, HandEvaluation>;
}

/**
 * Menghitung Poin HCP dan Pola Distribusi Suit untuk satu tangan kartu (13 kartu)
 */
export function evaluateHand(hand: Card[]): HandEvaluation {
  let hcp = 0;
  const suitCounts: Record<Suit, number> = {
    spades: 0,
    hearts: 0,
    diamonds: 0,
    clubs: 0,
  };

  hand.forEach((card) => {
    hcp += card.hcp;
    suitCounts[card.suit] += 1;
  });

  const distArray = Object.values(suitCounts).sort((a, b) => b - a);
  const distribution = distArray.join('-');

  return {
    hcp,
    distribution,
    suitCounts,
  };
}

/**
 * Mengocok 52 dek kartu secara acak (Fisher-Yates) dan membagikan 13 kartu presisi ke 4 posisi pemain (North, South, East, West)
 */
export function dealHands(): DealResult {
  const deck = createDeck();
  const shuffled = shuffleDeck(deck);

  const rawHands: Record<PlayerPosition, Card[]> = {
    north: shuffled.slice(0, 13),
    east: shuffled.slice(13, 26),
    south: shuffled.slice(26, 39),
    west: shuffled.slice(39, 52),
  };

  const hands: Record<PlayerPosition, Card[]> = {
    north: sortHand(rawHands.north),
    east: sortHand(rawHands.east),
    south: sortHand(rawHands.south),
    west: sortHand(rawHands.west),
  };

  const evaluations: Record<PlayerPosition, HandEvaluation> = {
    north: evaluateHand(hands.north),
    east: evaluateHand(hands.east),
    south: evaluateHand(hands.south),
    west: evaluateHand(hands.west),
  };

  return {
    hands,
    evaluations,
  };
}
