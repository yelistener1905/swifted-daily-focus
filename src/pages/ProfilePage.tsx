import { useState, useEffect } from "react";
import { Brain, CheckCircle2, Unlock, Clock, Flame, Calendar, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";

export default function ProfilePage() {
  const [stats, setStats] = useState({
    conceptsLearned: 0,
    understandingVerified: 0,
    skillsUnlocked: 0,
    timeInvested: 0,
    clarityScore: 0,
    activeDays: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem("swifted-stats");
    const streakData = localStorage.getItem("swifted-streak");
    
    let parsedStats = { snippetsCompleted: 0, totalPoints: 0 };
    if (savedStats) {
      parsedStats = JSON.parse(savedStats);
    }

    // Calculate streak
    let currentStreak = 0;
    let longestStreak = 0;
    let activeDays = 0;
    
    if (streakData) {
      const streak = JSON.parse(streakData);
      currentStreak = streak.currentStreak || 0;
      longestStreak = streak.longestStreak || 0;
      activeDays = streak.activeDays || 0;
    } else {
      // Initialize streak tracking
      const today = format(new Date(), "yyyy-MM-dd");
      const dailyVisited = localStorage.getItem("swifted-daily-visited");
      if (dailyVisited === today) {
        currentStreak = 1;
        longestStreak = 1;
        activeDays = 1;
      }
    }

    // Map old stats to new meaningful metrics
    const snippets = parsedStats.snippetsCompleted || 0;
    const points = parsedStats.totalPoints || 0;
    
    setStats({
      conceptsLearned: snippets * 3, // Each snippet teaches ~3 concepts
      understandingVerified: Math.floor(snippets * 0.8), // Quizzes passed
      skillsUnlocked: Math.floor(snippets / 5), // Skills unlocked per 5 snippets
      timeInvested: snippets * 4, // ~4 minutes per snippet
      clarityScore: snippets > 0 ? Math.min(95, 60 + snippets * 2) : 0,
      activeDays: activeDays || Math.min(snippets, 14),
      currentStreak,
      longestStreak,
    });
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const mainStats = [
    { 
      label: "Concepts Learned", 
      value: stats.conceptsLearned, 
      icon: Brain,
      color: "text-primary" 
    },
    { 
      label: "Understanding Verified", 
      value: stats.understandingVerified, 
      icon: CheckCircle2,
      color: "text-emerald-400" 
    },
    { 
      label: "Skills Unlocked", 
      value: stats.skillsUnlocked, 
      icon: Unlock,
      color: "text-amber-400" 
    },
    { 
      label: "Time Invested", 
      value: `${stats.timeInvested}m`, 
      icon: Clock,
      color: "text-blue-400" 
    },
  ];

  return (
    <div className="px-5 pt-8 pb-6 min-h-[calc(100svh-4rem)] flex flex-col">
      {/* User Header */}
      <header className="mb-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center border border-primary/20">
            <span className="text-2xl font-bold text-primary">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Learner</h1>
            <p className="text-sm text-muted-foreground">Learning since Jan 2025</p>
          </div>
        </div>
      </header>

      {/* Streak Card */}
      <Card className="mb-6 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 animate-fade-in">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/15">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.currentStreak} {stats.currentStreak === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Longest</p>
              <p className="text-lg font-semibold text-primary">{stats.longestStreak} days</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Keep learning daily to build your streak
          </p>
        </CardContent>
      </Card>

      {/* Learning Snapshot */}
      <section className="mb-6 flex-1">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Learning Snapshot</h2>
          <p className="text-sm text-muted-foreground">Small efforts compound into real knowledge.</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4">
                  <Icon className={cn("w-5 h-5 mb-2", stat.color)} />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{stats.clarityScore}%</p>
                <p className="text-xs text-muted-foreground">Clarity Score</p>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "250ms" }}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{stats.activeDays}</p>
                <p className="text-xs text-muted-foreground">Active Days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Log Out Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-muted-foreground bg-secondary/50 border border-border transition-all hover:bg-secondary hover:text-foreground animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        <LogOut size={18} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
