import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Quick101ReaderProps {
  packId: string;
  packTitle: string;
  onClose: () => void;
}

const packSnippets: Record<string, Array<{
  title: string;
  image: string;
  content: string;
  quiz: Array<{ question: string; options: string[]; correctIndex: number }>;
}>> = {
  "tech-ai": [
    {
      title: "What is Artificial Intelligence?",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      content: "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.\n\nAI isn't science fiction anymore—it powers your phone's voice assistant, recommends what you watch, and even helps doctors diagnose diseases. At its core, AI uses algorithms and data to make predictions and decisions.\n\nThe field has evolved dramatically since its inception in the 1950s. Today's AI can beat world champions at chess and Go, generate human-like text, and drive cars. But despite these advances, we're still far from creating truly 'intelligent' machines that can think and reason like humans.\n\nUnderstanding AI basics is essential in today's world, as it increasingly influences everything from job markets to personal privacy.",
      quiz: [
        { question: "What does AI stand for?", options: ["Automated Integration", "Artificial Intelligence", "Applied Informatics"], correctIndex: 1 },
      ],
    },
    {
      title: "Machine Learning Explained",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      content: "Machine Learning (ML) is a subset of AI that enables computers to learn from data without being explicitly programmed. Instead of following rigid instructions, ML systems identify patterns and improve their performance over time.\n\nThink of it like teaching a child to recognize cats. Instead of describing every feature, you show them thousands of cat pictures. Eventually, they learn to identify cats they've never seen before. ML works similarly—algorithms learn from examples.\n\nThere are three main types: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error).\n\nML powers recommendation engines, spam filters, fraud detection, and countless other applications you use daily.",
      quiz: [
        { question: "How does machine learning differ from traditional programming?", options: ["It's faster", "It learns from data instead of explicit instructions", "It uses more memory"], correctIndex: 1 },
      ],
    },
    {
      title: "Neural Networks & Deep Learning",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
      content: "Neural networks are computing systems inspired by the human brain's structure. They consist of layers of interconnected 'neurons' that process information and pass signals to each other.\n\nDeep learning uses neural networks with many layers (hence 'deep') to solve complex problems. This architecture allows computers to learn hierarchical representations—simple features combine into increasingly complex concepts.\n\nFor example, in image recognition, early layers might detect edges, middle layers recognize shapes, and deeper layers identify objects. This layered learning enables remarkable capabilities.\n\nDeep learning has revolutionized computer vision, speech recognition, and natural language processing. It's behind technologies like face recognition, language translation, and AI art generation.",
      quiz: [
        { question: "What inspired the design of neural networks?", options: ["Computer circuits", "The human brain", "Mathematical equations"], correctIndex: 1 },
      ],
    },
    {
      title: "Natural Language Processing",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800",
      content: "Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language. It bridges the gap between human communication and computer understanding.\n\nNLP powers virtual assistants, translation services, sentiment analysis, and chatbots. When you ask Siri a question or use Google Translate, you're using NLP technology.\n\nThe field has advanced dramatically with transformer models like GPT. These models understand context, generate coherent text, and can even engage in seemingly intelligent conversations.\n\nChallenges remain: understanding sarcasm, cultural nuances, and ambiguous language. But NLP continues to improve, making human-computer interaction more natural every day.",
      quiz: [
        { question: "What does NLP stand for?", options: ["Neural Learning Process", "Natural Language Processing", "Network Layer Protocol"], correctIndex: 1 },
      ],
    },
    {
      title: "Computer Vision",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
      content: "Computer vision enables machines to interpret and understand visual information from the world. It's how computers 'see' and make sense of images and videos.\n\nApplications are everywhere: facial recognition unlocks your phone, self-driving cars detect pedestrians, medical imaging systems identify diseases, and quality control systems spot defects in manufacturing.\n\nComputer vision works by analyzing pixels, identifying patterns, and matching them against learned representations. Deep learning has dramatically improved accuracy, enabling systems that sometimes outperform humans.\n\nThe technology raises important questions about privacy and surveillance, making it crucial to understand both its capabilities and implications.",
      quiz: [
        { question: "What is computer vision primarily used for?", options: ["Data storage", "Interpreting visual information", "Network security"], correctIndex: 1 },
      ],
    },
    {
      title: "AI Ethics & Bias",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      content: "AI systems can inherit and amplify human biases present in training data. This creates serious ethical concerns about fairness, accountability, and transparency.\n\nExamples abound: hiring algorithms that discriminate against women, facial recognition that misidentifies people of color, and criminal justice systems with racial biases. These aren't theoretical—they affect real lives.\n\nAddressing AI ethics requires diverse teams, careful data curation, regular auditing, and transparency about limitations. It's not just a technical problem—it requires interdisciplinary collaboration.\n\nAs AI becomes more influential, understanding its ethical dimensions becomes essential for everyone, not just technologists.",
      quiz: [
        { question: "Why is AI ethics important?", options: ["To make AI faster", "To prevent bias and ensure fairness", "To reduce costs"], correctIndex: 1 },
      ],
    },
    {
      title: "AI in Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      content: "AI is transforming healthcare through improved diagnostics, personalized treatment, drug discovery, and administrative efficiency. It's one of the most promising applications of the technology.\n\nAI can analyze medical images to detect cancer earlier than human doctors, predict patient deterioration, and suggest treatment options based on vast medical literature. It's not replacing doctors—it's augmenting their capabilities.\n\nDrug discovery, traditionally taking 10+ years and billions of dollars, is being accelerated by AI that can predict molecular interactions and identify promising compounds.\n\nChallenges include data privacy, regulatory approval, and ensuring AI recommendations are explainable to patients and doctors alike.",
      quiz: [
        { question: "How is AI primarily helping in healthcare?", options: ["Replacing doctors", "Improving diagnostics and drug discovery", "Reducing hospital sizes"], correctIndex: 1 },
      ],
    },
    {
      title: "Autonomous Vehicles",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      content: "Self-driving cars combine multiple AI technologies: computer vision to see the road, sensor fusion to understand the environment, path planning to navigate, and machine learning to improve over time.\n\nLevels of autonomy range from driver assistance (Level 1) to full autonomy (Level 5). Most current systems are at Level 2-3, requiring human oversight. True Level 5 autonomy—driving anywhere, in any conditions—remains elusive.\n\nThe promise is significant: reduced accidents (most caused by human error), increased mobility for elderly and disabled, and more efficient transportation. But challenges include edge cases, ethical dilemmas, and public trust.\n\nThe industry continues to evolve, with companies taking different approaches from sensor-heavy to camera-primary systems.",
      quiz: [
        { question: "What technologies do self-driving cars primarily use?", options: ["Only GPS", "AI, computer vision, and sensors", "Radio waves"], correctIndex: 1 },
      ],
    },
    {
      title: "AI & Jobs",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
      content: "AI's impact on employment is nuanced. While it automates certain tasks, it also creates new jobs and augments human capabilities. The key is understanding which aspects of work AI affects.\n\nRoutine, repetitive tasks are most vulnerable to automation. But jobs requiring creativity, emotional intelligence, complex problem-solving, and physical dexterity remain harder to automate.\n\nNew roles are emerging: AI trainers, ethicists, explainability experts, and human-AI collaboration specialists. The future likely involves working alongside AI, not being replaced by it.\n\nAdapting requires continuous learning, developing uniquely human skills, and understanding AI capabilities. The question isn't whether AI will change work—but how we'll adapt.",
      quiz: [
        { question: "Which types of jobs are most vulnerable to AI automation?", options: ["Creative jobs", "Routine, repetitive tasks", "Leadership roles"], correctIndex: 1 },
      ],
    },
    {
      title: "The Future of AI",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      content: "AI's future holds both tremendous promise and significant challenges. Advances in general AI, quantum computing integration, and brain-computer interfaces could transform society in unprecedented ways.\n\nNear-term developments include more sophisticated language models, better robotics, and AI that can reason and explain its decisions. These will impact every industry and aspect of daily life.\n\nLonger-term possibilities—and concerns—include artificial general intelligence (AGI) that matches human cognitive abilities. While some predict this within decades, others argue it's much further away or may never happen.\n\nRegardless of timeline, engaging with AI development—understanding it, shaping it, and preparing for it—is essential for navigating the future. The choices we make now will determine whether AI benefits everyone.",
      quiz: [
        { question: "What is AGI?", options: ["Advanced Graphics Interface", "Artificial General Intelligence", "Automated Goal Implementation"], correctIndex: 1 },
      ],
    },
  ],
  "money-finance": generateFinanceSnippets(),
  "health-mind": generateHealthSnippets(),
  "life-skills": generateLifeSkillsSnippets(),
  "science-nature": generateScienceSnippets(),
  "languages-comm": generateCommunicationSnippets(),
};

function generateFinanceSnippets() {
  return [
    { title: "Understanding Money", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", content: "Money is a medium of exchange that has evolved from barter systems to digital currencies...", quiz: [{ question: "What is the primary function of money?", options: ["Store value", "Medium of exchange", "Both"], correctIndex: 2 }] },
    { title: "Budgeting Basics", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", content: "A budget is a plan for your money that helps you track income and expenses...", quiz: [{ question: "What is a budget?", options: ["A loan", "A spending plan", "An investment"], correctIndex: 1 }] },
    { title: "Saving Strategies", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800", content: "Saving money is the foundation of financial security...", quiz: [{ question: "Why is saving important?", options: ["For emergencies", "For future goals", "Both"], correctIndex: 2 }] },
    { title: "Understanding Debt", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800", content: "Not all debt is bad. Understanding the difference between good and bad debt is crucial...", quiz: [{ question: "Is all debt bad?", options: ["Yes", "No, some debt can be beneficial", "Debt doesn't exist"], correctIndex: 1 }] },
    { title: "Investing 101", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", content: "Investing is putting money to work to generate more money over time...", quiz: [{ question: "What is investing?", options: ["Spending money", "Growing money over time", "Hiding money"], correctIndex: 1 }] },
    { title: "Stock Market Basics", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800", content: "The stock market is where shares of publicly traded companies are bought and sold...", quiz: [{ question: "What is traded in the stock market?", options: ["Goods", "Company shares", "Currencies only"], correctIndex: 1 }] },
    { title: "Compound Interest", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800", content: "Compound interest is interest earned on both principal and accumulated interest...", quiz: [{ question: "What makes compound interest powerful?", options: ["Simple calculation", "Interest on interest", "Low rates"], correctIndex: 1 }] },
    { title: "Retirement Planning", image: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=800", content: "Planning for retirement should start early to take advantage of time...", quiz: [{ question: "When should you start retirement planning?", options: ["At 60", "As early as possible", "Never"], correctIndex: 1 }] },
    { title: "Taxes Explained", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", content: "Understanding taxes helps you make better financial decisions...", quiz: [{ question: "Why is tax knowledge important?", options: ["To evade taxes", "To make better financial decisions", "It's not important"], correctIndex: 1 }] },
    { title: "Building Wealth", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800", content: "Building wealth is a marathon, not a sprint. It requires patience and consistency...", quiz: [{ question: "What is key to building wealth?", options: ["Get rich quick schemes", "Patience and consistency", "Luck only"], correctIndex: 1 }] },
  ];
}

function generateHealthSnippets() {
  return Array.from({ length: 10 }, (_, i) => ({
    title: `Health Topic ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1571019613454 + i}-1cb2f99b2d8b?w=800`,
    content: "Health and wellness content...",
    quiz: [{ question: "Sample question?", options: ["A", "B", "C"], correctIndex: 1 }],
  }));
}

function generateLifeSkillsSnippets() {
  return Array.from({ length: 10 }, (_, i) => ({
    title: `Life Skill ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1522202176988 + i}-66273c2fd55f?w=800`,
    content: "Life skills content...",
    quiz: [{ question: "Sample question?", options: ["A", "B", "C"], correctIndex: 1 }],
  }));
}

function generateScienceSnippets() {
  return Array.from({ length: 10 }, (_, i) => ({
    title: `Science Topic ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1507413245164 + i}-6160d8298b31?w=800`,
    content: "Science content...",
    quiz: [{ question: "Sample question?", options: ["A", "B", "C"], correctIndex: 1 }],
  }));
}

function generateCommunicationSnippets() {
  return Array.from({ length: 10 }, (_, i) => ({
    title: `Communication Skill ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1515378791036 + i}-0facc2f2e69e?w=800`,
    content: "Communication content...",
    quiz: [{ question: "Sample question?", options: ["A", "B", "C"], correctIndex: 1 }],
  }));
}

const recommendedRoadmaps = [
  { title: "Deep Dive: AI & Machine Learning", description: "Master the fundamentals and beyond" },
  { title: "Tech Career Roadmap", description: "Build skills for the modern tech industry" },
  { title: "Digital Transformation", description: "Understand technology's impact on business" },
];

export function Quick101Reader({ packId, packTitle, onClose }: Quick101ReaderProps) {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const snippets = packSnippets[packId] || [];
  const snippet = snippets[currentSnippet];
  const isLastSnippet = currentSnippet === snippets.length - 1;

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, [currentSnippet, showQuiz]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setIsCorrect(index === snippet.quiz[0].correctIndex);
  };

  const handleNext = () => {
    if (isLastSnippet) {
      setCompleted(true);
    } else {
      setCurrentSnippet(currentSnippet + 1);
      setShowQuiz(false);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-background px-5 py-8 animate-fade-in">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{packTitle} Complete!</h1>
          <p className="text-muted-foreground mt-2">
            Great job! Here are some roadmaps to continue your journey
          </p>
        </header>

        <section className="space-y-4 mb-8">
          <h2 className="section-title">Recommended Roadmaps</h2>
          {recommendedRoadmaps.map((roadmap, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground">{roadmap.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{roadmap.description}</p>
                <Button size="sm" className="mt-3 w-full">Start Roadmap</Button>
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

  if (showQuiz) {
    const quiz = snippet.quiz[0];
    
    return (
      <div className="min-h-screen bg-background flex flex-col" ref={containerRef}>
        <header className="flex items-center justify-between px-5 py-4 border-b border-border">
          <button
            onClick={() => setShowQuiz(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to reading
          </button>
          <span className="text-sm text-muted-foreground">
            Snippet {currentSnippet + 1} of {snippets.length}
          </span>
        </header>

        <div className="flex-1 px-5 py-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">{quiz.question}</h2>

          <div className="space-y-3">
            {quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={selectedOption !== null}
                className={cn(
                  "w-full p-4 rounded-xl border text-left transition-all duration-200",
                  selectedOption === index
                    ? isCorrect
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                    : selectedOption !== null && index === snippet.quiz[0].correctIndex
                    ? "border-green-500 bg-green-500/10"
                    : "border-border bg-card"
                )}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedOption !== null && (
            <div className={cn(
              "mt-6 p-4 rounded-xl",
              isCorrect ? "bg-green-500/10" : "bg-red-500/10"
            )}>
              <p className="font-medium">
                {isCorrect ? "Correct!" : "Not quite. Try again!"}
              </p>
            </div>
          )}
        </div>

        {selectedOption !== null && (
          <div className="sticky bottom-0 px-5 py-4 bg-background border-t border-border space-y-2">
            {isCorrect ? (
              <Button onClick={handleNext} className="w-full">
                {isLastSnippet ? "Complete Pack" : "Next Snippet"}
              </Button>
            ) : (
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <header className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-muted-foreground">
          {currentSnippet + 1} / {snippets.length}
        </span>
      </header>

      {/* Hero Image */}
      <div className="relative h-[35vh] min-h-[200px] max-h-[300px]">
        <img
          src={snippet.image}
          alt={snippet.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-5 pb-32 -mt-16 relative">
        <h1 className="text-2xl font-bold text-foreground mb-4">{snippet.title}</h1>
        <div className="prose prose-invert max-w-none">
          {snippet.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4 bg-background/95 backdrop-blur border-t border-border">
        <Button onClick={handleStartQuiz} className="w-full gap-2">
          Take Quick Quiz
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
