import { useState } from "react";
import { CheckCircle, XCircle, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizModalProps {
  questions: Question[];
  snippetTitle: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function QuizModal({ questions, snippetTitle, onComplete, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [attemptsOnCurrent, setAttemptsOnCurrent] = useState(0);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (isCorrect) return; // Already answered correctly
    
    setSelectedAnswer(index);
    const correct = index === question.correctIndex;
    
    if (correct) {
      setIsCorrect(true);
      // Score based on attempts: first try = 10pts, second = 5pts, third+ = 2pts
      const points = attemptsOnCurrent === 0 ? 10 : attemptsOnCurrent === 1 ? 5 : 2;
      setScore(prev => prev + points);
    } else {
      setIsCorrect(false);
      setAttemptsOnCurrent(prev => prev + 1);
      // Reset after brief delay for "try again"
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1200);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setAttemptsOnCurrent(0);
    } else {
      setIsCompleted(true);
      onComplete(score);
    }
  };

  if (isCompleted) {
    const maxScore = questions.length * 10;
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-md mx-5 text-center">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center animate-scale-in">
              <Trophy size={48} className="text-primary" />
            </div>
            <Sparkles className="absolute top-0 right-1/4 text-primary animate-pulse" size={20} />
            <Sparkles className="absolute bottom-0 left-1/4 text-accent-foreground animate-pulse" size={16} />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Snippet Completed!</h2>
          <p className="text-muted-foreground mb-6">"{snippetTitle}"</p>

          {/* Score Display */}
          <div className="learning-card mb-8 py-6">
            <p className="text-sm text-muted-foreground mb-2">Your Score</p>
            <p className="text-4xl font-bold text-primary mb-1">{score} pts</p>
            <p className="text-sm text-muted-foreground">{percentage}% accuracy</p>
          </div>

          <button
            onClick={onClose}
            className="quiz-button"
          >
            <span>Continue Learning</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Quick Quiz</span>
          <span className="text-xs text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-5 py-8">
        <h2 className="text-xl font-semibold text-foreground leading-relaxed mb-8">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isCorrect === true}
              className={cn(
                "w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border-2",
                selectedAnswer === idx && isCorrect === true
                  ? "bg-green-500/20 border-green-500 text-foreground"
                  : selectedAnswer === idx && isCorrect === false
                  ? "bg-destructive/20 border-destructive text-foreground animate-shake"
                  : "bg-card border-border/50 text-foreground hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer === idx && isCorrect === true && (
                  <CheckCircle size={20} className="text-green-500" />
                )}
                {selectedAnswer === idx && isCorrect === false && (
                  <XCircle size={20} className="text-destructive" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isCorrect === true && (
          <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm font-semibold text-green-500">Correct!</span>
            </div>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {isCorrect === false && (
          <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 animate-fade-in">
            <div className="flex items-center gap-2">
              <XCircle size={16} className="text-destructive" />
              <span className="text-sm font-semibold text-destructive">Try again!</span>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      {isCorrect === true && (
        <div className="px-5 pb-8">
          <button onClick={handleNext} className="quiz-button animate-fade-in">
            <span>{currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
