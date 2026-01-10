import { RoadmapCard } from "@/components/learning/RoadmapCard";

const activeRoadmaps = [
  {
    title: "Personal Finance Mastery",
    description: "Build wealth through budgeting, investing, and smart money decisions.",
    lessonsCount: 18,
    completedLessons: 7,
  },
  {
    title: "Critical Thinking",
    description: "Sharpen your reasoning skills and avoid common logical fallacies.",
    lessonsCount: 12,
    completedLessons: 4,
  },
];

const exploreRoadmaps = [
  {
    title: "Effective Communication",
    description: "Master public speaking, persuasion, and meaningful conversations.",
    lessonsCount: 15,
    completedLessons: 0,
  },
  {
    title: "Psychology Basics",
    description: "Understand human behavior, cognitive biases, and emotional intelligence.",
    lessonsCount: 20,
    completedLessons: 0,
  },
  {
    title: "Business & Startups",
    description: "From ideation to execution—learn what it takes to build something.",
    lessonsCount: 22,
    completedLessons: 0,
  },
  {
    title: "Tech Literacy",
    description: "Demystify AI, blockchain, and the technology shaping our world.",
    lessonsCount: 14,
    completedLessons: 0,
  },
  {
    title: "Health & Habits",
    description: "Science-backed strategies for sleep, exercise, nutrition, and routines.",
    lessonsCount: 16,
    completedLessons: 0,
  },
  {
    title: "Philosophy for Life",
    description: "Ancient wisdom and modern philosophy for better decision-making.",
    lessonsCount: 18,
    completedLessons: 0,
  },
];

export default function RoadmapsPage() {
  return (
    <div className="px-5 pt-8 pb-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">
          Learning Paths
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Structured journeys to master new topics
        </p>
      </header>

      {/* Active Roadmaps */}
      {activeRoadmaps.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title mb-4">In Progress</h2>
          <div className="space-y-3">
            {activeRoadmaps.map((roadmap, index) => (
              <RoadmapCard
                key={index}
                {...roadmap}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Explore */}
      <section>
        <h2 className="section-title mb-4">Explore Topics</h2>
        <div className="space-y-3">
          {exploreRoadmaps.map((roadmap, index) => (
            <RoadmapCard
              key={index}
              {...roadmap}
              className="animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
