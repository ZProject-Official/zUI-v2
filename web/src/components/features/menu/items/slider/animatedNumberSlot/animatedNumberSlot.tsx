import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import './animatedNumberSlot.scss'

interface AnimatedNumberSlotProps {
  value: number;
}

export const AnimatedNumberSlot: React.FC<AnimatedNumberSlotProps> = ({ value }) => {
  const [displayedValue, setDisplayedValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== displayedValue) {
      setPrevValue(displayedValue);
      setDisplayedValue(value);
    }
  }, [value]);

  return (
    <div className="slot-wrapper">
      <AnimatePresence initial={false}>
        <motion.div
          key={displayedValue}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="slot-number"
        >
          {displayedValue}%
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
