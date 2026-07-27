import React, { useState } from 'react';
import { dealHands } from '../utils/dealer';
import { buildAuctionMatrix } from '../utils/biddingEngine';
import type { AuctionHistoryItem } from '../utils/biddingEngine';
import { decideBotBid } from '../utils/botEngine';
import { getCoachAdvice } from '../utils/aiCoachEngine';
import { copyPBNToClipboard } from '../utils/pbnExporter';
import type { Card } from '../types/card';

export type DummyPosition = 'north' | 'south' | 'east' | 'west' | null;

export const GameTable: React.FC = () => {
  const [deal, setDeal] = useState(() => dealHands());
  const [history, setHistory] = useState<AuctionHistoryItem[]>([
    { player: 'west', call: '1♠' },
    { player: 'north', call: 'PASS' },
    { player: 'east', call: 'PASS' },
  ]);
  const [selectedLevel, setSelectedLevel] = useState<number>(2);
  const [dummyPos, setDummyPos] = useState<DummyPosition>(null);
  const [coachModal, setCoachModal] = useState<{ open: boolean; title: string; move: string; desc: string }>({
    open: false,
    title: '',
    move: '',
    desc: '',
  });

  const pbnMatrix = buildAuctionMatrix(history, 'west');
  const southHand = deal.hands.south;

  const handleRedeal = () => {
    const newDeal = dealHands();
    setDeal(newDeal);
    setHistory([]);
  };

  const handleUserBid = (bidCall: string) => {
    const newHist: AuctionHistoryItem[] = [...history, { player: 'south', call: bidCall }];
    setHistory(newHist);

    setTimeout(() => {
      const botDecision = decideBotBid(deal.hands.west, newHist, null, 'west');
      setHistory((prev) => [...prev, { player: 'west', call: botDecision.call }]);
    }, 600);
  };

  const handleAskCoach = async () => {
    const advice = await getCoachAdvice({
      hand: southHand,
      auctionHistory: history,
      lastBid: null,
      position: 'south',
    });

    setCoachModal({
      open: true,
      title: advice.adviceTitle,
      move: advice.recommendedMove,
      desc: advice.explanation,
    });
  };

  const suitSymbols: Record<string, string> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
  const suitHexColors: Record<string, string> = { spades: '#1E293B', hearts: '#E11D48', diamonds: '#D97706', clubs: '#059669' };

  // HELPER UNTUK RENDERING HORIZONTAL HAND (NORTH / SOUTH DUMMY)
  const renderHorizontalHand = (cards: Card[], label: string, isDummy: boolean) => (
    <div className="flex flex-col items-center space-y-1 w-full">
      <div className="text-xs font-bold text-amber-300 bg-[#033629] px-3.5 py-1 rounded-full flex items-center gap-2 shadow-sm">
        <span>{label}</span>
        {isDummy && <span className="text-[10px] bg-[#02231A] text-emerald-300 px-2 py-0.5 rounded-md">📖 DUMMY</span>}
      </div>
      <div className="w-full flex justify-center items-center overflow-x-auto min-h-[110px] sm:min-h-[170px]">
        <div className="flex justify-center items-end w-full pt-3 pb-2">
          {cards.map((card, idx) => {
            const color = suitHexColors[card.suit];
            const isHigh = card.value >= 11;
            return (
              <div
                key={card.id}
                style={{ zIndex: 10 + idx, marginLeft: idx === 0 ? '0' : '-54px' }}
                className="w-16 h-24 sm:w-28 sm:h-40 bg-white rounded-lg sm:rounded-xl shadow-md border border-slate-300 flex flex-col justify-between p-1 sm:p-2.5 flex-shrink-0 transition-transform hover:-translate-y-5 cursor-pointer"
              >
                <div className="font-extrabold text-[11px] sm:text-base leading-none" style={{ color }}>
                  {card.rank}<br />{suitSymbols[card.suit]}
                </div>
                <div className={`${isHigh ? 'text-sm sm:text-3xl' : 'text-xs sm:text-xl'} text-center font-bold`} style={{ color }}>
                  {isHigh ? suitSymbols[card.suit] : card.rank}
                </div>
                <div className="font-extrabold text-[11px] sm:text-base leading-none text-right" style={{ color }}>
                  {suitSymbols[card.suit]}<br />{card.rank}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // HELPER UNTUK RENDERING WEST / EAST DUMMY (SIDE MATRIX REVERSED ON EAST!)
  const renderSideDummy = (cards: Card[], isRightAligned: boolean) => {
    const grouped: Record<string, Card[]> = { spades: [], hearts: [], diamonds: [], clubs: [] };
    cards.forEach((c) => grouped[c.suit].push(c));

    return (
      <div className={`flex flex-col gap-1 bg-[#02231A] p-2.5 rounded-2xl shadow-lg ${isRightAligned ? 'items-end' : 'items-start'}`}>
        {['spades', 'hearts', 'diamonds', 'clubs'].map((suit) => {
          let suitCards = [...grouped[suit]];
          if (suitCards.length === 0) return null;

          // JIKA EAST (KANAN): DIBALIK AGAR KARTU KECIL DI KIRI & AS DI KANAN!
          if (isRightAligned) {
            suitCards.reverse();
          }

          return (
            <div key={suit} className={`flex w-full ${isRightAligned ? 'justify-end' : 'justify-start'}`}>
              {suitCards.map((c, idx) => (
                <div
                  key={c.id}
                  style={{ zIndex: 10 + idx, marginLeft: idx === 0 ? '0' : isRightAligned ? '-30px' : '-30px' }}
                  className="w-11 h-16 sm:w-14 sm:h-20 bg-white rounded-lg shadow-md border border-slate-300 flex flex-col justify-between p-1 flex-shrink-0 transition-transform hover:-translate-y-2 cursor-pointer"
                >
                  <span className="text-xs sm:text-base leading-none font-extrabold" style={{ color: suitHexColors[c.suit] }}>
                    {c.rank}
                  </span>
                  <span className="text-center text-sm sm:text-xl font-extrabold" style={{ color: suitHexColors[c.suit] }}>
                    {suitSymbols[c.suit]}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-[#064E3B] text-slate-100 min-h-screen flex flex-col justify-between p-2 sm:p-4 select-none overflow-hidden font-sans">
      {/* HEADER BAR CLEAN */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center bg-[#033629] rounded-2xl px-4 py-2.5 shadow-md text-xs">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span className="font-extrabold text-amber-300 tracking-wider">BRIDGE ARENA</span>
          <span className="text-emerald-100">| Dealer: <strong className="text-white">WEST</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          {/* SIMULATOR SELECTOR DUMMY POSITION */}
          <select
            value={dummyPos || ''}
            onChange={(e) => setDummyPos((e.target.value as DummyPosition) || null)}
            className="bg-[#02231A] text-amber-300 font-extrabold text-[11px] px-2.5 py-1 rounded-xl border border-[#044D39]"
          >
            <option value="">Simulasi Dummy: (Bidding Phase)</option>
            <option value="north">North is Dummy</option>
            <option value="south">South is Dummy</option>
            <option value="east">East is Dummy (Rata Kanan)</option>
            <option value="west">West is Dummy (Rata Kiri)</option>
          </select>

          <button onClick={() => { copyPBNToClipboard(deal, history); alert('PBN berhasil disalin ke clipboard!'); }} className="bg-[#044D39] hover:bg-[#06634A] text-emerald-200 font-extrabold px-3 py-1.5 rounded-xl shadow transition text-[11px]">
            📋 Salin PBN
          </button>
          <button onClick={handleAskCoach} className="bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold px-3.5 py-1.5 rounded-xl shadow transition text-[11px] flex items-center gap-1.5">
            <span>💡</span>
            <span>Tanya Pelatih AI</span>
          </button>
          <button onClick={handleRedeal} className="bg-[#059669] hover:bg-[#047857] text-white font-extrabold px-3.5 py-1.5 rounded-xl shadow transition text-[11px]">
            🔄 Deal Baru
          </button>
        </div>
      </header>

      {/* MID GAME AREA */}
      <main className="flex-1 max-w-5xl mx-auto w-full grid grid-rows-[auto_1fr_auto] my-2 gap-2 relative">
        {/* NORTH AREA */}
        <div className="flex flex-col items-center space-y-1">
          {dummyPos === 'north' ? (
            renderHorizontalHand(deal.hands.north, '👤 PARTNER (NORTH)', true)
          ) : (
            <div className="bg-[#033629] px-3.5 py-1 rounded-full text-[11px] font-bold text-emerald-100 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              NORTH (Partner Bot)
            </div>
          )}
        </div>

        {/* CENTER TABLE & SIDE PLAYERS */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 w-full min-h-[280px] sm:min-h-[340px]">
          {/* WEST AREA */}
          <div className="flex flex-col items-start space-y-1">
            {dummyPos === 'west' ? (
              renderSideDummy(deal.hands.west, false)
            ) : (
              <div className="bg-[#033629] px-3.5 py-1 rounded-full text-[11px] font-bold text-emerald-100 shadow-sm">WEST</div>
            )}
          </div>

          {/* CENTER TABLE & PBN MATRIX */}
          <div className="bg-[#033629] rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-4 shadow-xl relative w-full h-full">
            {/* PBN MATRIX */}
            <div className="w-full max-w-md bg-[#02231A] rounded-2xl p-3 shadow-inner">
              <div className="grid grid-cols-4 text-center font-extrabold text-[11px] border-b border-[#044D39] pb-1 text-amber-300">
                <div>NORTH</div><div>EAST</div><div>SOUTH</div><div>WEST</div>
              </div>
              <div className="text-[11px] font-mono divide-y divide-[#044D39]/50 text-slate-200">
                {pbnMatrix.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 text-center py-1">
                    {row.map((cell, cIdx) => (
                      <span key={cIdx} className={cell !== '-' && cell !== 'PASS' ? 'text-amber-300 font-extrabold' : 'text-emerald-200'}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* BIDDING BOX */}
            <div className="w-full max-w-md bg-[#022B20] rounded-2xl p-3 flex flex-col space-y-2.5 shadow-lg">
              <span className="text-[10px] font-extrabold text-emerald-300 text-center uppercase tracking-wider">Bidding Box Anda:</span>
              <div className="flex justify-between gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`flex-1 font-extrabold text-xs py-1.5 rounded-lg text-center transition ${
                      selectedLevel === lvl ? 'bg-[#059669] text-white ring-2 ring-amber-300' : 'bg-[#02231A] text-slate-200 shadow-sm'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <div className="flex justify-between gap-1">
                {['clubs', 'diamonds', 'hearts', 'spades', 'NT'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUserBid(`${selectedLevel}${st === 'NT' ? 'NT' : suitSymbols[st]}`)}
                    className="flex-1 bg-white hover:bg-slate-100 font-extrabold text-xs py-1.5 rounded-lg border border-slate-300 shadow text-slate-900"
                  >
                    {st === 'NT' ? 'NT' : suitSymbols[st]}
                  </button>
                ))}
              </div>
              <div className="flex justify-between gap-2 pt-1">
                <button onClick={() => handleUserBid('PASS')} className="flex-1 bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs py-2 rounded-xl shadow-sm">
                  PASS
                </button>
              </div>
            </div>
          </div>

          {/* EAST AREA */}
          <div className="flex flex-col items-end justify-self-end space-y-1">
            {dummyPos === 'east' ? (
              renderSideDummy(deal.hands.east, true)
            ) : (
              <div className="bg-[#033629] px-3.5 py-1 rounded-full text-[11px] font-bold text-emerald-100 shadow-sm">EAST</div>
            )}
          </div>
        </div>

        {/* SOUTH AREA */}
        <div className="flex flex-col items-center space-y-1 w-full">
          {dummyPos === 'south' ? (
            renderHorizontalHand(southHand, '👤 KARTU ANDA (SOUTH)', true)
          ) : (
            renderHorizontalHand(southHand, '👤 KARTU ANDA (SOUTH)', false)
          )}
        </div>
      </main>

      {/* COACH ADVICE MODAL */}
      {coachModal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#033629] border border-[#055C45] text-slate-100 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#044D39] pb-3">
              <h3 className="text-base font-extrabold text-amber-300 flex items-center gap-2">
                <span>💡</span> {coachModal.title}
              </h3>
              <button
                onClick={() => setCoachModal((prev) => ({ ...prev, open: false }))}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>
            <div className="bg-[#02231A] p-4 rounded-xl text-xs sm:text-sm text-emerald-200 border border-[#044D39] space-y-2">
              <p className="font-bold text-amber-400">Rekomendasi Langkah: {coachModal.move}</p>
              <p>{coachModal.desc}</p>
            </div>
            <button
              onClick={() => setCoachModal((prev) => ({ ...prev, open: false }))}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold py-2.5 rounded-xl text-xs transition"
            >
              Tutup & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

