export type MoodValue = 1 | 2 | 3 | 4 | 5;

export type PlantType = 'flower' | 'tree' | 'cactus';

export interface MoodEntry {
  id: string;
  date: string; // ISO date string
  value: MoodValue;
  note?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
}