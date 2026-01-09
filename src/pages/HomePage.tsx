import { SnippetCard } from "@/components/learning/SnippetCard";

const snippets = [
  {
    topic: "Psychology",
    title: "Why We Procrastinate",
    explanation: "Procrastination isn't about laziness—it's emotional regulation. When a task feels threatening (boring, hard, or tied to self-worth), your brain prioritizes short-term mood repair over long-term goals. The amygdala hijacks your prefrontal cortex, making 'later' feel safer than 'now.'",
    example: "You avoid starting a work report not because you can't do it, but because the thought of failing triggers anxiety. Scrolling social media numbs that feeling temporarily—even though it makes things worse later.",
    readTime: "4 min",
  },
  {
    topic: "Finance",
    title: "The Rule of 72",
    explanation: "The Rule of 72 is a mental math shortcut to estimate how long it takes for an investment to double. Simply divide 72 by your expected annual return rate. This approximation works surprisingly well for returns between 5% and 15%.",
    example: "If you invest in an index fund earning 8% annually, your money doubles in roughly 72 ÷ 8 = 9 years. At 12% returns, it doubles in just 6 years. This helps you quickly compare investment options.",
    readTime: "3 min",
  },
  {
    topic: "Tech",
    title: "How AI Learns from Data",
    explanation: "Machine learning models don't 'understand' like humans do. They find statistical patterns in massive datasets. A language model predicts the next word based on billions of examples of human text. It's pattern recognition at an unprecedented scale—powerful, but fundamentally different from reasoning.",
    example: "When ChatGPT writes a poem, it's not feeling creative. It's predicting which words statistically follow 'roses are red' based on millions of similar patterns it has seen during training.",
    readTime: "5 min",
  },
  {
    topic: "Philosophy",
    title: "Negative Visualization",
    explanation: "The Stoics practiced 'premeditatio malorum'—imagining worst-case scenarios not to worry, but to prepare emotionally and appreciate what you have. By briefly visualizing loss, you reduce its power over you and cultivate gratitude for the present moment.",
    example: "Before a job interview, instead of just hoping for success, briefly imagine being rejected. This reduces anxiety (you've 'survived' it mentally) and helps you perform more freely, with less fear of the outcome.",
    readTime: "4 min",
  },
  {
    topic: "Science",
    title: "Why the Sky Is Blue",
    explanation: "Sunlight contains all colors. As it passes through Earth's atmosphere, shorter wavelengths (blue) scatter more than longer ones (red). This is called Rayleigh scattering. During sunset, light travels through more atmosphere, scattering away blue light and leaving warm reds and oranges.",
    example: "On the Moon, with no atmosphere to scatter light, the sky is always black—even during 'daytime.' Astronauts see stars in the sky while standing in direct sunlight.",
    readTime: "3 min",
  },
  {
    topic: "Thinking Tools",
    title: "First Principles Thinking",
    explanation: "Instead of reasoning by analogy (copying what others do), first principles thinking breaks problems down to fundamental truths and builds up from there. It's slower but leads to breakthrough solutions because you're not constrained by existing assumptions.",
    example: "Elon Musk didn't accept that batteries are expensive. He asked: what are batteries made of? Those raw materials cost much less than finished batteries. This revealed that manufacturing, not materials, was the real cost driver—leading to new approaches.",
    readTime: "4 min",
  },
];

export default function HomePage() {
  return (
    <div className="h-[calc(100svh-4rem)] overflow-hidden">
      {/* Header */}
      <header className="px-5 pt-8 pb-4 animate-fade-in">
        <p className="text-muted-foreground text-sm mb-1">Your daily feed</p>
        <h1 className="text-xl font-bold text-foreground">
          Learn something new
        </h1>
      </header>

      {/* Snippet Feed */}
      <div className="snippet-feed h-[calc(100svh-10rem)] px-5 pb-4">
        <div className="space-y-5">
          {snippets.map((snippet, index) => (
            <SnippetCard
              key={index}
              {...snippet}
              isLast={index === snippets.length - 1}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
