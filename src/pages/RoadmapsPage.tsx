import { useState } from "react";
import { ArrowLeft, Beaker, Cpu, DollarSign, MessageCircle, Heart, Lightbulb, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

export default function RoadmapsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    const category = categories.find((c) => c.id === selectedCategory);
    const roadmaps = roadmapsByCategory[selectedCategory] || [];

    return (
      <div className="px-5 pt-8 pb-6 animate-fade-in">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to categories</span>
        </button>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">{category?.title}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {roadmaps.length} learning paths available
          </p>
        </header>

        <div className="space-y-4">
          {roadmaps.map((roadmap, index) => {
            const progress = roadmap.lessonsCount > 0 ? (roadmap.completedLessons / roadmap.lessonsCount) * 100 : 0;
            return (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{roadmap.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{roadmap.description}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{roadmap.completedLessons} / {roadmap.lessonsCount} lessons</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                  <Button size="sm" className="mt-3 w-full">
                    {roadmap.completedLessons > 0 ? "Continue" : "Start Learning"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Learning Paths</h1>
        <p className="text-muted-foreground text-sm mt-1">Choose a category to explore</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={cn(
                "cursor-pointer hover:border-primary/50 transition-all duration-200 overflow-hidden group"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className={cn("p-4 bg-gradient-to-br", category.color)}>
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
