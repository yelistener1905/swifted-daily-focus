import { useState } from "react";
import { ChevronLeft, ChevronRight, HelpCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const snippets = [
  {
    topic: "Psychology",
    title: "Why We Procrastinate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    content: `Procrastination isn't about laziness—it's emotional regulation. When a task feels threatening (boring, hard, or tied to self-worth), your brain prioritizes short-term mood repair over long-term goals. The amygdala hijacks your prefrontal cortex, making "later" feel safer than "now."

This is why willpower alone rarely works. The real solution involves reducing the emotional threat of the task. Break it into smaller pieces. Remove friction. Create a starting ritual. The goal isn't motivation—it's making the first step so small that your brain doesn't register it as threatening.

Research shows that self-compassion is more effective than self-criticism for beating procrastination. When you shame yourself for procrastinating, you increase the negative emotions associated with the task, making future procrastination more likely. Instead, acknowledge the struggle without judgment and gently redirect yourself.

The 2-minute rule is powerful: if something takes less than 2 minutes, do it now. For larger tasks, commit to working for just 2 minutes. Often, starting is the hardest part, and momentum carries you forward once you begin.`,
    example: "You avoid starting a work report not because you can't do it, but because the thought of failing triggers anxiety. Scrolling social media numbs that feeling temporarily—even though it makes things worse later.",
  },
  {
    topic: "Finance",
    title: "The Rule of 72",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    content: `The Rule of 72 is a mental math shortcut to estimate how long it takes for an investment to double. Simply divide 72 by your expected annual return rate. This approximation works surprisingly well for returns between 5% and 15%.

Understanding this rule changes how you think about money over time. It reveals why starting early matters so much—not because of the initial amount, but because of the doubling periods you gain. A 25-year-old has roughly 8-10 doubling periods before retirement; a 45-year-old has only 4-5.

The rule also works in reverse: divide 72 by the number of years to find the required return rate. Want to double your money in 6 years? You need about 12% annual returns. This helps set realistic expectations and evaluate investment options.

Inflation works against you using the same math. At 3% inflation, your purchasing power halves in 24 years. This is why leaving money in a low-interest savings account actually loses value over time—and why investing isn't optional for long-term financial health.`,
    example: "If you invest in an index fund earning 8% annually, your money doubles in roughly 72 ÷ 8 = 9 years. At 12% returns, it doubles in just 6 years. This helps you quickly compare investment options.",
  },
  {
    topic: "Science",
    title: "Why the Sky Is Blue",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=400&fit=crop",
    content: `Sunlight contains all colors of the visible spectrum. As it passes through Earth's atmosphere, shorter wavelengths (blue and violet) scatter more than longer ones (red and orange). This phenomenon is called Rayleigh scattering, named after the British physicist Lord Rayleigh who first explained it in the 1870s.

You might wonder why the sky isn't violet, since violet has an even shorter wavelength than blue. Two reasons: the sun emits less violet light than blue, and our eyes are more sensitive to blue. The combination makes the sky appear blue rather than violet.

During sunset, light travels through more atmosphere to reach your eyes. Most blue light scatters away before arriving, leaving the longer wavelengths—reds and oranges—to dominate the sky. This is also why sunsets are more vivid in areas with particles in the air, like dust or pollution.

On the Moon, with no atmosphere to scatter light, the sky is always black—even during "daytime." Astronauts see stars while standing in direct sunlight. Mars has a thin atmosphere with different particles, creating a butterscotch-colored sky during the day and blue sunsets—the opposite of Earth.`,
    example: "On the Moon, with no atmosphere to scatter light, the sky is always black—even during 'daytime.' Astronauts see stars in the sky while standing in direct sunlight.",
  },
  {
    topic: "Philosophy",
    title: "Negative Visualization",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    content: `The Stoics practiced "premeditatio malorum"—imagining worst-case scenarios not to worry, but to prepare emotionally and appreciate what you have. By briefly visualizing loss, you reduce its power over you and cultivate gratitude for the present moment.

This isn't pessimism; it's psychological preparation. When you've already "survived" something mentally, the real event loses some of its sting. Athletes use this technique before competitions. Executives use it before difficult negotiations. The Stoics used it for life itself.

The practice also reveals what truly matters to you. When you imagine losing your health, relationships, or freedoms, you clarify your priorities. You stop taking things for granted. You become more present and appreciative—not because you're anxious, but because you're aware.

Modern psychology confirms this ancient wisdom. Research on "defensive pessimism" shows that anxious people who imagine setbacks actually perform better than those who try to think positively. The key is brief, controlled visualization—not obsessive worry. Spend a few minutes, not hours, and then return to action.`,
    example: "Before a job interview, instead of just hoping for success, briefly imagine being rejected. This reduces anxiety (you've 'survived' it mentally) and helps you perform more freely, with less fear of the outcome.",
  },
  {
    topic: "Tech",
    title: "How AI Learns from Data",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    content: `Machine learning models don't "understand" like humans do. They find statistical patterns in massive datasets. A language model predicts the next word based on billions of examples of human text. It's pattern recognition at an unprecedented scale—powerful, but fundamentally different from reasoning.

Training works through iteration. The model makes predictions, compares them to correct answers, and adjusts its internal parameters to reduce errors. Repeat this billions of times across enormous datasets, and patterns emerge that seem intelligent. But there's no comprehension—only correlation.

This has important implications. AI excels at tasks with clear patterns and abundant data: translation, image recognition, code generation. It struggles with novel situations, common sense reasoning, and understanding context the way humans do. It can produce text that sounds confident but is completely wrong.

The "black box" problem remains unsolved. We often can't explain why a model made a specific decision. This matters in high-stakes domains like healthcare or criminal justice. Understanding AI's limitations is as important as appreciating its capabilities—especially as it becomes more integrated into society.`,
    example: "When ChatGPT writes a poem, it's not feeling creative. It's predicting which words statistically follow 'roses are red' based on millions of similar patterns it has seen during training.",
  },
  {
    topic: "Business",
    title: "First Principles Thinking",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: `Instead of reasoning by analogy (copying what others do), first principles thinking breaks problems down to fundamental truths and builds up from there. It's slower but leads to breakthrough solutions because you're not constrained by existing assumptions.

Most people reason by analogy: "This is how it's always been done" or "Our competitors do it this way." This is efficient for routine decisions but terrible for innovation. You inherit other people's limitations along with their solutions.

First principles asks: What do we know to be absolutely true? What are the fundamental constraints? Everything else is assumption, open to challenge. This approach requires more mental effort but reveals possibilities that analogical thinking misses entirely.

The technique works across domains. In personal finance, instead of accepting "you need a 20% down payment," ask what problem the down payment solves and whether there are other solutions. In career planning, instead of following the standard path, ask what you actually need to achieve your goals. The answers often surprise you.`,
    example: "Elon Musk didn't accept that batteries are expensive. He asked: what are batteries made of? Those raw materials cost much less than finished batteries. This revealed that manufacturing, not materials, was the real cost driver.",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const snippet = snippets[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(snippets.length - 1, prev + 1));
  };

  return (
    <div className="h-[calc(100svh-4rem)] flex flex-col bg-background">
      {/* Snippet Content */}
      <div className="flex-1 overflow-y-auto">
        <article className="animate-fade-in" key={currentIndex}>
          {/* Hero Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={snippet.image}
              alt={snippet.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            {/* Topic Tag on Image */}
            <div className="absolute bottom-4 left-5">
              <span className="tag">{snippet.topic}</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pt-4 pb-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground leading-tight mb-6">
              {snippet.title}
            </h1>

            {/* Main Content */}
            <div className="prose prose-invert max-w-none mb-6">
              {snippet.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-[15px] text-secondary-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Example Block */}
            <div className="example-block mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Example
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {snippet.example}
              </p>
            </div>

            {/* Quiz Button */}
            <button className="quiz-button">
              <HelpCircle size={18} />
              <span>Take Quick Quiz</span>
            </button>
          </div>
        </article>
      </div>

      {/* Navigation Bar */}
      <div className="sticky bottom-0 flex items-center justify-between px-5 py-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-all",
            currentIndex === 0
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        {/* Progress Indicator */}
        <div className="flex items-center gap-1.5">
          {snippets.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                idx === currentIndex ? "bg-primary w-4" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === snippets.length - 1}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-all",
            currentIndex === snippets.length - 1
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
