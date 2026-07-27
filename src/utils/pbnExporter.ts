import type { DealResult } from './dealer';

export const generatePBNString = (deal: DealResult, bidHistory: any[]): string => {
  const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '.');
  
  // Format hand: N:spades.hearts.diamonds.clubs ...
  const formatSuit = (cards: any[], suit: string) =>
    cards
      .filter((c) => c.suit === suit)
      .map((c) => c.rank)
      .join('');

  const formatHand = (cards: any[]) =>
    `${formatSuit(cards, 'spades')}.${formatSuit(cards, 'hearts')}.${formatSuit(cards, 'diamonds')}.${formatSuit(cards, 'clubs')}`;

  const dealPBN = `N:${formatHand(deal.hands.north)} ${formatHand(deal.hands.east)} ${formatHand(deal.hands.south)} ${formatHand(deal.hands.west)}`;

  const auctionPBN = bidHistory
    .map((item) => {
      if (typeof item.call === 'string') return item.call;
      if (item.call.type === 'bid') return `${item.call.bid.level}${item.call.bid.suit === 'NT' ? 'NT' : item.call.bid.suit[0].toUpperCase()}`;
      return item.call.call;
    })
    .join(' ');

  return `[Event "Bridge From Zero Practice"]
[Site "Bridge From Zero Web App"]
[Date "${dateStr}"]
[West "Bot West"]
[North "Bot North"]
[East "Bot East"]
[South "Player South"]
[Dealer "West"]
[Vulnerable "None"]
[Deal "${dealPBN}"]
[Auction "West"]
${auctionPBN}
*`;
};

export const copyPBNToClipboard = async (deal: DealResult, bidHistory: any[]): Promise<boolean> => {
  try {
    const pbnText = generatePBNString(deal, bidHistory);
    await navigator.clipboard.writeText(pbnText);
    return true;
  } catch (err) {
    console.error('Failed copying PBN:', err);
    return false;
  }
};

export const generateShareDealLink = (deal: DealResult): string => {
  try {
    const jsonStr = JSON.stringify({
      n: deal.hands.north.map((c) => c.id),
      s: deal.hands.south.map((c) => c.id),
      e: deal.hands.east.map((c) => c.id),
      w: deal.hands.west.map((c) => c.id),
    });
    const encoded = btoa(jsonStr);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bridgefromzero-e2581.web.app';
    return `${origin}/?deal=${encoded}`;
  } catch (err) {
    console.error('Failed generating deal link:', err);
    return '';
  }
};
