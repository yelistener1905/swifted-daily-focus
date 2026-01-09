import { LessonCard } from "@/components/learning/LessonCard";

const continueLearning = [
  {
    title: "Understanding React Hooks in Depth",
    category: "React",
    duration: "8 min",
    progress: 65,
  },
  {
    title: "Mastering TypeScript Generics",
    category: "TypeScript",
    duration: "12 min",
    progress: 30,
  },
];

const forYou = [
  {
    title: "Introduction to System Design",
    category: "Architecture",
    duration: "15 min",
  },
  {
    title: "CSS Grid Layout Fundamentals",
    category: "CSS",
    duration: "10 min",
  },
  {
    title: "Building REST APIs with Node.js",
    category: "Backend",
    duration: "18 min",
  },
];

export default function HomePage() {
  return (
    <div className="px-5 pt-12 pb-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <p className="text-muted-foreground text-sm mb-1">Good morning</p>
        <h1 className="text-2xl font-bold text-foreground">
          Ready to learn?
        </h1>
      </header>

      {/* Continue Learning */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Continue Learning</h2>
        <div className="space-y-3">
          {continueLearning.map((lesson, index) => (
            <LessonCard
              key={index}
              {...lesson}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>

      {/* For You */}
      <section>
        <h2 className="section-title mb-4">For You</h2>
        <div className="space-y-3">
          {forYou.map((lesson, index) => (
            <LessonCard
              key={index}
              {...lesson}
              className="animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
