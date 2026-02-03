import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Beaker, Cpu, DollarSign, MessageCircle, Heart, Lightbulb, ChevronRight, Search, BookOpen, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useStreaks } from "@/hooks/useStreaks";

const categories = [
  { id: "science", title: "Science & Nature", icon: Beaker, color: "from-violet-500/20 to-purple-500/20" },
  { id: "tech", title: "Tech & AI", icon: Cpu, color: "from-blue-500/20 to-cyan-500/20" },
  { id: "finance", title: "Money & Finance", icon: DollarSign, color: "from-emerald-500/20 to-green-500/20" },
  { id: "communication", title: "Languages & Communication", icon: MessageCircle, color: "from-teal-500/20 to-cyan-500/20" },
  { id: "health", title: "Health, Fitness & Mind", icon: Heart, color: "from-rose-500/20 to-pink-500/20" },
  { id: "life", title: "Life Skills & Lifestyle", icon: Lightbulb, color: "from-amber-500/20 to-orange-500/20" },
];

const roadmapsByCategory: Record<string, Array<{ title: string; description: string; lessonsCount: number; completedLessons: number }>> = {
  science: [
    { title: "Physics for Curious Minds", description: "Understand the laws that govern our universe", lessonsCount: 18, completedLessons: 0 },
    { title: "Biology Essentials", description: "Explore life from cells to ecosystems", lessonsCount: 16, completedLessons: 0 },
    { title: "Environmental Science", description: "Understand and protect our planet", lessonsCount: 14, completedLessons: 0 },
  ],
  tech: [
    { title: "AI & Machine Learning", description: "Understand artificial intelligence fundamentals", lessonsCount: 20, completedLessons: 5 },
    { title: "Web Development", description: "Build modern websites and applications", lessonsCount: 24, completedLessons: 0 },
    { title: "Cybersecurity Basics", description: "Protect yourself in the digital world", lessonsCount: 16, completedLessons: 0 },
  ],
  finance: [
    { title: "Personal Finance Mastery", description: "Build wealth through smart money decisions", lessonsCount: 18, completedLessons: 7 },
    { title: "Investing for Beginners", description: "Learn stocks, bonds, and portfolio management", lessonsCount: 22, completedLessons: 0 },
    { title: "Cryptocurrency & Blockchain", description: "Navigate digital currencies", lessonsCount: 14, completedLessons: 0 },
  ],
  communication: [
    { title: "Public Speaking Mastery", description: "Command any room with confidence", lessonsCount: 16, completedLessons: 0 },
    { title: "Persuasion & Influence", description: "Communicate to inspire action", lessonsCount: 14, completedLessons: 0 },
    { title: "Writing That Connects", description: "Craft compelling written communication", lessonsCount: 18, completedLessons: 0 },
  ],
  health: [
    { title: "Nutrition & Diet Science", description: "Fuel your body with evidence-based nutrition", lessonsCount: 16, completedLessons: 0 },
    { title: "Mental Wellness", description: "Build resilience and manage stress", lessonsCount: 18, completedLessons: 0 },
    { title: "Fitness Fundamentals", description: "Exercise science for lasting health", lessonsCount: 20, completedLessons: 0 },
  ],
  life: [
    { title: "Critical Thinking", description: "Sharpen your reasoning skills", lessonsCount: 12, completedLessons: 4 },
    { title: "Productivity Systems", description: "Master your time and energy", lessonsCount: 14, completedLessons: 0 },
    { title: "Emotional Intelligence", description: "Navigate relationships with empathy", lessonsCount: 16, completedLessons: 0 },
  ],
};

// Sample snippets data per category
const snippetsByCategory: Record<string, Array<{ title: string; topic: string; preview: string }>> = {
  science: [
    { title: "The Laws of Thermodynamics", topic: "Physics", preview: "Energy cannot be created or destroyed..." },
    { title: "How Evolution Works", topic: "Biology", preview: "Natural selection shapes species over time..." },
    { title: "Climate Change Basics", topic: "Environment", preview: "Understanding global warming mechanisms..." },
  ],
  tech: [
    { title: "What is Machine Learning", topic: "AI", preview: "Computers learning from data patterns..." },
    { title: "How the Internet Works", topic: "Networking", preview: "Data travels across global networks..." },
    { title: "Cybersecurity Fundamentals", topic: "Security", preview: "Protecting digital assets from threats..." },
  ],
  finance: [
    { title: "Compound Interest Magic", topic: "Investing", preview: "How money grows exponentially over time..." },
    { title: "Understanding Credit Scores", topic: "Personal Finance", preview: "What affects your creditworthiness..." },
    { title: "ETFs vs Mutual Funds", topic: "Investing", preview: "Comparing investment vehicles..." },
  ],
  communication: [
    { title: "Active Listening Skills", topic: "Communication", preview: "Truly hearing what others say..." },
    { title: "Body Language Basics", topic: "Presentation", preview: "Non-verbal cues that matter..." },
    { title: "Persuasive Writing", topic: "Writing", preview: "Craft compelling arguments..." },
  ],
  health: [
    { title: "Sleep Science", topic: "Wellness", preview: "Why quality rest matters for your brain..." },
    { title: "Macronutrients Explained", topic: "Nutrition", preview: "Proteins, carbs, and fats demystified..." },
    { title: "Managing Stress", topic: "Mental Health", preview: "Practical techniques for calm..." },
  ],
  life: [
    { title: "The Art of Saying No", topic: "Boundaries", preview: "Setting healthy limits in life..." },
    { title: "Decision Making Frameworks", topic: "Critical Thinking", preview: "Making better choices systematically..." },
    { title: "Time Blocking Method", topic: "Productivity", preview: "Structure your day for focus..." },
  ],
};

export default function RoadmapsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mainSearchQuery, setMainSearchQuery] = useState("");
  const { lastActiveRoadmap, updateLastActiveRoadmap, completeSnippet } = useStreaks();

  // Filter roadmaps and snippets based on search (for category detail view)
  const filteredData = useMemo(() => {
    if (!selectedCategory) return { roadmaps: [], snippets: [] };
    
    const roadmaps = roadmapsByCategory[selectedCategory] || [];
    const snippets = snippetsByCategory[selectedCategory] || [];
    
    if (!searchQuery.trim()) {
      return { roadmaps, snippets };
    }
    
    const query = searchQuery.toLowerCase();
    return {
      roadmaps: roadmaps.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query)
      ),
      snippets: snippets.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.topic.toLowerCase().includes(query)
      ),
    };
  }, [selectedCategory, searchQuery]);

  // Filter categories based on search (for main page)
  const filteredCategories = useMemo(() => {
    if (!mainSearchQuery.trim()) return categories;
    const query = mainSearchQuery.toLowerCase();
    return categories.filter(c => c.title.toLowerCase().includes(query));
  }, [mainSearchQuery]);

  if (selectedCategory) {
    const category = categories.find((c) => c.id === selectedCategory);

    return (
      <div className="px-4 sm:px-5 pt-6 sm:pt-8 pb-6 animate-fade-in">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setSearchQuery("");
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to categories</span>
        </button>

        <header className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{category?.title}</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            {filteredData.roadmaps.length} courses, {filteredData.snippets.length} snippets
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-5 sm:mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses and snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>

        {/* Roadmaps Section */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Courses</h2>
          <div className="space-y-3 sm:space-y-4">
            {filteredData.roadmaps.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No courses found</p>
            ) : (
              filteredData.roadmaps.map((roadmap, index) => {
                const progress = roadmap.lessonsCount > 0 ? (roadmap.completedLessons / roadmap.lessonsCount) * 100 : 0;
                return (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{roadmap.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mt-1">{roadmap.description}</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mb-1">
                          <span>{roadmap.completedLessons} / {roadmap.lessonsCount} lessons</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 w-full text-xs sm:text-sm"
                        onClick={() => {
                          // Persist the user's place so the main page can show "Pick up where you left off"
                          // We don't have a unit list yet, so we derive a reasonable "next" unit label.
                          const nextUnitIndex = Math.min(
                            roadmap.completedLessons,
                            Math.max(0, roadmap.lessonsCount - 1)
                          );
                          updateLastActiveRoadmap(
                            selectedCategory,
                            index,
                            nextUnitIndex,
                            `Lesson ${nextUnitIndex + 1}`
                          );
                        }}
                      >
                        {roadmap.completedLessons > 0 ? "Continue" : "Start Learning"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </section>

        {/* Snippets Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick Snippets</h2>
          <div className="space-y-2 sm:space-y-3">
            {filteredData.snippets.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No snippets found</p>
            ) : (
              filteredData.snippets.map((snippet, index) => (
                <Card key={index} className="overflow-hidden cursor-pointer hover:border-primary/40 transition-colors">
                  <CardContent className="p-3 sm:p-4 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] sm:text-xs text-primary font-medium">{snippet.topic}</span>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base mt-0.5">{snippet.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{snippet.preview}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    );
  }

  // Get the continue roadmap info
  const getContinueRoadmap = () => {
    if (!lastActiveRoadmap) return null;
    const category = categories.find(c => c.id === lastActiveRoadmap.categoryId);
    const roadmap = roadmapsByCategory[lastActiveRoadmap.categoryId]?.[lastActiveRoadmap.roadmapIndex];
    if (!category || !roadmap) return null;
    return { category, roadmap, ...lastActiveRoadmap };
  };

  const continueRoadmap = getContinueRoadmap();

  return (
    <div className="px-4 sm:px-5 pt-6 sm:pt-8 pb-6 animate-fade-in">
      <header className="mb-4 sm:mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Learning Paths</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">Choose a category to explore</p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search categories..."
          value={mainSearchQuery}
          onChange={(e) => setMainSearchQuery(e.target.value)}
          className="pl-10 bg-secondary/50 border-border"
        />
      </div>

      {/* Pick up where you left off */}
      <Card className="mb-5 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 border-primary/30">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Play className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1">
              <span className="text-xs text-primary font-medium">Pick up where you left off</span>

              {continueRoadmap ? (
                <>
                  <h3 className="font-semibold text-foreground mt-1">
                    {continueRoadmap.roadmap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Unit {continueRoadmap.unitIndex + 1} – {continueRoadmap.unitTitle}
                  </p>
                  <div className="mt-3">
                    <Progress
                      value={(continueRoadmap.roadmap.completedLessons / continueRoadmap.roadmap.lessonsCount) * 100}
                      className="h-1.5"
                    />
                    <span className="text-[10px] text-muted-foreground mt-1 inline-block">
                      {continueRoadmap.roadmap.completedLessons}/{continueRoadmap.roadmap.lessonsCount} lessons
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Start any course and we’ll keep your next unit ready here.
                </p>
              )}
            </div>

            {continueRoadmap ? (
              <Button
                size="sm"
                className="shrink-0"
                onClick={() => setSelectedCategory(continueRoadmap.categoryId)}
              >
                Continue
              </Button>
            ) : (
              <Button
                size="sm"
                className="shrink-0"
                onClick={() => {
                  document
                    .getElementById("roadmap-categories")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Browse
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {filteredCategories.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">No categories found</p>
      ) : (
        <div id="roadmap-categories" className="grid grid-cols-2 gap-2 sm:gap-3">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={cn(
                  "cursor-pointer hover:border-primary/50 transition-all duration-200 overflow-hidden group"
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className={cn("p-3 sm:p-4 bg-gradient-to-br", category.color)}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                  <h3 className="font-medium text-foreground text-xs sm:text-sm group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 sm:mt-2 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
