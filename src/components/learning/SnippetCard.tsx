import { Lightbulb, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface SnippetCardProps {
  topic: string;
  title: string;
  explanation: string;
  example: string;
  readTime: string;
  className?: string;
  style?: CSSProperties;
  isLast?: boolean;
}

export function SnippetCard({ 
  topic, 
  title, 
  explanation, 
  example, 
  readTime, 
  className, 
  style,
  isLast 
}: SnippetCardProps) {
  return (
    <article 
      className={cn(
        "snippet-card flex flex-col",
        className
      )} 
      style={style}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="tag">{topic}</span>
        <span className="text-xs text-muted-foreground">{readTime} read</span>
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-bold text-foreground leading-tight mb-5">
        {title}
      </h2>
      
      {/* Explanation */}
      <div className="flex-1 space-y-5">
        <p className="text-[15px] text-secondary-foreground leading-relaxed">
          {explanation}
        </p>
        
        {/* Example Block */}
        <div className="example-block">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              Example
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {example}
          </p>
        </div>
      </div>
      
      {/* Quiz Button */}
      <button className="quiz-button mt-6">
        <HelpCircle size={18} />
        <span>Take Quick Quiz</span>
      </button>
      
      {/* End Indicator */}
      <div className="snippet-end-indicator">
        <div className="snippet-end-line" />
        {isLast ? (
          <span className="text-xs text-muted-foreground">You're all caught up</span>
        ) : (
          <span className="text-xs text-muted-foreground">Scroll for more</span>
        )}
      </div>
    </article>
  );
}
