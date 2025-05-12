import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useMood } from '../contexts/MoodContext';

const AchievementCard: React.FC<{
  title: string;
  description: string;
  date: string;
  index: number;
}> = ({ title, description, date, index }) => (
  <motion.div
    className="card mb-4 bg-white border border-neutral-200"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <div className="flex items-start">
      <div className="bg-accent-100 text-accent-600 p-3 rounded-full mr-4">
        <span className="text-2xl">🏆</span>
      </div>
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-neutral-600 text-sm mb-2">{description}</p>
        <p className="text-neutral-500 text-xs">
          Achieved on {format(parseISO(date), 'MMM d, yyyy')}
        </p>
      </div>
    </div>
  </motion.div>
);

const EmptyState: React.FC = () => (
  <motion.div
    className="card bg-neutral-50 text-center py-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl mb-4">🏆</div>
    <h3 className="text-xl font-medium mb-2 text-neutral-700">No Achievements Yet</h3>
    <p className="text-neutral-600 mb-4">
      Keep logging your moods and maintaining streaks to unlock achievements!
    </p>
    <ul className="text-sm text-neutral-600 text-left max-w-xs mx-auto space-y-1">
      <li>• Log your mood daily</li>
      <li>• Maintain logging streaks</li>
      <li>• Nurture your plant</li>
      <li>• Stay consistent</li>
    </ul>
  </motion.div>
);

const Achievements: React.FC = () => {
  const { achievements } = useMood();
  
  // Sort achievements by date (newest first)
  const sortedAchievements = [...achievements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-neutral-800">
        Your Achievements
      </h1>
      
      {sortedAchievements.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {sortedAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              date={achievement.date}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;