export enum AppView {
  HOME = 'HOME',
  CALENDAR = 'CALENDAR',
  STATS = 'STATS',
  SETTINGS = 'SETTINGS'
}

export interface WorkoutLog {
  id: string;
  date: string; // ISO Date string YYYY-MM-DD
  timestamp: number;
  type: string;
  durationMinutes: number;
  notes?: string;
  aiMotivation?: string;
}

export interface UserStats {
  totalWorkouts: number;
  currentStreak: number;
  totalMinutes: number;
}

export const EXERCISE_TYPES = [
  "跑步", "力量训练", "瑜伽", "HIIT", "骑行", "游泳", "普拉提", "徒步", "其他"
];