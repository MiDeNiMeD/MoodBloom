import React from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { PlantType } from '../types';

type PlantVisualizerProps = {
  className?: string;
};

const PlantVisualizer: React.FC<PlantVisualizerProps> = ({ className }) => {
  const { moodEntries, plantType, plantGrowthLevel } = useMood();
  
  const getPlantEmoji = () => {
    switch (plantType) {
      case 'flower':
        return growthLevelToFlowerEmoji(plantGrowthLevel);
      case 'tree':
        return growthLevelToTreeEmoji(plantGrowthLevel);
      case 'cactus':
        return growthLevelToCactusEmoji(plantGrowthLevel);
      default:
        return '🌱';
    }
  };
  
  const growthLevelToFlowerEmoji = (level: number) => {
    if (level < 20) return '🌱';
    if (level < 40) return '🌿';
    if (level < 60) return '🍀';
    if (level < 80) return '🌷';
    return '🌻';
  };
  
  const growthLevelToTreeEmoji = (level: number) => {
    if (level < 20) return '🌱';
    if (level < 40) return '🌿';
    if (level < 60) return '🌴';
    if (level < 80) return '🌲';
    return '🌳';
  };
  
  const growthLevelToCactusEmoji = (level: number) => {
    if (level < 20) return '🌱';
    if (level < 40) return '🌵';
    if (level < 60) return '🏜️';
    if (level < 80) return '🌵';
    return '🏵️';
  };

  const getPlantName = () => {
    switch (plantType) {
      case 'flower':
        return 'Flower';
      case 'tree':
        return 'Tree';
      case 'cactus':
        return 'Cactus';
      default:
        return 'Plant';
    }
  };

  const getMotivationalMessage = () => {
    if (plantGrowthLevel < 20) {
      return "Your plant is just beginning its journey. Keep logging your moods!";
    } else if (plantGrowthLevel < 40) {
      return "Your plant is starting to grow! Keep up the good work.";
    } else if (plantGrowthLevel < 60) {
      return "Your plant is thriving! Your consistency is paying off.";
    } else if (plantGrowthLevel < 80) {
      return "Your plant is flourishing! You're doing great!";
    } else {
      return "Your plant is in full bloom! Amazing job with your mood tracking!";
    }
  };

  const plantContainerVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const hasEntries = moodEntries.length > 0;

  return (
    <div className={`card flex flex-col items-center ${className}`}>
      <h2 className="text-xl mb-6 text-center font-medium text-neutral-700">
        Your {getPlantName()} Growth
      </h2>
      
      <motion.div 
        className="mb-6 text-center bg-primary-50 rounded-full w-40 h-40 flex items-center justify-center"
        variants={plantContainerVariants}
        whileHover="hover"
        animate={{ scale: [0.96, 1] }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-7xl">{getPlantEmoji()}</span>
      </motion.div>
      
      <div className="w-full bg-neutral-200 rounded-full h-4 mb-4">
        <motion.div 
          className="bg-primary-400 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${plantGrowthLevel}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-sm text-neutral-600 mb-2">
        Growth Level: {plantGrowthLevel}%
      </p>
      
      {hasEntries ? (
        <p className="text-center text-neutral-700 mt-4">
          {getMotivationalMessage()}
        </p>
      ) : (
        <p className="text-center text-neutral-700 mt-4">
          Start logging your mood to see your plant grow!
        </p>
      )}
    </div>
  );
};

export default PlantVisualizer;