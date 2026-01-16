import { useState } from "react";
import { Compass, BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExploreQuiz } from "@/components/explore/ExploreQuiz";
import { Quick101Reader } from "@/components/explore/Quick101Reader";

const quick101Packs = [
  {
    id: "tech-ai",
    title: "Tech & AI 101",
    description: "Understand the technology shaping our future",
    snippetCount: 10,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "money-finance",
    title: "Money & Finance 101",
    description: "Master the basics of personal finance",
    snippetCount: 10,
    color: "from-emerald-500/20 to-green-500/20",
  },
  {
    id: "health-mind",
    title: "Health & Mind 101",
    description: "Build habits for physical and mental wellness",
    snippetCount: 10,
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: "life-skills",
    title: "Life Skills 101",
    description: "Essential skills for everyday success",
    snippetCount: 10,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "science-nature",
    title: "Science & Nature 101",
    description: "Explore the wonders of our world",
    snippetCount: 10,
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "languages-comm",
    title: "Languages & Communication 101",
    description: "Become a more effective communicator",
    snippetCount: 10,
    color: "from-teal-500/20 to-cyan-500/20",
  },
];

export default function ExplorePage() {
  const [showExploreQuiz, setShowExploreQuiz] = useState(false);
  const [activeQuick101, setActiveQuick101] = useState<string | null>(null);

  if (showExploreQuiz) {
    return <ExploreQuiz onClose={() => setShowExploreQuiz(false)} />;
  }

  if (activeQuick101) {
    const pack = quick101Packs.find((p) => p.id === activeQuick101);
    return (
      <Quick101Reader
        packId={activeQuick101}
        packTitle={pack?.title || ""}
        onClose={() => setActiveQuick101(null)}
      />
    );
  }

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-in">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Explore</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Discover your learning path
        </p>
      </header>

      {/* Explore Quiz Section */}
      <section className="mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/20 border-primary/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  Find Your Perfect Roadmap
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Take a 20-question quiz to discover personalized learning paths
                  tailored to your interests and goals.
                </p>
                <Button
                  onClick={() => setShowExploreQuiz(true)}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Take the Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick 101 Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="section-title">Quick 101</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Bite-sized introductions to explore new topics
        </p>

        <div className="grid grid-cols-1 gap-3">
          {quick101Packs.map((pack) => (
            <Card
              key={pack.id}
              className="cursor-pointer hover:border-primary/50 transition-all duration-200 group"
              onClick={() => setActiveQuick101(pack.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {pack.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {pack.description}
                    </p>
                    <span className="text-xs text-muted-foreground mt-2 inline-block">
                      {pack.snippetCount} snippets
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
