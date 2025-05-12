import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import PlantVisualizer from '../components/PlantVisualizer';
import StreakCounter from '../components/StreakCounter';
import MoodEntryCard from '../components/MoodEntryCard';

const Home: React.FC = () => {
  const { moodEntries, todaysMood, deleteMoodEntry } = useMood();
  const navigate = useNavigate();
  
  // Get the 5 most recent entries
  const recentEntries = [...moodEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-semibold mb-4 text-neutral-800">
              Hello! Today is {format(new Date(), 'EEEE, MMMM d')}
            </h1>
            
            <StreakCounter />
            
            {todaysMood ? (
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-3 text-neutral-700">Today's Mood</h2>
                <MoodEntryCard 
                  entry={todaysMood} 
                  onDelete={() => deleteMoodEntry(todaysMood.id)} 
                />
                <button 
                  onClick={() => navigate('/log')}
                  className="btn-outline w-full"
                >
                  Update Today's Mood
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <button 
                  onClick={() => navigate('/log')}
                  className="btn-primary w-full"
                >
                  Log Today's Mood
                </button>
              </div>
            )}
            
            {recentEntries.length > 0 && (
              <div>
                <h2 className="text-xl font-medium mb-3 text-neutral-700">Recent Entries</h2>
                {recentEntries.map(entry => (
                  <MoodEntryCard 
                    key={entry.id} 
                    entry={entry} 
                    onDelete={() => deleteMoodEntry(entry.id)} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="md:w-1/2">
          <PlantVisualizer className="sticky top-6" />
        </div>
      </div>
    </div>
  );
};

export default Home;