import { useState, useEffect } from "react";
import { BookOpen, Clock, Award, LogOut, Flame, Trophy } from "lucide-react";

export default function ProfilePage() {
  // Load stats from localStorage
  const [stats, setStats] = useState({
    snippetsCompleted: 0,
    totalPoints: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    const savedStats = localStorage.getItem("swifted-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const handleLogout = () => {
    // Placeholder logout action
    console.log("Logging out...");
  };

  return (
    <div className="px-5 pt-12 pb-6 min-h-[calc(100svh-4rem)] flex flex-col">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      {/* User Info */}
      <section className="learning-card mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">S</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Learner</h2>
            <p className="text-sm text-muted-foreground">Learning since Jan 2025</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="learning-card text-center py-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <BookOpen size={22} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.snippetsCompleted}</p>
            <p className="text-xs text-muted-foreground">Snippets</p>
          </div>
          <div className="learning-card text-center py-5 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <Trophy size={22} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="learning-card text-center py-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Flame size={22} className="mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="learning-card text-center py-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
            <Award size={22} className="mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-foreground">{stats.bestStreak}</p>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="mb-8 flex-1">
        <h2 className="section-title mb-4">Leaderboard</h2>
        <div className="learning-card animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Alex M.", points: 2450, isYou: false },
              { rank: 2, name: "Sarah K.", points: 2180, isYou: false },
              { rank: 3, name: "You", points: stats.totalPoints, isYou: true },
            ].sort((a, b) => b.points - a.points).map((user, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.isYou ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0 ? "bg-yellow-500 text-yellow-950" :
                    idx === 1 ? "bg-gray-400 text-gray-900" :
                    "bg-orange-600 text-orange-100"
                  }`}>
                    {idx + 1}
                  </span>
                  <span className={`font-medium ${user.isYou ? "text-primary" : "text-foreground"}`}>
                    {user.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{user.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Log Out Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-destructive bg-destructive/10 border border-destructive/30 transition-all hover:bg-destructive/20 animate-fade-in"
        style={{ animationDelay: "400ms" }}
      >
        <LogOut size={18} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
