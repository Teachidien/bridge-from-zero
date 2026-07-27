import type { PlayerPosition } from './dealer';
import type { BidSuit } from '../types/bidding';

export interface ContractBid {
  level: number; // 1 - 7
  suit: BidSuit; // 'clubs' | 'diamonds' | 'hearts' | 'spades' | 'NT'
  suitOrder: number; // 1: ♣, 2: ♦, 3: ♥, 4: ♠, 5: NT
  code: string; // e.g. "1♠", "3NT"
  value: number; // 1 - 35
  player: PlayerPosition;
}

export type SpecialCallType = 'PASS' | 'DBL' | 'RDBL';
export type CallType = ContractBid | SpecialCallType;

export interface AuctionHistoryItem {
  player: PlayerPosition;
  call: string; // "1♠", "PASS", "DBL", "RDBL"
  bidDetails?: ContractBid;
}

export interface FinalContractResult {
  isFinished: boolean;
  contract: ContractBid | null;
  declarer: PlayerPosition | null;
  isDoubled: boolean;
  isRedoubled: boolean;
}

// Order Mata Angin PBN Table: NORTH (0), EAST (1), SOUTH (2), WEST (3)
export const PBN_POSITIONS: PlayerPosition[] = ['north', 'east', 'south', 'west'];

export const SUIT_ORDER_MAP: Record<BidSuit, number> = {
  clubs: 1,
  diamonds: 2,
  hearts: 3,
  spades: 4,
  NT: 5,
};

/**
 * Menghitung bobot nilai unik bid (1 s/d 35)
 */
export function getBidValue(level: number, suit: BidSuit): number {
  return (level - 1) * 5 + SUIT_ORDER_MAP[suit];
}

/**
 * Memeriksa apakah suatu level (1-7) masih memiliki minimal 1 bid yang valid
 */
export function isLevelValid(level: number, lastBid: ContractBid | null): boolean {
  const maxValOnLevel = getBidValue(level, 'NT');
  const lastVal = lastBid ? lastBid.value : 0;
  return maxValOnLevel > lastVal;
}

/**
 * Memeriksa apakah suit tertentu pada level tertentu valid (lebih besar dari lastBid)
 */
export function isSuitValid(level: number, suit: BidSuit, lastBid: ContractBid | null): boolean {
  const thisVal = getBidValue(level, suit);
  const lastVal = lastBid ? lastBid.value : 0;
  return thisVal > lastVal;
}

/**
 * Menghasilkan Matriks Tabel PBN 4 Kolom [NORTH, EAST, SOUTH, WEST]
 * dengan offset pengosongan baris 1 berdasarkan Dealer pertama.
 */
export function buildAuctionMatrix(
  history: AuctionHistoryItem[],
  dealer: PlayerPosition
): string[][] {
  const dealerIdx = PBN_POSITIONS.indexOf(dealer);
  const rows: string[][] = [];
  let currentRow: string[] = Array(4).fill('-');

  // Fill '-' offset for columns before dealer in row 1
  for (let i = 0; i < dealerIdx; i++) {
    currentRow[i] = '-';
  }

  let fillIdx = dealerIdx;

  history.forEach((item) => {
    currentRow[fillIdx] = item.call;
    fillIdx++;

    if (fillIdx === 4) {
      rows.push([...currentRow]);
      currentRow = Array(4).fill('-');
      fillIdx = 0;
    }
  });

  if (fillIdx > 0 || rows.length === 0) {
    rows.push([...currentRow]);
  }

  return rows;
}

/**
 * Mengevaluasi status akhir Auction & Penentuan Declarer
 */
export function evaluateAuctionState(
  history: AuctionHistoryItem[],
  lastContractBid: ContractBid | null
): FinalContractResult {
  if (history.length === 0) {
    return { isFinished: false, contract: null, declarer: null, isDoubled: false, isRedoubled: false };
  }

  // Count streak of PASSes at the end
  let passStreak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].call === 'PASS') {
      passStreak++;
    } else {
      break;
    }
  }

  const isFinished = (lastContractBid && passStreak === 3) || (!lastContractBid && passStreak === 4);

  if (!isFinished) {
    return { isFinished: false, contract: null, declarer: null, isDoubled: false, isRedoubled: false };
  }

  if (!lastContractBid) {
    // Passed Out
    return { isFinished: true, contract: null, declarer: null, isDoubled: false, isRedoubled: false };
  }

  // Determine Declarer (pemain pertama dari tim pemenang yang menawarkan suit/NT tersebut)
  const winningTeam: PlayerPosition[] =
    lastContractBid.player === 'north' || lastContractBid.player === 'south'
      ? ['north', 'south']
      : ['east', 'west'];

  let declarer: PlayerPosition = lastContractBid.player;

  for (const item of history) {
    if (item.bidDetails && winningTeam.includes(item.player) && item.bidDetails.suit === lastContractBid.suit) {
      declarer = item.player;
      break;
    }
  }

  return {
    isFinished: true,
    contract: lastContractBid,
    declarer,
    isDoubled: false,
    isRedoubled: false,
  };
}
