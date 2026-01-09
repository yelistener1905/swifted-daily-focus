import { SnippetCard } from "@/components/learning/SnippetCard";

const snippets = [
  {
    title: "Why We Procrastinate (And How to Stop)",
    description: "The psychology behind delay isn't laziness—it's emotional regulation. Learn the science of why your brain avoids tasks.",
    topic: "Psychology",
    readTime: "4 min",
  },
  {
    title: "The Rule of 72: Mental Math for Money",
    description: "A simple trick to estimate how long it takes to double your investment. Used by investors for decades.",
    topic: "Finance",
    readTime: "3 min",
  },
  {
    title: "How AI Is Changing Creative Work",
    description: "From art generation to music composition, artificial intelligence is reshaping how humans create.",
    topic: "Tech",
    readTime: "5 min",
  },
  {
    title: "The Stoic Practice of Negative Visualization",
    description: "Ancient philosophers used this technique to reduce anxiety and increase gratitude. Here's how it works.",
    topic: "Philosophy",
    readTime: "4 min",
  },
  {
    title: "Why the Sky Is Blue (And Sunsets Are Red)",
    description: "Light scattering explained simply. Understand Rayleigh scattering in under 5 minutes.",
    topic: "Science",
    readTime: "3 min",
  },
  {
    title: "The History of Coffee: From Ethiopia to Espresso",
    description: "How a goat herder's discovery became the world's most popular drink and shaped global trade.",
    topic: "History",
    readTime: "5 min",
  },
  {
    title: "First Principles Thinking Explained",
    description: "The mental model used by Elon Musk and other innovators to solve complex problems from scratch.",
    topic: "Thinking Tools",
    readTime: "4 min",
  },
  {
    title: "Why Japan Has So Many Vending Machines",
    description: "Cultural, economic, and safety factors that made Japan the vending machine capital of the world.",
    topic: "Culture",
    readTime: "3 min",
  },
];

export default function HomePage() {
  return (
    <div className="px-5 pt-12 pb-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <p className="text-muted-foreground text-sm mb-1">Your daily feed</p>
        <h1 className="text-2xl font-bold text-foreground">
          Learn something new
        </h1>
      </header>

      {/* Snippet Feed */}
      <div className="space-y-4">
        {snippets.map((snippet, index) => (
          <SnippetCard
            key={index}
            {...snippet}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
