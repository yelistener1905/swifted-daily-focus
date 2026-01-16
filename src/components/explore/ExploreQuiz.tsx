import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExploreQuizProps {
  onClose: () => void;
}

const quizQuestions = [
  {
    question: "What excites you most about learning?",
    options: [
      { text: "Understanding how things work", tags: ["tech", "science"] },
      { text: "Improving my daily life", tags: ["health", "life"] },
      { text: "Building wealth and security", tags: ["finance"] },
      { text: "Connecting with others", tags: ["communication"] },
    ],
  },
  {
    question: "How do you prefer to spend your free time?",
    options: [
      { text: "Reading about new discoveries", tags: ["science", "tech"] },
      { text: "Working on personal projects", tags: ["life", "tech"] },
      { text: "Exercising or meditating", tags: ["health"] },
      { text: "Socializing or networking", tags: ["communication", "finance"] },
    ],
  },
  {
    question: "Which topic would you like to master first?",
    options: [
      { text: "Artificial Intelligence", tags: ["tech"] },
      { text: "Personal Finance", tags: ["finance"] },
      { text: "Psychology & Mindset", tags: ["health", "life"] },
      { text: "Public Speaking", tags: ["communication"] },
    ],
  },
  {
    question: "What's your biggest challenge right now?",
    options: [
      { text: "Staying updated with technology", tags: ["tech"] },
      { text: "Managing money better", tags: ["finance"] },
      { text: "Building healthy habits", tags: ["health"] },
      { text: "Communicating effectively", tags: ["communication"] },
    ],
  },
  {
    question: "Which career path interests you most?",
    options: [
      { text: "Tech & Engineering", tags: ["tech", "science"] },
      { text: "Business & Finance", tags: ["finance", "life"] },
      { text: "Healthcare & Wellness", tags: ["health"] },
      { text: "Media & Communication", tags: ["communication"] },
    ],
  },
  {
    question: "How do you approach problem-solving?",
    options: [
      { text: "Analytically with data", tags: ["tech", "science"] },
      { text: "Creatively with intuition", tags: ["life", "communication"] },
      { text: "Systematically with planning", tags: ["finance", "life"] },
      { text: "Collaboratively with others", tags: ["communication", "health"] },
    ],
  },
  {
    question: "What skill would boost your career most?",
    options: [
      { text: "Technical skills", tags: ["tech"] },
      { text: "Financial literacy", tags: ["finance"] },
      { text: "Leadership abilities", tags: ["life", "communication"] },
      { text: "Critical thinking", tags: ["science", "life"] },
    ],
  },
  {
    question: "Which content do you consume most?",
    options: [
      { text: "Tech news & podcasts", tags: ["tech"] },
      { text: "Finance & investing content", tags: ["finance"] },
      { text: "Health & fitness videos", tags: ["health"] },
      { text: "Self-improvement books", tags: ["life", "communication"] },
    ],
  },
  {
    question: "What's your learning style?",
    options: [
      { text: "Visual with diagrams", tags: ["tech", "science"] },
      { text: "Reading in-depth articles", tags: ["finance", "life"] },
      { text: "Practical hands-on", tags: ["health", "tech"] },
      { text: "Discussion and debate", tags: ["communication"] },
    ],
  },
  {
    question: "Which achievement would make you proudest?",
    options: [
      { text: "Building something innovative", tags: ["tech"] },
      { text: "Achieving financial freedom", tags: ["finance"] },
      { text: "Peak physical health", tags: ["health"] },
      { text: "Inspiring others", tags: ["communication", "life"] },
    ],
  },
  {
    question: "What frustrates you about current education?",
    options: [
      { text: "Outdated technology focus", tags: ["tech"] },
      { text: "No practical money skills", tags: ["finance"] },
      { text: "Ignores mental health", tags: ["health"] },
      { text: "Poor communication training", tags: ["communication"] },
    ],
  },
  {
    question: "Which industry trend interests you most?",
    options: [
      { text: "AI and automation", tags: ["tech"] },
      { text: "Cryptocurrency & fintech", tags: ["finance", "tech"] },
      { text: "Wellness & longevity", tags: ["health", "science"] },
      { text: "Remote work & collaboration", tags: ["communication", "life"] },
    ],
  },
  {
    question: "How do you define success?",
    options: [
      { text: "Innovation & impact", tags: ["tech", "science"] },
      { text: "Wealth & security", tags: ["finance"] },
      { text: "Health & happiness", tags: ["health", "life"] },
      { text: "Influence & connection", tags: ["communication"] },
    ],
  },
  {
    question: "What's your ideal weekend activity?",
    options: [
      { text: "Exploring new tech", tags: ["tech"] },
      { text: "Managing investments", tags: ["finance"] },
      { text: "Outdoor activities", tags: ["health", "science"] },
      { text: "Social gatherings", tags: ["communication", "life"] },
    ],
  },
  {
    question: "Which superpower would you choose?",
    options: [
      { text: "Instant knowledge download", tags: ["tech", "science"] },
      { text: "Perfect financial foresight", tags: ["finance"] },
      { text: "Unlimited energy", tags: ["health"] },
      { text: "Telepathic communication", tags: ["communication"] },
    ],
  },
  {
    question: "What's your approach to risk?",
    options: [
      { text: "Calculated experimentation", tags: ["tech", "science"] },
      { text: "Strategic investment", tags: ["finance"] },
      { text: "Balanced lifestyle", tags: ["health", "life"] },
      { text: "Trust in relationships", tags: ["communication"] },
    ],
  },
  {
    question: "Which historical figure inspires you?",
    options: [
      { text: "Innovators like Elon Musk", tags: ["tech"] },
      { text: "Investors like Warren Buffett", tags: ["finance"] },
      { text: "Athletes like Michael Jordan", tags: ["health"] },
      { text: "Leaders like Martin Luther King", tags: ["communication", "life"] },
    ],
  },
  {
    question: "What's your morning routine priority?",
    options: [
      { text: "Checking tech news", tags: ["tech"] },
      { text: "Reviewing markets", tags: ["finance"] },
      { text: "Exercise or meditation", tags: ["health"] },
      { text: "Journaling or planning", tags: ["life", "communication"] },
    ],
  },
  {
    question: "Which skill gap concerns you most?",
    options: [
      { text: "Technical proficiency", tags: ["tech"] },
      { text: "Money management", tags: ["finance"] },
      { text: "Work-life balance", tags: ["health", "life"] },
      { text: "Networking abilities", tags: ["communication"] },
    ],
  },
  {
    question: "Where do you see yourself in 5 years?",
    options: [
      { text: "Leading a tech team", tags: ["tech"] },
      { text: "Financially independent", tags: ["finance"] },
      { text: "Healthiest version of myself", tags: ["health"] },
      { text: "A respected thought leader", tags: ["communication", "life"] },
    ],
  },
];

const recommendedRoadmaps = {
  tech: [
    { title: "AI & Machine Learning Fundamentals", description: "Understand artificial intelligence and its applications" },
    { title: "Web Development Essentials", description: "Build modern websites and web applications" },
    { title: "Cybersecurity Basics", description: "Protect yourself and others in the digital world" },
  ],
  finance: [
    { title: "Personal Finance Mastery", description: "Build wealth through budgeting, investing, and smart money decisions" },
    { title: "Investing for Beginners", description: "Learn stocks, bonds, ETFs, and portfolio management" },
    { title: "Cryptocurrency & Blockchain", description: "Navigate the world of digital currencies" },
  ],
  health: [
    { title: "Nutrition & Diet Science", description: "Fuel your body with evidence-based nutrition" },
    { title: "Mental Wellness", description: "Build resilience, manage stress, and thrive" },
    { title: "Fitness Fundamentals", description: "Exercise science for lasting health" },
  ],
  communication: [
    { title: "Public Speaking Mastery", description: "Command any room with confidence" },
    { title: "Persuasion & Influence", description: "Communicate to inspire action" },
    { title: "Writing That Connects", description: "Craft compelling written communication" },
  ],
  science: [
    { title: "Physics for Curious Minds", description: "Understand the laws that govern our universe" },
    { title: "Biology Essentials", description: "Explore life from cells to ecosystems" },
    { title: "Environmental Science", description: "Understand and protect our planet" },
  ],
  life: [
    { title: "Productivity Systems", description: "Master your time and energy" },
    { title: "Critical Thinking", description: "Sharpen your reasoning and decision-making" },
    { title: "Emotional Intelligence", description: "Navigate relationships with empathy" },
  ],
};

export function ExploreQuiz({ onClose }: ExploreQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [showResults, setShowResults] = useState(false);

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const selectedTags = question.options[selectedOption].tags;
    setAnswers([...answers, selectedTags]);

    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const getTopRoadmaps = () => {
    const tagCounts: Record<string, number> = {};
    answers.flat().forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    const roadmaps: Array<{ title: string; description: string; category: string }> = [];
    sortedTags.forEach((tag) => {
      const categoryRoadmaps = recommendedRoadmaps[tag as keyof typeof recommendedRoadmaps] || [];
      categoryRoadmaps.forEach((rm) => {
        if (roadmaps.length < 3 && !roadmaps.find((r) => r.title === rm.title)) {
          roadmaps.push({ ...rm, category: tag });
        }
      });
    });

    return roadmaps;
  };

  if (showResults) {
    const topRoadmaps = getTopRoadmaps();

    return (
      <div className="min-h-screen bg-background px-5 py-8 animate-fade-in">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Quiz Complete!</h1>
          <p className="text-muted-foreground mt-2">
            Based on your answers, here are your recommended roadmaps
          </p>
        </header>

        <section className="space-y-4 mb-8">
          <h2 className="section-title">Your Recommended Roadmaps</h2>
          {topRoadmaps.map((roadmap, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      {roadmap.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1">
                      {roadmap.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {roadmap.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    Start Roadmap
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Button onClick={onClose} variant="ghost" className="w-full">
          Back to Explore
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 px-5 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={selectedOption !== null}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-all duration-200",
                selectedOption === index
                  ? "border-primary bg-primary/10 text-foreground"
                  : selectedOption !== null
                  ? "border-border bg-card/50 text-muted-foreground"
                  : "border-border bg-card hover:border-primary/50 text-foreground"
              )}
            >
              <span className="font-medium">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      {selectedOption !== null && (
        <div className="sticky bottom-0 px-5 py-4 bg-background border-t border-border animate-fade-in">
          <Button onClick={handleNext} className="w-full gap-2">
            {isLastQuestion ? "See Results" : "Next Question"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
