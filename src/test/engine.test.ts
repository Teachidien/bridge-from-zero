import { describe, it, expect } from 'vitest';
import { dealHands, evaluateHand } from '../utils/dealer';
import { getBidValue, isSuitValid, buildAuctionMatrix } from '../utils/biddingEngine';
import { evaluateTrickWinner, isCardPlayValid } from '../utils/trickTakingEngine';
import { calculateBridgeScore } from '../utils/scoringEngine';
import { decideBotBid } from '../utils/botEngine';
import type { Card, Rank } from '../types/card';
import type { ContractBid, AuctionHistoryItem } from '../utils/biddingEngine';

describe('Bridge Core Game Engine Automated Unit Tests', () => {

  // 1. TESTING DEALER ENGINE (STEP 4.1)
  describe('Step 4.1: Dealer & Hand Evaluator Engine', () => {
    it('harus membagikan pas 13 kartu ke 4 pemain tanpa duplikasi (Total 52 Kartu)', () => {
      const deal = dealHands();
      expect(deal.hands.north).toHaveLength(13);
      expect(deal.hands.south).toHaveLength(13);
      expect(deal.hands.east).toHaveLength(13);
      expect(deal.hands.west).toHaveLength(13);

      const allIds = [
        ...deal.hands.north.map(c => c.id),
        ...deal.hands.south.map(c => c.id),
        ...deal.hands.east.map(c => c.id),
        ...deal.hands.west.map(c => c.id),
      ];
      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(52);
    });

    it('harus menghitung poin HCP dengan akurat (A=4, K=3, Q=2, J=1)', () => {
      const hand: Card[] = [
        { id: '1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
        { id: '2', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
        { id: '3', suit: 'hearts', rank: 'Q', value: 12, hcp: 2 },
        { id: '4', suit: 'diamonds', rank: 'J', value: 11, hcp: 1 },
        { id: '5', suit: 'clubs', rank: '10', value: 10, hcp: 0 },
      ];
      const evalResult = evaluateHand(hand);
      expect(evalResult.hcp).toBe(10);
    });
  });

  // 2. TESTING BIDDING ENGINE (STEP 4.2)
  describe('Step 4.2: Bidding & PBN Matrix Engine', () => {
    it('harus memvalidasi hierarki bid dengan benar (1♣ < 1♦ < 1♥ < 1♠ < 1NT < 2♣)', () => {
      expect(getBidValue(1, 'clubs')).toBe(1);
      expect(getBidValue(1, 'spades')).toBe(4);
      expect(getBidValue(1, 'NT')).toBe(5);
      expect(getBidValue(2, 'clubs')).toBe(6);

      const lastBid: ContractBid = { level: 1, suit: 'spades', suitOrder: 4, code: '1♠', value: 4, player: 'south' };
      
      // Pada level 1 setelah 1♠, hanya NT yang valid (1♣, 1♦, 1♥, 1♠ tidak valid)
      expect(isSuitValid(1, 'clubs', lastBid)).toBe(false);
      expect(isSuitValid(1, 'spades', lastBid)).toBe(false);
      expect(isSuitValid(1, 'NT', lastBid)).toBe(true);
      expect(isSuitValid(2, 'clubs', lastBid)).toBe(true);
    });

    it('harus membangun Matriks PBN 4 Kolom (NORTH, EAST, SOUTH, WEST) dengan Dealer Offset', () => {
      const history: AuctionHistoryItem[] = [
        { player: 'west', call: '1♠' },
        { player: 'north', call: 'PASS' },
        { player: 'east', call: 'PASS' },
        { player: 'south', call: 'PASS' },
      ];
      const matrix = buildAuctionMatrix(history, 'west');
      // Baris 1: [- , - , - , 1♠]
      expect(matrix[0]).toEqual(['-', '-', '-', '1♠']);
      // Baris 2: [PASS, PASS, PASS, -]
      expect(matrix[1]).toEqual(['PASS', 'PASS', 'PASS', '-']);
    });
  });

  // 3. TESTING TRICK-TAKING ENGINE (STEP 4.3)
  describe('Step 4.3: Trick-Taking & Trump Ruffing Engine', () => {
    it('harus memvalidasi Mandatory Follow Suit', () => {
      const playerHand: Card[] = [
        { id: '1', suit: 'hearts', rank: 'A', value: 14, hcp: 4 },
        { id: '2', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
      ];
      
      // Jika Led Suit = Hearts, wajib main Hearts jika punya
      const isHeartValid = isCardPlayValid(playerHand[0], playerHand, 'hearts');
      const isSpadeValid = isCardPlayValid(playerHand[1], playerHand, 'hearts');

      expect(isHeartValid).toBe(true);
      expect(isSpadeValid).toBe(false);
    });

    it('harus mengevaluasi Kemenangan Trump Ruffing (2♠ memotong A♥)', () => {
      const playedCards = [
        { player: 'west' as const, card: { id: 'w1', suit: 'hearts' as const, rank: 'K' as Rank, value: 13, hcp: 3 } },
        { player: 'north' as const, card: { id: 'n1', suit: 'hearts' as const, rank: 'Q' as Rank, value: 12, hcp: 2 } },
        { player: 'east' as const, card: { id: 'e1', suit: 'hearts' as const, rank: 'A' as Rank, value: 14, hcp: 4 } },
        { player: 'south' as const, card: { id: 's1', suit: 'spades' as const, rank: '2' as Rank, value: 2, hcp: 0 } }, // Trump 2♠!
      ];

      const winner = evaluateTrickWinner(playedCards, 'spades');
      expect(winner).toBe('south'); // South's 2♠ Trump Ruffing wins over A♥!
    });
  });

  // 4. TESTING SCORING ENGINE (STEP 4.4)
  describe('Step 4.4: Official Bridge Scoring Engine', () => {
    it('harus menghitung skor 1NT +2 (9 Trick) = 150 Poin', () => {
      const res = calculateBridgeScore(1, 'NT', 9, false);
      expect(res.totalScore).toBe(150);
      expect(res.contractScore).toBe(40);
      expect(res.partScoreBonus).toBe(50);
      expect(res.overtrickScore).toBe(60);
    });

    it('harus menghitung skor 3NT Pas (9 Trick NV) = 400 Poin', () => {
      const res = calculateBridgeScore(3, 'NT', 9, false);
      expect(res.totalScore).toBe(400); // 100 contract + 300 Game Bonus
    });

    it('harus menghitung skor 4♠ Pas (10 Trick V) = 620 Poin', () => {
      const res = calculateBridgeScore(4, 'spades', 10, true);
      expect(res.totalScore).toBe(620); // 120 contract + 500 Vul Game Bonus
    });

    it('harus menghitung penalti undertrick jika gagal target', () => {
      const res = calculateBridgeScore(3, 'NT', 8, false); // Target 9, dapat 8 (-1 Undertrick)
      expect(res.isMake).toBe(false);
      expect(res.totalScore).toBe(-50);
    });
  });

  // 5. TESTING BOT ENGINE SAYC (STEP 5.1)
  describe('Step 5.1: SAYC Bot Engine', () => {
    it('harus menawar 1NT saat memegang 15-17 HCP & bentuk seimbang 5-3-3-2', () => {
      const hand: Card[] = [
        { id: '1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
        { id: '2', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
        { id: '3', suit: 'spades', rank: 'Q', value: 12, hcp: 2 },
        { id: '4', suit: 'spades', rank: '10', value: 10, hcp: 0 },
        { id: '5', suit: 'spades', rank: '2', value: 2, hcp: 0 },
        { id: '6', suit: 'hearts', rank: 'K', value: 13, hcp: 3 },
        { id: '7', suit: 'hearts', rank: '7', value: 7, hcp: 0 },
        { id: '8', suit: 'hearts', rank: '2', value: 2, hcp: 0 },
        { id: '9', suit: 'diamonds', rank: 'Q', value: 12, hcp: 2 },
        { id: '10', suit: 'diamonds', rank: '9', value: 9, hcp: 0 },
        { id: '11', suit: 'diamonds', rank: '4', value: 4, hcp: 0 },
        { id: '12', suit: 'clubs', rank: 'J', value: 11, hcp: 1 },
        { id: '13', suit: 'clubs', rank: '5', value: 5, hcp: 0 },
      ]; // Total 16 HCP, 5-3-3-2 -> 1NT!

      const decision = decideBotBid(hand, [], null, 'west');
      expect(decision.call).toBe('1NT');
    });

    it('harus menawar 2♣ saat memegang 22+ HCP (Strong Open Bid)', () => {
      const hand: Card[] = [
        { id: '1', suit: 'spades', rank: 'A', value: 14, hcp: 4 },
        { id: '2', suit: 'spades', rank: 'K', value: 13, hcp: 3 },
        { id: '3', suit: 'hearts', rank: 'A', value: 14, hcp: 4 },
        { id: '4', suit: 'hearts', rank: 'K', value: 13, hcp: 3 },
        { id: '5', suit: 'diamonds', rank: 'A', value: 14, hcp: 4 },
        { id: '6', suit: 'diamonds', rank: 'K', value: 13, hcp: 3 },
        { id: '7', suit: 'clubs', rank: 'A', value: 14, hcp: 4 },
        { id: '8', suit: 'clubs', rank: '2', value: 2, hcp: 0 },
        { id: '9', suit: 'clubs', rank: '3', value: 3, hcp: 0 },
        { id: '10', suit: 'clubs', rank: '4', value: 4, hcp: 0 },
        { id: '11', suit: 'clubs', rank: '5', value: 5, hcp: 0 },
        { id: '12', suit: 'clubs', rank: '6', value: 6, hcp: 0 },
        { id: '13', suit: 'clubs', rank: '7', value: 7, hcp: 0 },
      ]; // Total 25 HCP -> 2♣!

      const decision = decideBotBid(hand, [], null, 'west');
      expect(decision.call).toBe('2♣');
    });
  });

});
