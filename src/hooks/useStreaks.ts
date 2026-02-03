import { useState, useEffect, useCallback } from "react";
import { format, subDays, isToday, parseISO, differenceInDays } from "date-fns";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  todayCompleted: number;
  dailyGoal: number;
  streakHistory: Record<string, number>; // date -> snippets completed
  lastActiveRoadmap: {
    categoryId: string;
    roadmapIndex: number;
    unitIndex: number;
    unitTitle: string;
  } | null;
}

const STREAKS_KEY = "swifted-streaks";
const DAILY_GOAL = 10;

const defaultStreakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  todayCompleted: 0,
  dailyGoal: DAILY_GOAL,
  streakHistory: {},
  lastActiveRoadmap: null,
};

export function useStreaks() {
  const [streakData, setStreakData] = useState<StreakData>(() => {
    const stored = localStorage.getItem(STREAKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as StreakData;
      // Check if we need to reset today's count for a new day
      const today = format(new Date(), "yyyy-MM-dd");
      const lastEntry = Object.keys(parsed.streakHistory).sort().pop();
      
      if (lastEntry && lastEntry !== today) {
        // It's a new day, reset today's completed but keep history
        return {
          ...parsed,
          todayCompleted: 0,
        };
      }
      return parsed;
    }
    return defaultStreakData;
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STREAKS_KEY, JSON.stringify(streakData));
  }, [streakData]);

  // Calculate current streak based on history
  const calculateStreak = useCallback((history: Record<string, number>): number => {
    const today = format(new Date(), "yyyy-MM-dd");
    const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
    
    // Check if today or yesterday had a completed day (10+ snippets)
    const todayComplete = (history[today] || 0) >= DAILY_GOAL;
    const yesterdayComplete = (history[yesterday] || 0) >= DAILY_GOAL;
    
    if (!todayComplete && !yesterdayComplete) {
      return 0;
    }

    let streak = 0;
    let checkDate = todayComplete ? new Date() : subDays(new Date(), 1);
    
    while (true) {
      const dateKey = format(checkDate, "yyyy-MM-dd");
      if ((history[dateKey] || 0) >= DAILY_GOAL) {
        streak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }
    
    return streak;
  }, []);

  // Complete a snippet
  const completeSnippet = useCallback((source: "daily" | "roadmap" = "daily") => {
    setStreakData((prev) => {
      const today = format(new Date(), "yyyy-MM-dd");
      const newTodayCompleted = prev.todayCompleted + 1;
      
      const newHistory = {
        ...prev.streakHistory,
        [today]: newTodayCompleted,
      };

      const newStreak = calculateStreak(newHistory);
      const newLongestStreak = Math.max(prev.longestStreak, newStreak);

      return {
        ...prev,
        todayCompleted: newTodayCompleted,
        streakHistory: newHistory,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
      };
    });
  }, [calculateStreak]);

  // Update last active roadmap
  const updateLastActiveRoadmap = useCallback(
    (categoryId: string, roadmapIndex: number, unitIndex: number, unitTitle: string) => {
      setStreakData((prev) => ({
        ...prev,
        lastActiveRoadmap: {
          categoryId,
          roadmapIndex,
          unitIndex,
          unitTitle,
        },
      }));
    },
    []
  );

  // Get last 7 days of streak data for calendar
  const getWeeklyStreak = useCallback(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateKey = format(date, "yyyy-MM-dd");
      const completed = streakData.streakHistory[dateKey] || 0;
      days.push({
        date,
        dateKey,
        completed,
        isGoalMet: completed >= DAILY_GOAL,
        isToday: isToday(date),
      });
    }
    return days;
  }, [streakData.streakHistory]);

  // Check if today's goal is complete
  const isTodayComplete = streakData.todayCompleted >= DAILY_GOAL;
  const snippetsRemaining = Math.max(0, DAILY_GOAL - streakData.todayCompleted);
  const progressPercentage = Math.min(100, (streakData.todayCompleted / DAILY_GOAL) * 100);

  return {
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    todayCompleted: streakData.todayCompleted,
    dailyGoal: DAILY_GOAL,
    isTodayComplete,
    snippetsRemaining,
    progressPercentage,
    lastActiveRoadmap: streakData.lastActiveRoadmap,
    completeSnippet,
    updateLastActiveRoadmap,
    getWeeklyStreak,
  };
}
