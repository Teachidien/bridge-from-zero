import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Module1Lesson } from './Module1Lesson';
import { Module2Lesson } from './Module2Lesson';
import { Module3Lesson } from './Module3Lesson';
import { Module4Level2Lesson } from './Module4Level2Lesson';

export const InteractiveLearningView: React.FC = () => {
  const { learningModule, setLearningModule } = useGameStore();

  return (
    <div className="space-y-4 max-w-5xl mx-auto w-full">
      {/* Module Selector Sub-header */}
      <div className="bg-[#033629] p-3 sm:p-4 rounded-2xl shadow-lg border border-[#055C45] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Kurikulum Bridge (Tingkat 1 & Tingkat 2)</span>
          <h2 className="text-base sm:text-lg font-extrabold text-white">Interactive Learning Arena</h2>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            onClick={() => setLearningModule(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              learningModule === 1
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#02231A] text-emerald-200 hover:bg-[#044D39]'
            }`}
          >
            Modul 1: Kartu & Simbol
          </button>
          <button
            onClick={() => setLearningModule(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              learningModule === 2
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#02231A] text-emerald-200 hover:bg-[#044D39]'
            }`}
          >
            Modul 2: Fit & Match
          </button>
          <button
            onClick={() => setLearningModule(3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              learningModule === 3
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#02231A] text-emerald-200 hover:bg-[#044D39]'
            }`}
          >
            Modul 3: Poin HCP
          </button>
          <button
            onClick={() => setLearningModule(4)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              learningModule === 4
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#02231A] text-emerald-200 hover:bg-[#044D39]'
            }`}
          >
            Tingkat 2: Play & Defense
          </button>
        </div>
      </div>

      {/* Render selected lesson */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
        {learningModule === 1 && <Module1Lesson />}
        {learningModule === 2 && <Module2Lesson />}
        {learningModule === 3 && <Module3Lesson />}
        {learningModule === 4 && <Module4Level2Lesson />}
      </div>
    </div>
  );
};
