import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { BiddingBox } from './BiddingBox';
import { CardHand } from './CardHand';
import { decideBotBid } from '../utils/botEngine';
import type { Call, BidHistoryItem } from '../types/bidding';

export const BiddingPracticeView: React.FC = () => {
  const { currentDeal, bidHistory, addBidCall, startNewDeal } = useGameStore();
  const [feedback, setFeedback] = useState<string | null>(
    'Pilih penawaran (bid) awal kamu berdasarkan jumlah HCP dan distribusi kartu tangan South!'
  );

  const southHand = currentDeal ? currentDeal.hands.south : [];
  const totalHcp = southHand.reduce((acc: number, c) => acc + c.hcp, 0);

  const handleCallSelect = (call: Call) => {
    // Record user bid
    const userBidItem: BidHistoryItem = { player: 'south', call };
    addBidCall(userBidItem);

    // AI Evaluation feedback
    if (call.type === 'bid') {
      const bidName = `${call.bid.level}${call.bid.suit === 'NT' ? 'NT' : call.bid.suit[0].toUpperCase()}`;
      if (totalHcp >= 15 && totalHcp <= 17 && bidName === '1NT') {
        setFeedback(`✅ Bid ${bidName} Sempurna! Sesuai standar SAYC 15-17 HCP balanced.`);
      } else if (totalHcp >= 12 && call.bid.level === 1) {
        setFeedback(`👍 Bid ${bidName} Bagus! Pembukaan standar dengan ${totalHcp} HCP.`);
      } else {
        setFeedback(`💡 Bid ${bidName} dicatat. Evaluasi: Dengan ${totalHcp} HCP, perhatikan syarat HCP pembukaan.`);
      }
    } else {
      setFeedback(`Bid '${call.call}' dicatat. Menunggu balasan bot...`);
    }

    // Trigger West Bot Response
    setTimeout(() => {
      if (currentDeal) {
        const botDecision = decideBotBid(currentDeal.hands.west, [], null, 'west');
        addBidCall({
          player: 'west',
          call: { type: 'special', call: botDecision.call === 'PASS' ? 'PASS' : 'PASS' },
        });
      }
    }, 600);
  };

  return (
    <div className="bg-[#033629] p-4 sm:p-6 rounded-2xl shadow-xl max-w-4xl mx-auto w-full border border-[#055C45] space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-[#044D39] pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-amber-300 flex items-center gap-2">
            <span>🗣️</span> Bidding Practice Arena (SAYC Standard)
          </h2>
          <p className="text-xs text-emerald-200">
            Latih penawaran kartu kamu bersama Bot SAYC dengan masukan langsung.
          </p>
        </div>
        <button
          onClick={() => {
            startNewDeal();
            setFeedback('Deal baru dimulai! Evaluasi kartu tanganmu dan lakukan bid.');
          }}
          className="bg-[#059669] hover:bg-[#047857] text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow transition"
        >
          🔄 Deal Baru
        </button>
      </div>

      {/* RIWAYAT AUCTION MATRIX */}
      <div className="bg-[#02231A] p-3 rounded-xl border border-[#044D39] space-y-1">
        <h3 className="text-xs font-bold text-emerald-300 mb-1">Riwayat Auction (PBN Matrix)</h3>
        <div className="grid grid-cols-4 text-center text-xs font-extrabold text-amber-400 py-1 bg-[#033629] rounded-t-lg">
          <div>NORTH</div><div>EAST</div><div>SOUTH</div><div>WEST</div>
        </div>
        <div className="grid grid-cols-4 text-center text-xs py-2 bg-[#02231A] border border-[#033629] rounded-b-lg gap-y-1 min-h-[60px] max-h-[120px] overflow-y-auto">
          {bidHistory.map((item, idx) => (
            <div key={idx} className="text-emerald-200 font-bold">
              {item.call.type === 'bid'
                ? `${item.call.bid.level}${item.call.bid.suit === 'NT' ? 'NT' : item.call.bid.suit[0].toUpperCase()}`
                : item.call.call}
            </div>
          ))}
        </div>
      </div>

      {/* BIDDING BOX (DI ATAS KARTU TANGAN) */}
      <div className="bg-[#02231A] p-4 rounded-xl border border-[#044D39] space-y-2">
        <div className="text-xs font-extrabold text-amber-300">Pilihan Bidding Box:</div>
        <BiddingBox onMakeCall={handleCallSelect} canDouble={true} canRedouble={true} />
      </div>

      {/* KARTU TANGAN SOUTH (DI BAWAH BIDDING BOX) */}
      <div className="bg-[#02231A] p-4 rounded-xl border border-[#044D39] space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-amber-300">
          <span>Kartu Anda (SOUTH)</span>
          <span className="bg-[#033629] px-2.5 py-1 rounded-full text-emerald-300">
            Total HCP: <strong className="text-amber-400">{totalHcp} Poin</strong>
          </span>
        </div>

        <div className="bg-[#0B231B] p-4 rounded-2xl flex justify-center items-center min-h-[160px] shadow-inner border border-emerald-900">
          <CardHand cards={southHand} />
        </div>

        {feedback && (
          <div className="p-3 bg-[#044D39] rounded-xl text-xs text-emerald-200 font-semibold border border-emerald-500/30 text-center">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};
