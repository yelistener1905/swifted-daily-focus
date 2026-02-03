import { Link } from "react-router-dom";
import { Flame, ArrowRight, BookOpen, Map, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStreaks } from "@/hooks/useStreaks";
import { StreakCalendar } from "@/components/streaks/StreakCalendar";
import { DailyProgress } from "@/components/streaks/DailyProgress";
import { cn } from "@/lib/utils";

export default function StreaksPage() {
  const {
    currentStreak,
    longestStreak,
    todayCompleted,
    dailyGoal,
    isTodayComplete,
    snippetsRemaining,
    progressPercentage,
    lastActiveRoadmap,
    getWeeklyStreak,
  } = useStreaks();

  const weeklyData = getWeeklyStreak();

  // Get motivational message
  const getMotivationalMessage = () => {
    if (isTodayComplete) {
      return "Amazing work! You've crushed today's goal. 🎉";
    }
    if (todayCompleted === 0) {
      return "Pick it up today — one good day builds momentum.";
    }
    if (todayCompleted < 5) {
      return "You're warming up! Keep the momentum going.";
    }
    return "Almost there! Just a few more to complete today.";
  };

  return (
    <div className="px-4 sm:px-5 pt-6 sm:pt-8 pb-6 animate-fade-in">
      {/* Header with Streak */}
      <header className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Your Streak
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>
      </header>

      {/* Main Streak Display */}
      <Card className="mb-5 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 border-primary/20">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className={cn(
                "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center",
                currentStreak > 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              <Flame className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-foreground mb-1">
              {currentStreak}
            </div>
            <p className="text-sm text-muted-foreground">
              {currentStreak === 1 ? "day streak" : "day streak"}
            </p>
          </div>

          {longestStreak > 0 && (
            <div className="mt-4 text-center">
              <span className="text-xs text-muted-foreground">
                Longest streak:{" "}
                <span className="font-semibold text-foreground">
                  {longestStreak} days
                </span>
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Progress */}
      <div className="mb-5">
        <DailyProgress
          completed={todayCompleted}
          goal={dailyGoal}
          progressPercentage={progressPercentage}
          isComplete={isTodayComplete}
        />
      </div>

      {/* Weekly Calendar */}
      <div className="mb-6">
        <StreakCalendar weeklyData={weeklyData} dailyGoal={dailyGoal} />
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {/* Continue Learning CTA */}
        <Link to="/daily">
          <Card className="cursor-pointer hover:border-primary/50 transition-all group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/15">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Continue Today's Learning
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Daily quiz, vocab & long read
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>

        {/* Resume Roadmap CTA */}
        {lastActiveRoadmap ? (
          <Link to="/roadmaps">
            <Card className="cursor-pointer hover:border-primary/50 transition-all group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <Map className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Pick Up Where You Left Off
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Continue: Unit {lastActiveRoadmap.unitIndex + 1} –{" "}
                    {lastActiveRoadmap.unitTitle}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ) : (
          <Link to="/roadmaps">
            <Card className="cursor-pointer hover:border-primary/50 transition-all group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <Map className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Start a Learning Path
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Choose a roadmap to begin
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        )}
      </div>

      {/* How Streaks Work */}
      <Card className="mt-6 bg-secondary/30 border-border/30">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            How Streaks Work
          </h4>
          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Complete {dailyGoal} snippets per day to maintain your streak
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Snippets from Daily section and Roadmaps both count
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Miss a day? No worries — just pick it back up tomorrow
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
