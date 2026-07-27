import type { Card, Suit } from '../types/card';
import type { PlayerPosition } from './dealer';
import type { ContractBid, AuctionHistoryItem } from './biddingEngine';
import { getBidValue } from './biddingEngine';
import { evaluateHand } from './dealer';
import { isCardPlayValid } from './trickTakingEngine';

export interface BotBidDecision {
  call: string; // "1NT", "2♣", "PASS", "DBL", etc.
  reason: string;
}

/**
 * Logika Bidding Bot Lawan Berdasarkan Aturan Resmi SAYC (Standard American Yellow Cover)
 */
export function decideBotBid(
  botHand: Card[],
  _history: AuctionHistoryItem[],
  lastContractBid: ContractBid | null,
  botPosition: PlayerPosition
): BotBidDecision {
  const evalResult = evaluateHand(botHand);
  const hcp = evalResult.hcp;
  const counts = evalResult.suitCounts;

  const sortedCounts = Object.values(counts).sort((a, b) => b - a);
  const is5332 = sortedCounts[0] === 5 && sortedCounts[1] === 3 && sortedCounts[2] === 3 && sortedCounts[3] === 2;
  const isBalanced = (sortedCounts[0] <= 4 && sortedCounts[3] >= 2) || is5332;

  const minBidVal = lastContractBid ? lastContractBid.value + 1 : 1;

  // JIKA BELUM ADA CONTRACT BID (OPENING BIDDER)
  if (!lastContractBid) {
    // 1. Strong 2C (22+ HCP)
    if (hcp >= 22) {
      return { call: '2♣', reason: `Strong 2♣ Open Bid dengan ${hcp} HCP (22+ HCP).` };
    }

    // 2. Balanced 2NT (20-21 HCP Balanced)
    if (hcp >= 20 && hcp <= 21 && isBalanced) {
      return { call: '2NT', reason: `Balanced 2NT Open Bid dengan ${hcp} HCP.` };
    }

    // 3. Balanced 1NT (15-17 HCP Balanced termasuk 5-3-3-2)
    if (hcp >= 15 && hcp <= 17 && isBalanced) {
      return { call: '1NT', reason: `Balanced 1NT Open Bid dengan ${hcp} HCP.` };
    }

    // 4. Preemptive 3-Level 3♣/3♦/3♥/3♠ (4-9 HCP & 7 Kartu Suit)
    if (hcp >= 4 && hcp <= 9) {
      if (counts.spades >= 7) return { call: '3♠', reason: `Preemptive 3♠ Open Bid dengan 7 kartu Spades (${hcp} HCP).` };
      if (counts.hearts >= 7) return { call: '3♥', reason: `Preemptive 3♥ Open Bid dengan 7 kartu Hearts (${hcp} HCP).` };
      if (counts.diamonds >= 7) return { call: '3♦', reason: `Preemptive 3♦ Open Bid dengan 7 kartu Diamonds (${hcp} HCP).` };
      if (counts.clubs >= 7) return { call: '3♣', reason: `Preemptive 3♣ Open Bid dengan 7 kartu Clubs (${hcp} HCP).` };
    }

    // 5. Weak-Two 2D/2H/2S (7-11 HCP & 6-kartu suit D/H/S)
    if (hcp >= 7 && hcp <= 11) {
      if (counts.spades >= 6) return { call: '2♠', reason: `Weak-Two 2♠ Open Bid dengan 6 kartu Spades (${hcp} HCP).` };
      if (counts.hearts >= 6) return { call: '2♥', reason: `Weak-Two 2♥ Open Bid dengan 6 kartu Hearts (${hcp} HCP).` };
      if (counts.diamonds >= 6) return { call: '2♦', reason: `Weak-Two 2♦ Open Bid dengan 6 kartu Diamonds (${hcp} HCP).` };
    }

    // 5. Normal Major Opening (12-21 HCP & 5+ Major)
    if (hcp >= 12 && hcp <= 21) {
      if (counts.spades >= 5) return { call: '1♠', reason: `Major 1♠ Open Bid dengan ${counts.spades} kartu Spades (${hcp} HCP).` };
      if (counts.hearts >= 5) return { call: '1♥', reason: `Major 1♥ Open Bid dengan ${counts.hearts} kartu Hearts (${hcp} HCP).` };
      if (counts.diamonds >= 4) return { call: '1♦', reason: `Minor 1♦ Open Bid dengan ${counts.diamonds} kartu Diamonds (${hcp} HCP).` };
      return { call: '1♣', reason: `Better Minor 1♣ Open Bid dengan ${hcp} HCP.` };
    }

    return { call: 'PASS', reason: `HCP Kurang dari 12 (${hcp} HCP). Bot PASS.` };
  }

  // JIKA SUDAH ADA CONTRACT BID (RESPON / DUKUNGAN PARTNER / OVERCALL)
  const partnerPosition: Record<PlayerPosition, PlayerPosition> = {
    north: 'south',
    south: 'north',
    east: 'west',
    west: 'east',
  };
  const partnerPos = partnerPosition[botPosition];

  // Cek apakah bid terakhir datang dari Partner
  const isPartnerLastBidder = lastContractBid.player === partnerPos;

  if (isPartnerLastBidder) {
    // Dukung Major Fit Partner (jika partner bid 1♠ dan bot punya 3+ ♠)
    if (lastContractBid.suit === 'spades' && counts.spades >= 3 && hcp >= 6) {
      const raiseVal = getBidValue(lastContractBid.level + 1, 'spades');
      if (raiseVal >= minBidVal) {
        return { call: `${lastContractBid.level + 1}♠`, reason: `Dukungan Fit 8+ Spades dengan Partner (${counts.spades} kartu ♠, ${hcp} HCP).` };
      }
    }
    if (lastContractBid.suit === 'hearts' && counts.hearts >= 3 && hcp >= 6) {
      const raiseVal = getBidValue(lastContractBid.level + 1, 'hearts');
      if (raiseVal >= minBidVal) {
        return { call: `${lastContractBid.level + 1}♥`, reason: `Dukungan Fit 8+ Hearts dengan Partner (${counts.hearts} kartu ♥, ${hcp} HCP).` };
      }
    }
  }

  // Jika tidak ada bid pendukung yang cocok atau poin kurang untuk Overcall -> PASS
  return { call: 'PASS', reason: `Poin atau kriteria pendukung tidak mencukupi. Bot PASS.` };
}

/**
 * Logika Kartu yang Dikeluarkan Bot saat Gameplay (Play of Cards)
 */
export function decideBotPlayCard(
  botHand: Card[],
  ledSuit: Suit | null,
  _trumpSuit: Suit | null,
  _playedCards: { player: PlayerPosition; card: Card }[]
): Card {
  // Filter kartu valid mengikuti aturan Mandatory Follow Suit
  const validCards = botHand.filter((card) => isCardPlayValid(card, botHand, ledSuit));

  if (validCards.length === 0) {
    return botHand[0];
  }

  // Urutkan kartu valid dari terkecil ke terbesar
  validCards.sort((a, b) => a.value - b.value);

  // Jika Lead (kartu pertama), keluarkan kartu suit terpanjang
  if (!ledSuit) {
    return validCards[validCards.length - 1]; // Mainkan kartu tertinggi
  }

  // Jika Follow Suit, mainkan kartu terkecil yang memadai
  return validCards[0];
}
