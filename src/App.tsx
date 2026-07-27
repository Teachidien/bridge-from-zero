import { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { Navbar } from './components/Navbar';
import { InteractiveLearningView } from './components/InteractiveLearningView';
import { BiddingPracticeView } from './components/BiddingPracticeView';
import { FullGameView } from './components/FullGameView';
import { PuzzleModeView } from './components/PuzzleModeView';
import { getCoachAdvice } from './utils/aiCoachEngine';

export function App() {
  const { activeMode, currentDeal } = useGameStore();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const handleOpenAiCoach = async () => {
    setAiModalOpen(true);
    setAiAdvice('Sedang meminta analisis dari Pelatih AI Gemini...');
    const southHand = currentDeal ? currentDeal.hands.south : [];
    const advice = await getCoachAdvice({
      hand: southHand,
      auctionHistory: [],
      lastBid: null,
      position: 'south',
    });
    setAiAdvice(`${advice.adviceTitle}: ${advice.explanation}`);
  };

  return (
    <div className="bg-[#064E3B] text-slate-100 min-h-screen flex flex-col justify-between p-2 sm:p-4 select-none">
      {/* HEADER & MODE NAVBAR */}
      <Navbar onOpenAiCoach={handleOpenAiCoach} />

      {/* MAIN CONTENT VIEW AREA */}
      <main className="flex-1 max-w-6xl mx-auto w-full my-4 flex flex-col justify-center">
        {activeMode === 'learning' && <InteractiveLearningView />}
        {activeMode === 'bidding' && <BiddingPracticeView />}
        {activeMode === 'fullgame' && <FullGameView />}
        {activeMode === 'puzzle' && <PuzzleModeView />}
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mx-auto text-center py-2 text-xs text-emerald-300/80">
        Bridge From Zero • Integrated 4 Main Game Modes Engine (Spark Plan 100% Free)
      </footer>

      {/* AI COACH DIALOG MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#033629] border border-[#055C45] text-slate-100 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#044D39] pb-3">
              <h3 className="text-base font-extrabold text-amber-300 flex items-center gap-2">
                <span>💡</span> Pelatih AI Bridge
              </h3>
              <button
                onClick={() => setAiModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#02231A] p-4 rounded-xl text-xs sm:text-sm leading-relaxed text-emerald-200 border border-[#044D39]">
              {aiAdvice}
            </div>

            <button
              onClick={() => setAiModalOpen(false)}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold py-2.5 rounded-xl shadow text-xs transition"
            >
              Tutup & Lanjutkan Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
