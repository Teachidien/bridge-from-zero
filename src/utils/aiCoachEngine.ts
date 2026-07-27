import type { Card } from '../types/card';
import type { PlayerPosition } from './dealer';
import type { ContractBid } from './biddingEngine';

export interface CoachAdviceRequest {
  hand: Card[];
  auctionHistory: { player: PlayerPosition; call: string }[];
  lastBid: ContractBid | null;
  position: PlayerPosition;
  userQuestion?: string;
}

export interface CoachAdviceResponse {
  adviceTitle: string;
  recommendedMove: string;
  explanation: string;
  isAiGenerated: boolean;
}

const STORAGE_KEY_GEMINI = 'bridge_gemini_api_key';

/**
 * Menyimpan / Mengambil Gemini API Key pengguna dari LocalStorage (BYOK)
 */
export function getSavedApiKey(): string {
  return localStorage.getItem(STORAGE_KEY_GEMINI) || '';
}

export function saveApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
}

/**
 * Pelatih AI Gemini API Free Tier + Support BYOK + Fallback Engine Lokal
 */
export async function getCoachAdvice(req: CoachAdviceRequest): Promise<CoachAdviceResponse> {
  const userApiKey = getSavedApiKey();

  // JIKA PENGGUNA MENYEDIAKAN API KEY (BYOK / GEMINI API FREE TIER)
  if (userApiKey) {
    try {
      const promptText = `
Anda adalah Pelatih Bridge Profesional World Bridge Federation (WBF) yang ramah dan suportif untuk aplikasi "Bridge From Zero".
Tugas Anda: Berikan masukan naratif pendek, mendidik, dan jelas dalam Bahasa Indonesia untuk posisi ${req.position.toUpperCase()}.

Konteks Kartu di Tangan: ${req.hand.map((c) => c.rank + c.suit.charAt(0).toUpperCase()).join(', ')}
Riwayat Bidding: ${req.auctionHistory.map((h) => `${h.player}: ${h.call}`).join(' -> ') || 'Belum Ada'}
Pertanyaan Khusus: ${req.userQuestion || 'Mengapa langkah atau bid ini yang disarankan?'}

Berikan respons dalam format JSON persis seperti berikut (tanpa markdown tambahan):
{
  "adviceTitle": "Judul Saran Pendek",
  "recommendedMove": "Langkah Disarankan (misal 1NT / 1♠ / Pass)",
  "explanation": "Penjelasan naratif ringkas 2-3 kalimat mengapa langkah ini paling tepat sesuai aturan SAYC."
}
      `;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${userApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = responseText.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return {
          adviceTitle: parsed.adviceTitle || 'Saran Pelatih AI',
          recommendedMove: parsed.recommendedMove || 'Pass',
          explanation: parsed.explanation || 'Analisis dari Pelatih AI Gemini.',
          isAiGenerated: true,
        };
      }
    } catch (e) {
      console.warn('Gagal memanggil Gemini API, menggunakan Fallback Engine Lokal:', e);
    }
  }

  // FALLBACK ENGINE LOKAL (OFFLINE & ANONYMOUS GUARD)
  const totalHcp = req.hand.reduce((acc, c) => acc + c.hcp, 0);

  if (totalHcp >= 15 && totalHcp <= 17) {
    return {
      adviceTitle: '💡 Saran Pelatih (Balanced Hand)',
      recommendedMove: '1NT',
      explanation: `Kartu Anda memiliki ${totalHcp} HCP dengan susunan seimbang. Menurut aturan SAYC, 1NT adalah pembukaan paling ideal untuk menggambarkan poin 15-17.`,
      isAiGenerated: false,
    };
  } else if (totalHcp >= 12) {
    return {
      adviceTitle: '💡 Saran Pelatih (Opening Hand)',
      recommendedMove: '1♠ / 1♥ / 1♦ / 1♣',
      explanation: `Anda memiliki ${totalHcp} HCP (minimal 12 HCP untuk pembukaan). Buka dengan suit terpanjang Anda (minimal 5 kartu Major atau 3+ Minor).`,
      isAiGenerated: false,
    };
  }

  return {
    adviceTitle: '💡 Saran Pelatih (Pass / Weak)',
    recommendedMove: 'PASS',
    explanation: `Kartu Anda memiliki ${totalHcp} HCP (di bawah 12 HCP) tanpa pegangan 6 kartu untuk Weak-Two. Langkah paling aman adalah PASS.`,
    isAiGenerated: false,
  };
}
