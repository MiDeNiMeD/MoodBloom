import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useMood } from '../contexts/MoodContext';
import MoodSelector from '../components/MoodSelector';
import { MoodValue } from '../types';

const LogMood: React.FC = () => {
  const { addMoodEntry, todaysMood } = useMood();
  const navigate = useNavigate();
  
  const [selectedMood, setSelectedMood] = useState<MoodValue | undefined>(
    todaysMood?.value
  );
  const [note, setNote] = useState<string>(todaysMood?.note || '');
  const today = format(new Date(), 'yyyy-MM-dd');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      return;
    }
    
    addMoodEntry({
      date: new Date().toISOString(),
      value: selectedMood,
      note: note.trim() || undefined,
    });
    
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-semibold mb-6 text-neutral-800">
          How are you feeling today?
        </h1>
        
        <form onSubmit={handleSubmit} className="card">
          <div className="mb-6">
            <MoodSelector 
              onSelect={setSelectedMood}
              selectedMood={selectedMood}
              className="mb-2"
            />
            <p className="text-sm text-neutral-500 text-center mt-2">
              Select the emoji that best represents your mood
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="note" className="block text-sm font-medium text-neutral-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              id="note"
              rows={4}
              className="input"
              placeholder="What made you feel this way today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={!selectedMood}
            >
              {todaysMood ? 'Update Mood' : 'Save Mood'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LogMood;