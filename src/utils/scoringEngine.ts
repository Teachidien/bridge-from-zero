import type { BidSuit } from '../types/bidding';

export interface ScoreCalculationResult {
  isMake: boolean;
  targetTricks: number;
  tricksWon: number;
  contractScore: number;
  gameBonus: number;
  partScoreBonus: number;
  overtrickScore: number;
  slamBonus: number;
  undertrickPenalty: number;
  totalScore: number;
}

/**
 * Mengkalkulasi Skor Resmi Bridge (Duplicate / Rubber Bridge Scoring Rules)
 * @param level Level kontrak (1 s/d 7)
 * @param suit Suit kontrak ('clubs' | 'diamonds' | 'hearts' | 'spades' | 'NT')
 * @param tricksWon Jumlah trick yang dimenangkan oleh declarer (0 s/d 13)
 * @param isVulnerable Status Vulnerability (true jika Vulnerable, false jika Non-Vulnerable)
 */
export function calculateBridgeScore(
  level: number,
  suit: BidSuit,
  tricksWon: number,
  isVulnerable: boolean = false
): ScoreCalculationResult {
  const targetTricks = level + 6;
  const isMake = tricksWon >= targetTricks;

  if (isMake) {
    let contractScore = 0;
    const isMinor = suit === 'clubs' || suit === 'diamonds';
    const isMajor = suit === 'hearts' || suit === 'spades';

    if (isMinor) {
      contractScore = level * 20;
    } else if (isMajor) {
      contractScore = level * 30;
    } else if (suit === 'NT') {
      contractScore = 40 + (level - 1) * 30;
    }

    const isGame = contractScore >= 100;
    const gameBonus = isGame ? (isVulnerable ? 500 : 300) : 0;
    const partScoreBonus = isGame ? 0 : 50;

    // Overtricks
    const overtricks = tricksWon - targetTricks;
    let overtrickScore = 0;
    if (overtricks > 0) {
      const valPerOver = isMinor ? 20 : 30;
      overtrickScore = overtricks * valPerOver;
    }

    // Slam Bonus
    let slamBonus = 0;
    if (level === 6) {
      slamBonus = isVulnerable ? 750 : 500; // Small Slam
    } else if (level === 7) {
      slamBonus = isVulnerable ? 1500 : 1000; // Grand Slam
    }

    const totalScore = contractScore + gameBonus + partScoreBonus + overtrickScore + slamBonus;

    return {
      isMake: true,
      targetTricks,
      tricksWon,
      contractScore,
      gameBonus,
      partScoreBonus,
      overtrickScore,
      slamBonus,
      undertrickPenalty: 0,
      totalScore,
    };
  } else {
    // Undertrick Penalty
    const undertricks = targetTricks - tricksWon;
    const penaltyPerTrick = isVulnerable ? 100 : 50;
    const undertrickPenalty = undertricks * penaltyPerTrick;

    return {
      isMake: false,
      targetTricks,
      tricksWon,
      contractScore: 0,
      gameBonus: 0,
      partScoreBonus: 0,
      overtrickScore: 0,
      slamBonus: 0,
      undertrickPenalty,
      totalScore: -undertrickPenalty,
    };
  }
}
