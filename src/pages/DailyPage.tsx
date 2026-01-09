import { DailyGoalCard } from "@/components/learning/DailyGoalCard";
import { BookOpen } from "lucide-react";

const todaysGoals = [
  { title: "Read 1 snippet", subtitle: "Any topic", completed: true },
  { title: "Learn for 10 minutes", subtitle: "Stay curious", completed: false },
  { title: "Explore a new topic", subtitle: "Try something different", completed: false },
];

const savedSnippets = [
  {
    topic: "Finance",
    title: "The Power of Compound Interest",
    readTime: "4 min",
  },
  {
    topic: "Science",
    title: "Why We Dream: Theories Explained",
    readTime: "5 min",
  },
];

export default function DailyPage() {
  const completedCount = todaysGoals.filter(g => g.completed).length;
  const totalGoals = todaysGoals.length;
  const progress = Math.round((completedCount / totalGoals) * 100);

  return (
    <div className="px-5 pt-12 pb-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Today's Plan
        </h1>
        <div className="flex items-center gap-3">
          <div className="progress-bar flex-1">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm text-primary font-medium">
            {completedCount}/{totalGoals}
          </span>
        </div>
      </header>

      {/* Today's Goals */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Goals</h2>
        <div className="space-y-3">
          {todaysGoals.map((goal, index) => (
            <DailyGoalCard
              key={index}
              {...goal}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </section>

      {/* Saved Snippets */}
      <section>
        <h2 className="section-title mb-4">Saved for Later</h2>
        <div className="space-y-3">
          {savedSnippets.map((snippet, index) => (
            <article 
              key={index}
              className="learning-card animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="tag">{snippet.topic}</span>
                <span className="text-xs text-muted-foreground">{snippet.readTime}</span>
              </div>
              <h3 className="font-semibold text-foreground leading-snug mb-3">
                {snippet.title}
              </h3>
              <button className="flex items-center gap-2 text-primary text-sm font-medium hover:opacity-80 transition-opacity">
                <BookOpen size={16} />
                <span>Read Snippet</span>
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
