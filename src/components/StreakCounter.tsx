import React from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';

const StreakCounter: React.FC = () => {
  const { currentStreak, longestStreak } = useMood();

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <motion.div 
        className="card bg-primary-50 border border-primary-100"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-sm font-medium text-primary-700 mb-1">Current Streak</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-semibold text-primary-600">{currentStreak}</span>
          <span className="ml-1 text-primary-500 text-sm">days</span>
        </div>
      </motion.div>

      <motion.div 
        className="card bg-secondary-50 border border-secondary-100"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-sm font-medium text-secondary-700 mb-1">Longest Streak</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-semibold text-secondary-600">{longestStreak}</span>
          <span className="ml-1 text-secondary-500 text-sm">days</span>
        </div>
      </motion.div>
    </div>
  );
};

export default StreakCounter;