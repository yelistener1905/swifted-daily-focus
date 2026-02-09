import { useState, useEffect, useCallback } from "react";
import { format, subDays, isToday } from "date-fns";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  quizAttemptedToday: boolean;
  streakHistory: Record<string, boolean>; // date -> quiz attempted
  lastActiveRoadmap: {
    categoryId: string;
    roadmapIndex: number;
    unitIndex: number;
    unitTitle: string;
  } | null;
}

const STREAKS_KEY = "swifted-streaks";

const defaultStreakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  quizAttemptedToday: false,
  streakHistory: {},
  lastActiveRoadmap: null,
};

export function useStreaks() {
  const [streakData, setStreakData] = useState<StreakData>(() => {
    const stored = localStorage.getItem(STREAKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as StreakData;
      const today = format(new Date(), "yyyy-MM-dd");

      // Reset today's state if it's a new day
      if (!parsed.streakHistory[today]) {
        return { ...parsed, quizAttemptedToday: false };
      }
      return { ...parsed, quizAttemptedToday: parsed.streakHistory[today] };
    }
    return defaultStreakData;
  });

  useEffect(() => {
    localStorage.setItem(STREAKS_KEY, JSON.stringify(streakData));
  }, [streakData]);

  const calculateStreak = useCallback((history: Record<string, boolean>): number => {
    const today = format(new Date(), "yyyy-MM-dd");
    const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

    const todayDone = !!history[today];
    const yesterdayDone = !!history[yesterday];

    if (!todayDone && !yesterdayDone) return 0;

    let streak = 0;
    let checkDate = todayDone ? new Date() : subDays(new Date(), 1);

    while (true) {
      const dateKey = format(checkDate, "yyyy-MM-dd");
      if (history[dateKey]) {
        streak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }

    return streak;
  }, []);

  // Record a quiz attempt — only one per day counts toward streak
  const recordQuizAttempt = useCallback(
    (source: "daily" | "roadmap" | "snippet" = "snippet") => {
      setStreakData((prev) => {
        const today = format(new Date(), "yyyy-MM-dd");

        const newHistory = { ...prev.streakHistory, [today]: true };
        const newStreak = calculateStreak(newHistory);

        return {
          ...prev,
          quizAttemptedToday: true,
          streakHistory: newHistory,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.longestStreak, newStreak),
        };
      });
    },
    [calculateStreak]
  );

  const updateLastActiveRoadmap = useCallback(
    (categoryId: string, roadmapIndex: number, unitIndex: number, unitTitle: string) => {
      setStreakData((prev) => ({
        ...prev,
        lastActiveRoadmap: { categoryId, roadmapIndex, unitIndex, unitTitle },
      }));
    },
    []
  );

  const getWeeklyStreak = useCallback(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateKey = format(date, "yyyy-MM-dd");
      const attempted = !!streakData.streakHistory[dateKey];
      days.push({
        date,
        dateKey,
        completed: attempted ? 1 : 0,
        isGoalMet: attempted,
        isToday: isToday(date),
      });
    }
    return days;
  }, [streakData.streakHistory]);

  return {
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    quizAttemptedToday: streakData.quizAttemptedToday,
    lastActiveRoadmap: streakData.lastActiveRoadmap,
    recordQuizAttempt,
    updateLastActiveRoadmap,
    getWeeklyStreak,
  };
}
