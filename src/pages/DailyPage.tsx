import { DailyGoalCard } from "@/components/learning/DailyGoalCard";
import { LessonCard } from "@/components/learning/LessonCard";

const todaysGoals = [
  { title: "Complete 1 lesson", subtitle: "React Hooks", completed: true },
  { title: "Read for 10 minutes", subtitle: "Any topic", completed: false },
  { title: "Review flashcards", subtitle: "5 cards remaining", completed: false },
];

const scheduledLessons = [
  {
    title: "State Management Patterns",
    category: "React",
    duration: "14 min",
  },
  {
    title: "Database Design Basics",
    category: "SQL",
    duration: "20 min",
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
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>

      {/* Scheduled Lessons */}
      <section>
        <h2 className="section-title mb-4">Scheduled</h2>
        <div className="space-y-3">
          {scheduledLessons.map((lesson, index) => (
            <LessonCard
              key={index}
              {...lesson}
              className="animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
