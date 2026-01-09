import { RoadmapCard } from "@/components/learning/RoadmapCard";

const activeRoadmaps = [
  {
    title: "Frontend Development",
    description: "Master modern web development with React, TypeScript, and CSS.",
    lessonsCount: 24,
    completedLessons: 8,
  },
  {
    title: "Backend Fundamentals",
    description: "Learn server-side programming, APIs, and databases.",
    lessonsCount: 18,
    completedLessons: 3,
  },
];

const exploreRoadmaps = [
  {
    title: "System Design",
    description: "Design scalable systems and understand architecture patterns.",
    lessonsCount: 15,
    completedLessons: 0,
  },
  {
    title: "Data Structures & Algorithms",
    description: "Build a strong foundation in computer science fundamentals.",
    lessonsCount: 30,
    completedLessons: 0,
  },
  {
    title: "Mobile Development",
    description: "Create cross-platform mobile apps with React Native.",
    lessonsCount: 20,
    completedLessons: 0,
  },
];

export default function RoadmapsPage() {
  return (
    <div className="px-5 pt-12 pb-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">
          Learning Paths
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Structured courses to guide your learning
        </p>
      </header>

      {/* Active Roadmaps */}
      <section className="mb-8">
        <h2 className="section-title mb-4">In Progress</h2>
        <div className="space-y-3">
          {activeRoadmaps.map((roadmap, index) => (
            <RoadmapCard
              key={index}
              {...roadmap}
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>

      {/* Explore */}
      <section>
        <h2 className="section-title mb-4">Explore</h2>
        <div className="space-y-3">
          {exploreRoadmaps.map((roadmap, index) => (
            <RoadmapCard
              key={index}
              {...roadmap}
              style={{ animationDelay: `${(index + 2) * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
