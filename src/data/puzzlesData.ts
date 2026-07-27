export interface BridgePuzzle {
  id: string;
  title: string;
  contract: string;
  targetTricks: number;
  description: string;
  northHand: string[];
  southHand: string[];
  correctMove: string;
  hint: string;
  explanation: string;
}

export const PUZZLES: BridgePuzzle[] = [
  {
    id: 'puzzle-1',
    title: 'The Heart Finesse Challenge',
    contract: '4♥ by South',
    targetTricks: 2,
    description: 'East memegang King of Hearts (K♥). Kamu memegang Ace (A♥) dan Jack (J♥) di South, serta Queen (Q♥) di North (Dummy). Mainkan kartu agar bisa jebak K♥ milik East!',
    northHand: ['Q♥', '5♥'],
    southHand: ['A♥', 'J♥'],
    correctMove: '5♥',
    hint: 'Lead (mainkan pertama) kartu kecil dari South ke arah Queen di North!',
    explanation: 'Dengan memimpin 5♥ dari South, jika East memainkan K♥, kamu bisa memakan dengan A♥. Jika East memainkan kartu kecil, kamu bisa memainkan Q♥ dari North dan menang!'
  },
  {
    id: 'puzzle-2',
    title: 'Ruffing in Dummy',
    contract: '3♠ by South',
    targetTricks: 1,
    description: 'South tidak memiliki Diamond (♦) lagi. North memiliki truf Spade (♠). Bagaimana cara mengamankan trick tambahan?',
    northHand: ['4♠', '2♠'],
    southHand: ['A♦', '7♦'],
    correctMove: '7♦',
    hint: 'Mainkan Diamond dari South dan potongan (ruff) menggunakan Spade di North!',
    explanation: 'Memotong warna mati lawan dengan truf di Dummy adalah cara tercepat menambah jumlah trick.'
  }
];
