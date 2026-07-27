import { create } from 'zustand';
import type { Card } from '../types/card';
import type { BidHistoryItem } from '../types/bidding';
import { dealHands } from '../utils/dealer';
import type { DealResult } from '../utils/dealer';
import { getLocalProgress, saveLocalProgress, syncProgressToFirestore } from '../utils/progressSync';
import { auth } from '../lib/firebase';

export type GameMode = 'learning' | 'bidding' | 'fullgame' | 'puzzle';

export interface GameStoreState {
  // Mode & Curriculum State
  activeMode: GameMode;
  learningModule: number;
  learningStep: number;
  completedModules: number[];
  completedPuzzles: number[];

  // Game Table & Deal State
  currentDeal: DealResult | null;
  bidHistory: BidHistoryItem[];
  currentTurn: 'north' | 'south' | 'east' | 'west';
  isAuctionOver: boolean;
  finalContract: string | null;
  declarer: 'north' | 'south' | 'east' | 'west' | null;

  // Trick State
  currentTrickCards: { player: 'north' | 'south' | 'east' | 'west'; card: Card }[];
  tricksWonNS: number;
  tricksWonEW: number;

  // Actions
  setActiveMode: (mode: GameMode) => void;
  setLearningModule: (module: number) => void;
  setLearningStep: (step: number) => void;
  markModuleComplete: (module: number) => void;
  markPuzzleComplete: (puzzleId: number) => void;
  startNewDeal: () => void;
  addBidCall: (item: BidHistoryItem) => void;
  playCard: (player: 'north' | 'south' | 'east' | 'west', card: Card) => void;
  resetGame: () => void;
}

const initialProgress = getLocalProgress();

export const useGameStore = create<GameStoreState>((set, get) => ({
  activeMode: 'learning',
  learningModule: 1,
  learningStep: 1,
  completedModules: initialProgress.completedModules || [1],
  completedPuzzles: initialProgress.completedPuzzles || [],

  currentDeal: dealHands(),
  bidHistory: [],
  currentTurn: 'south',
  isAuctionOver: false,
  finalContract: null,
  declarer: null,

  currentTrickCards: [],
  tricksWonNS: 0,
  tricksWonEW: 0,

  setActiveMode: (mode) => set({ activeMode: mode }),
  setLearningModule: (module) => set({ learningModule: module, learningStep: 1 }),
  setLearningStep: (step) => set({ learningStep: step }),

  markModuleComplete: (modNum) => {
    const state = get();
    if (!state.completedModules.includes(modNum)) {
      const updatedModules = [...state.completedModules, modNum];
      set({ completedModules: updatedModules });
      saveLocalProgress({ completedModules: updatedModules });
      if (auth.currentUser) {
        syncProgressToFirestore(auth.currentUser.uid, { completedModules: updatedModules });
      }
    }
  },

  markPuzzleComplete: (pId) => {
    const state = get();
    if (!state.completedPuzzles.includes(pId)) {
      const updatedPuzzles = [...state.completedPuzzles, pId];
      set({ completedPuzzles: updatedPuzzles });
      saveLocalProgress({ completedPuzzles: updatedPuzzles });
      if (auth.currentUser) {
        syncProgressToFirestore(auth.currentUser.uid, { completedPuzzles: updatedPuzzles });
      }
    }
  },

  startNewDeal: () => {
    const newDeal = dealHands();
    set({
      currentDeal: newDeal,
      bidHistory: [],
      currentTurn: 'south',
      isAuctionOver: false,
      finalContract: null,
      declarer: null,
      currentTrickCards: [],
      tricksWonNS: 0,
      tricksWonEW: 0,
    });
  },

  addBidCall: (item) =>
    set((state) => ({
      bidHistory: [...state.bidHistory, item],
    })),

  playCard: (player, card) =>
    set((state) => {
      const nextTrick = [...state.currentTrickCards, { player, card }];
      return {
        currentTrickCards: nextTrick,
      };
    }),

  resetGame: () => {
    const newDeal = dealHands();
    set({
      currentDeal: newDeal,
      bidHistory: [],
      currentTurn: 'south',
      isAuctionOver: false,
      finalContract: null,
      declarer: null,
      currentTrickCards: [],
      tricksWonNS: 0,
      tricksWonEW: 0,
    });
  },
}));
