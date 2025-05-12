import React from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { MoodValue } from '../types';

const moodOptions: {value: MoodValue; emoji: string; label: string; color: string}[] = [
  { value: 1, emoji: '😔', label: 'Sad', color: 'bg-blue-400' },
  { value: 2, emoji: '😕', label: 'Meh', color: 'bg-blue-300' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-300' },
  { value: 4, emoji: '🙂', label: 'Good', color: 'bg-green-300' },
  { value: 5, emoji: '😊', label: 'Happy', color: 'bg-green-400' },
];

type MoodSelectorProps = {
  onSelect: (value: MoodValue) => void;
  selectedMood?: MoodValue;
  className?: string;
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  onSelect, 
  selectedMood,
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      {moodOptions.map((mood) => (
        <motion.button
          key={mood.value}
          onClick={() => onSelect(mood.value)}
          className={`flex flex-col items-center p-3 rounded-lg ${
            selectedMood === mood.value
              ? `${mood.color} ring-2 ring-offset-2 ring-primary-400`
              : 'bg-white hover:bg-neutral-50 border border-neutral-200'
          }`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-2xl mb-1">{mood.emoji}</span>
          <span className="text-xs font-medium">{mood.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default MoodSelector;