import { WorkoutLog, UserStats } from '../types';

const STORAGE_KEY = 'fitpulse_logs';

export const getLogs = (): WorkoutLog[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLog = (log: WorkoutLog): WorkoutLog[] => {
  const current = getLogs();
  const updated = [log, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const calculateStats = (logs: WorkoutLog[]): UserStats => {
  const totalWorkouts = logs.length;
  const totalMinutes = logs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  
  // Calculate Streak
  let currentStreak = 0;
  if (logs.length > 0) {
    // Sort descending by date
    const sortedDates = Array.from(new Set(logs.map(l => l.date))).sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if the streak is alive (active today or yesterday)
    if (sortedDates[0] === today || sortedDates[0] === yesterday) {
        currentStreak = 1;
        let lastDate = new Date(sortedDates[0]);
        
        for (let i = 1; i < sortedDates.length; i++) {
            const currDate = new Date(sortedDates[i]);
            const diffTime = Math.abs(lastDate.getTime() - currDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                currentStreak++;
                lastDate = currDate;
            } else {
                break;
            }
        }
    }
  }

  return { totalWorkouts, currentStreak, totalMinutes };
};