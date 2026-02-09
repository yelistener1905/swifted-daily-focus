import { useState, useMemo } from "react";
import { ArrowLeft, Beaker, Cpu, DollarSign, MessageCircle, Heart, Lightbulb, ChevronRight, Search, BookOpen, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useStreaks } from "@/hooks/useStreaks";

const categories = [
  { id: "science", title: "Science & Nature", icon: Beaker },
  { id: "tech", title: "Tech & AI", icon: Cpu },
  { id: "finance", title: "Money & Finance", icon: DollarSign },
  { id: "communication", title: "Languages", icon: MessageCircle },
  { id: "health", title: "Health & Mind", icon: Heart },
  { id: "life", title: "Life Skills", icon: Lightbulb },
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
  const { lastActiveRoadmap, updateLastActiveRoadmap } = useStreaks();

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

  const filteredCategories = useMemo(() => {
    if (!mainSearchQuery.trim()) return categories;
    const query = mainSearchQuery.toLowerCase();
    return categories.filter(c => c.title.toLowerCase().includes(query));
  }, [mainSearchQuery]);

  // Category detail view
  if (selectedCategory) {
    const category = categories.find((c) => c.id === selectedCategory);

    return (
      <div className="px-5 pt-4 pb-8 animate-fade-in">
        {/* Minimal back button */}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setSearchQuery("");
          }}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Clean header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">{category?.title}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {filteredData.roadmaps.length} courses · {filteredData.snippets.length} snippets
          </p>
        </header>

        {/* Subtle search */}
        <div className="relative mb-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-secondary/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30 placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Courses */}
        <section className="mb-10">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Courses</h2>
          <div className="space-y-3">
            {filteredData.roadmaps.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No courses found</p>
            ) : (
              filteredData.roadmaps.map((roadmap, index) => {
                const progress = roadmap.lessonsCount > 0 ? (roadmap.completedLessons / roadmap.lessonsCount) * 100 : 0;
                return (
                  <Card key={index} className="border-0 bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-[15px] leading-snug">{roadmap.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{roadmap.description}</p>
                          
                          <div className="mt-3 flex items-center gap-3">
                            <Progress value={progress} className="h-1 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0">
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant={roadmap.completedLessons > 0 ? "default" : "secondary"}
                          className="shrink-0 h-8 px-4 text-xs font-medium"
                          onClick={() => {
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
                          {roadmap.completedLessons > 0 ? "Continue" : "Start"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </section>

        {/* Snippets */}
        <section>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Quick Reads</h2>
          <div className="space-y-2">
            {filteredData.snippets.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No snippets found</p>
            ) : (
              filteredData.snippets.map((snippet, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-primary/80 font-medium">{snippet.topic}</span>
                    <h4 className="font-medium text-foreground text-sm leading-snug">{snippet.title}</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    );
  }

  // Main view
  const getContinueRoadmap = () => {
    if (!lastActiveRoadmap) return null;
    const category = categories.find(c => c.id === lastActiveRoadmap.categoryId);
    const roadmap = roadmapsByCategory[lastActiveRoadmap.categoryId]?.[lastActiveRoadmap.roadmapIndex];
    if (!category || !roadmap) return null;
    return { category, roadmap, ...lastActiveRoadmap };
  };

  const continueRoadmap = getContinueRoadmap();

  return (
    <div className="px-5 pt-4 pb-8 animate-fade-in">
      {/* Clean header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Learn</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Pick a path that excites you</p>
      </header>

      {/* Subtle search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
        <Input
          type="text"
          placeholder="Search topics..."
          value={mainSearchQuery}
          onChange={(e) => setMainSearchQuery(e.target.value)}
          className="pl-10 h-11 bg-secondary/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30 placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Pick up where you left off - Premium card */}
      <div className="mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-accent/10 p-4 border border-primary/10">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Play className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-primary">Continue Learning</span>

              {continueRoadmap ? (
                <>
                  <h3 className="font-medium text-foreground mt-0.5 text-[15px] leading-snug">
                    {continueRoadmap.roadmap.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {continueRoadmap.unitTitle}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <Progress
                      value={(continueRoadmap.roadmap.completedLessons / continueRoadmap.roadmap.lessonsCount) * 100}
                      className="h-1 flex-1"
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {Math.round((continueRoadmap.roadmap.completedLessons / continueRoadmap.roadmap.lessonsCount) * 100)}%
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground mt-0.5">
                  Start a course to track your progress
                </p>
              )}
            </div>

            {continueRoadmap && (
              <Button
                size="sm"
                className="shrink-0 h-8 px-4 text-xs font-medium"
                onClick={() => setSelectedCategory(continueRoadmap.categoryId)}
              >
                Resume
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Category grid - Clean & minimal */}
      <section>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Browse Topics</h2>
        
        {filteredCategories.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No topics found</p>
        ) : (
          <div id="roadmap-categories" className="grid grid-cols-2 gap-3">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className={cn(
                    "flex flex-col items-start p-4 rounded-xl text-left",
                    "bg-secondary/20 hover:bg-secondary/35 transition-all duration-200",
                    "active:scale-[0.98] group"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
