import { useState, useEffect } from "react";
import { Brain, CheckCircle2, Unlock, Clock, Flame, Calendar, LogOut, Bookmark, ChevronRight, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useBookmarks, BookmarkedSnippet } from "@/hooks/useBookmarks";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkedSnippet | null>(null);

  const { bookmarks, removeBookmark } = useBookmarks();

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
    
    setStats({
      conceptsLearned: snippets * 3,
      understandingVerified: Math.floor(snippets * 0.8),
      skillsUnlocked: Math.floor(snippets / 5),
      timeInvested: snippets * 4,
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
    <div className="px-4 sm:px-5 pt-6 sm:pt-8 pb-6 min-h-[calc(100svh-4rem)] flex flex-col">
      {/* User Header */}
      <header className="mb-6 sm:mb-8 animate-fade-in">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center border border-primary/20">
            <span className="text-xl sm:text-2xl font-bold text-primary">S</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Learner</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Learning since Jan 2025</p>
          </div>
        </div>
      </header>

      {/* Streak Card */}
      <Card className="mb-4 sm:mb-6 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 animate-fade-in">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-primary/15">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Current Streak</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {stats.currentStreak} {stats.currentStreak === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Longest</p>
              <p className="text-base sm:text-lg font-semibold text-primary">{stats.longestStreak} days</p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
            Keep learning daily to build your streak
          </p>
        </CardContent>
      </Card>

      {/* Saved Snippets Card */}
      <Card 
        className="mb-4 sm:mb-6 cursor-pointer hover:bg-card/80 transition-colors animate-fade-in"
        onClick={() => setShowBookmarks(true)}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-secondary">
                <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-semibold text-foreground">Saved Snippets</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {bookmarks.length} {bookmarks.length === 1 ? "snippet" : "snippets"} saved
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Learning Snapshot */}
      <section className="mb-4 sm:mb-6 flex-1">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Your Learning Snapshot</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Small efforts compound into real knowledge.</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-3 sm:p-4">
                  <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5 mb-1.5 sm:mb-2", stat.color)} />
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-foreground">{stats.clarityScore}%</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Clarity Score</p>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "250ms" }}>
            <CardContent className="p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-secondary">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-foreground">{stats.activeDays}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Active Days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Log Out Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl font-medium text-muted-foreground bg-secondary/50 border border-border transition-all hover:bg-secondary hover:text-foreground animate-fade-in text-sm sm:text-base"
        style={{ animationDelay: "300ms" }}
      >
        <LogOut size={18} />
        <span>Log Out</span>
      </button>

      {/* Bookmarks Modal */}
      {showBookmarks && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Saved Snippets</h2>
              <button
                onClick={() => {
                  setShowBookmarks(false);
                  setSelectedBookmark(null);
                }}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-4 sm:p-5">
                {bookmarks.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No saved snippets yet</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Tap the bookmark icon on any snippet to save it here
                    </p>
                  </div>
                ) : selectedBookmark ? (
                  <div className="animate-fade-in">
                    {/* Back button */}
                    <button
                      onClick={() => setSelectedBookmark(null)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      <span>Back to list</span>
                    </button>

                    {/* Snippet image */}
                    <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-4">
                      <img
                        src={selectedBookmark.image}
                        alt={selectedBookmark.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-background/80 text-primary">
                        {selectedBookmark.topic}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-4">{selectedBookmark.title}</h3>

                    {/* Content */}
                    <div className="space-y-3 mb-6">
                      {selectedBookmark.content.split('\n\n').map((p, i) => (
                        <p key={i} className="text-sm text-secondary-foreground leading-relaxed">{p}</p>
                      ))}
                    </div>

                    {/* Example */}
                    <div className="example-block mb-6">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Example</p>
                      <p className="text-sm text-muted-foreground">{selectedBookmark.example}</p>
                    </div>

                    {/* Remove bookmark */}
                    <button
                      onClick={() => {
                        removeBookmark(selectedBookmark.id);
                        setSelectedBookmark(null);
                      }}
                      className="w-full py-3 rounded-xl font-medium text-destructive bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
                    >
                      Remove from Saved
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookmarks.map((bookmark) => (
                      <Card
                        key={bookmark.id}
                        className="cursor-pointer hover:bg-card/80 transition-colors"
                        onClick={() => setSelectedBookmark(bookmark)}
                      >
                        <CardContent className="p-3 sm:p-4 flex gap-3">
                          <img
                            src={bookmark.image}
                            alt={bookmark.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] sm:text-xs text-primary font-medium">
                              {bookmark.topic}
                            </span>
                            <h4 className="text-sm sm:text-base font-semibold text-foreground truncate mt-0.5">
                              {bookmark.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {bookmark.content.slice(0, 100)}...
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
}
