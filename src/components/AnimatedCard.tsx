import React from 'react';
import { motion } from 'framer-motion';
import { PlayingCard } from './PlayingCard';
import type { Card, CardState } from '../types/card';

interface AnimatedCardProps {
  card: Card;
  state?: CardState;
  onClick?: () => void;
  isFaceDown?: boolean;
  layoutId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  card,
  state = 'normal',
  onClick,
  isFaceDown = false,
  layoutId,
  className = '',
  style = {},
}) => {
  return (
    <motion.div
      layoutId={layoutId || card.id}
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={style}
      className={`inline-block ${className}`}
    >
      <PlayingCard
        card={card}
        state={state}
        onClick={onClick}
        isFaceDown={isFaceDown}
      />
    </motion.div>
  );
};
