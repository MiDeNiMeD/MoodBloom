import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { MoodEntry } from '../types';

type MoodEntryCardProps = {
  entry: MoodEntry;
  onDelete?: () => void;
};

const MoodEntryCard: React.FC<MoodEntryCardProps> = ({ entry, onDelete }) => {
  const getMoodEmoji = (value: number) => {
    switch (value) {
      case 1: return '😔';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '😊';
      default: return '😐';
    }
  };
  
  const getMoodColor = (value: number) => {
    switch (value) {
      case 1: return 'bg-blue-400';
      case 2: return 'bg-blue-300';
      case 3: return 'bg-yellow-300';
      case 4: return 'bg-green-300';
      case 5: return 'bg-green-400';
      default: return 'bg-yellow-300';
    }
  };

  const getMoodText = (value: number) => {
    switch (value) {
      case 1: return 'Sad';
      case 2: return 'Meh';
      case 3: return 'Neutral';
      case 4: return 'Good';
      case 5: return 'Happy';
      default: return 'Neutral';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mb-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getMoodColor(entry.value)}`}>
              <span className="text-xl">{getMoodEmoji(entry.value)}</span>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">{getMoodText(entry.value)}</h3>
              <p className="text-sm text-neutral-500">
                {format(new Date(entry.date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          
          {entry.note && (
            <p className="text-neutral-700 bg-neutral-50 p-3 rounded-md text-sm mt-2">
              {entry.note}
            </p>
          )}
        </div>
        
        {onDelete && (
          <button 
            onClick={onDelete}
            className="text-neutral-400 hover:text-error-500 transition-colors"
            aria-label="Delete entry"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MoodEntryCard;