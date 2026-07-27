import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayingCard } from './PlayingCard';
import type { Card } from '../types/card';

interface CardHandProps {
  cards: Card[];
  selectedCardId?: string | null;
  playableCardIds?: string[];
  onSelectCard?: (card: Card) => void;
  className?: string;
}

export const CardHand: React.FC<CardHandProps> = ({
  cards,
  selectedCardId,
  playableCardIds = [],
  onSelectCard,
  className = '',
}) => {
  return (
    <div className={`w-full flex justify-center items-end min-h-[140px] sm:min-h-[180px] overflow-x-auto py-2 ${className}`}>
      <div className="flex justify-center items-end relative">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isSelected = selectedCardId === card.id;
            const isPlayable = playableCardIds.length === 0 || playableCardIds.includes(card.id);
            const cardState = isSelected ? 'selected' : isPlayable ? 'normal' : 'dimmed';

            return (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: isSelected ? -24 : 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.5, y: -100 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                style={{
                  zIndex: index + 10,
                  marginLeft: index === 0 ? 0 : -52, // Penumpukan kartu lebih rapat agar 13 kartu muat tanpa scrollbar
                }}
                className="card-hand-item flex-shrink-0 cursor-pointer"
                onClick={() => onSelectCard && onSelectCard(card)}
              >
                <PlayingCard
                  card={card}
                  state={cardState}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
