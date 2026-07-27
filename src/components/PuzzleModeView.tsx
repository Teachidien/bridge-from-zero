import React, { useState } from 'react';
import { PUZZLES } from '../data/puzzlesData';
import type { BridgePuzzle } from '../data/puzzlesData';

export const PuzzleModeView: React.FC = () => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentPuzzle: BridgePuzzle = PUZZLES[puzzleIndex];

  const handleCardPlay = (card: string) => {
    if (card === currentPuzzle.correctMove) {
      setFeedback(`🎉 BENAR! ${currentPuzzle.explanation}`);
    } else {
      setFeedback(`❌ Belum tepat. Tip: ${currentPuzzle.hint}`);
    }
  };

  return (
    <div className="bg-[#033629] p-4 sm:p-6 rounded-2xl shadow-xl max-w-4xl mx-auto w-full border border-[#055C45] space-y-4">
      <div className="flex justify-between items-center border-b border-[#044D39] pb-3">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🧩 Bridge Puzzle #{puzzleIndex + 1}</span>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">{currentPuzzle.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#D97706] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
            Kontrak: {currentPuzzle.contract}
          </span>
        </div>
      </div>

      <div className="bg-[#02231A] p-5 rounded-xl space-y-4 border border-[#044D39]">
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{currentPuzzle.description}</p>

        <div className="grid grid-cols-2 gap-4 bg-[#033629] p-4 rounded-xl border border-[#044D39]">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-300 block">North (Dummy)</span>
            <div className="flex justify-center gap-2">
              {currentPuzzle.northHand.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleCardPlay(c)}
                  className="w-12 h-16 bg-white text-rose-600 font-extrabold rounded-lg shadow-md hover:scale-110 transition flex items-center justify-center text-sm border border-slate-300"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-300 block">South (Anda)</span>
            <div className="flex justify-center gap-2">
              {currentPuzzle.southHand.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleCardPlay(c)}
                  className="w-12 h-16 bg-white text-rose-600 font-extrabold rounded-lg shadow-md hover:scale-110 transition flex items-center justify-center text-sm border border-slate-300"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs text-center font-bold border ${
              feedback.startsWith('🎉')
                ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200'
                : 'bg-amber-900/80 border-amber-400 text-amber-200'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          disabled={puzzleIndex === 0}
          onClick={() => {
            setPuzzleIndex(puzzleIndex - 1);
            setFeedback(null);
          }}
          className="bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-xs shadow"
        >
          ⬅️ Puzzle Sebelumnya
        </button>

        <button
          disabled={puzzleIndex === PUZZLES.length - 1}
          onClick={() => {
            setPuzzleIndex(puzzleIndex + 1);
            setFeedback(null);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-xs shadow"
        >
          Puzzle Selanjutnya ➡️
        </button>
      </div>
    </div>
  );
};
