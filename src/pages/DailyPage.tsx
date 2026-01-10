import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, HelpCircle, BookOpen, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, subDays, isToday } from "date-fns";

interface DailyContent {
  quiz: {
    title: string;
    topic: string;
    questions: number;
    duration: string;
  };
  longRead: {
    type: "biography" | "case-study";
    title: string;
    subject: string;
    duration: string;
    preview: string;
  };
}

const dailyContent: Record<string, DailyContent> = {
  "2026-01-10": {
    quiz: {
      title: "Critical Thinking Basics",
      topic: "Thinking Tools",
      questions: 5,
      duration: "2-3 min",
    },
    longRead: {
      type: "biography",
      title: "The Quiet Genius",
      subject: "Marie Curie",
      duration: "18 min read",
      preview: "How persistence and curiosity led to two Nobel Prizes, and what we can learn from a life dedicated to discovery.",
    },
  },
  "2026-01-09": {
    quiz: {
      title: "Personal Finance Fundamentals",
      topic: "Finance",
      questions: 6,
      duration: "3 min",
    },
    longRead: {
      type: "case-study",
      title: "The Pivot That Saved Slack",
      subject: "Business Strategy",
      duration: "15 min read",
      preview: "How a failed video game company became a $27 billion communication platform by listening to their own pain points.",
    },
  },
  "2026-01-08": {
    quiz: {
      title: "Psychology of Habits",
      topic: "Psychology",
      questions: 5,
      duration: "2-3 min",
    },
    longRead: {
      type: "biography",
      title: "The Investor's Mind",
      subject: "Warren Buffett",
      duration: "20 min read",
      preview: "Lessons from decades of patient, principled investing and the philosophy behind building lasting wealth.",
    },
  },
};

export default function DailyPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const content = dailyContent[dateKey];

  const goToPreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1));
  };

  const goToNextDay = () => {
    const nextDay = addDays(selectedDate, 1);
    if (nextDay <= new Date()) {
      setSelectedDate(nextDay);
    }
  };

  const canGoNext = addDays(selectedDate, 1) <= new Date();

  return (
    <div className="px-5 pt-8 pb-6 min-h-[calc(100svh-4rem)]">
      {/* Header */}
      <header className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Daily Learning
        </h1>
        <p className="text-muted-foreground text-sm">
          One quiz. One deep read. Every day.
        </p>
      </header>

      {/* Date Selector */}
      <div className="flex items-center justify-between mb-8 p-4 rounded-2xl bg-card border border-border/50 animate-fade-in">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <ChevronLeft size={20} className="text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-primary" />
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              {isToday(selectedDate) ? "Today" : format(selectedDate, "EEEE")}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(selectedDate, "MMMM d, yyyy")}
            </p>
          </div>
        </div>

        <button
          onClick={goToNextDay}
          disabled={!canGoNext}
          className={cn(
            "p-2 rounded-xl transition-colors",
            canGoNext ? "hover:bg-secondary" : "opacity-30 cursor-not-allowed"
          )}
        >
          <ChevronRight size={20} className="text-muted-foreground" />
        </button>
      </div>

      {content ? (
        <div className="space-y-5">
          {/* Daily Quiz Card */}
          <section 
            className="learning-card animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="tag mb-3 inline-block">{content.quiz.topic}</span>
                <h2 className="text-lg font-bold text-foreground">
                  Daily Quiz
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={14} />
                <span className="text-xs">{content.quiz.duration}</span>
              </div>
            </div>

            <h3 className="text-base font-semibold text-secondary-foreground mb-2">
              {content.quiz.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              {content.quiz.questions} questions to test your understanding
            </p>

            <button className="quiz-button">
              <HelpCircle size={18} />
              <span>Start Quiz</span>
            </button>
          </section>

          {/* Daily Long Read Card */}
          <section 
            className="learning-card animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="tag mb-3 inline-block">
                  {content.longRead.type === "biography" ? "Biography" : "Case Study"}
                </span>
                <h2 className="text-lg font-bold text-foreground">
                  Daily Long Read
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={14} />
                <span className="text-xs">{content.longRead.duration}</span>
              </div>
            </div>

            <h3 className="text-base font-semibold text-secondary-foreground mb-1">
              {content.longRead.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <User size={14} className="text-primary" />
              <span className="text-sm text-primary font-medium">
                {content.longRead.subject}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {content.longRead.preview}
            </p>

            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-foreground bg-secondary hover:bg-secondary/80 transition-colors">
              <BookOpen size={18} />
              <span>Start Reading</span>
            </button>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Calendar size={28} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No content for this date
          </h3>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            Try selecting a different date to view past daily content.
          </p>
        </div>
      )}
    </div>
  );
}
