import React from 'react';
import { GameTable } from './GameTable';

export const FullGameView: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-3">
      <div className="bg-[#033629] p-3 sm:p-4 rounded-2xl shadow-lg border border-[#055C45] flex justify-between items-center text-xs">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-amber-300 text-sm">🃏 Full Game vs Bot Simulator</span>
          <span className="bg-[#02231A] text-emerald-300 px-2.5 py-1 rounded-full font-bold">13 Trick Full Rules</span>
        </div>
        <span className="text-emerald-200">SAYC Auction + Official Scoring</span>
      </div>

      <div className="bg-[#064E3B] p-2 sm:p-4 rounded-3xl shadow-2xl border border-[#044D39]">
        <GameTable />
      </div>
    </div>
  );
};
