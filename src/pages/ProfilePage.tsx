import { useState, useEffect } from "react";
import { BookOpen, Trophy, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [stats, setStats] = useState({
    snippetsCompleted: 0,
    totalPoints: 0,
  });

  useEffect(() => {
    const savedStats = localStorage.getItem("swifted-stats");
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      setStats({
        snippetsCompleted: parsed.snippetsCompleted || 0,
        totalPoints: parsed.totalPoints || 0,
      });
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="px-5 pt-12 pb-6 min-h-[calc(100svh-4rem)] flex flex-col">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      {/* User Info */}
      <section className="rounded-2xl bg-card border border-border/50 p-5 mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">S</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Learner</h2>
            <p className="text-sm text-muted-foreground">Learning since Jan 2025</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mb-8 flex-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card border border-border/50 p-5 text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
            <BookOpen size={22} className="mx-auto mb-3 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.snippetsCompleted}</p>
            <p className="text-xs text-muted-foreground">Snippets</p>
          </div>
          <div className="rounded-2xl bg-card border border-border/50 p-5 text-center animate-fade-in" style={{ animationDelay: "150ms" }}>
            <Trophy size={22} className="mx-auto mb-3 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
        </div>
      </section>

      {/* Log Out Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-destructive bg-destructive/10 border border-destructive/20 transition-all hover:bg-destructive/15 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <LogOut size={18} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
