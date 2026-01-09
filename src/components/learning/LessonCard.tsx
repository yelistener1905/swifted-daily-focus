import { Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface LessonCardProps {
  title: string;
  category: string;
  duration: string;
  progress?: number;
  className?: string;
  style?: CSSProperties;
}

export function LessonCard({ title, category, duration, progress, className, style }: LessonCardProps) {
  return (
    <article className={cn("learning-card animate-fade-in", className)} style={style}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="tag">{category}</span>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={14} />
          <span className="text-xs">{duration}</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-foreground leading-snug mb-3">
        {title}
      </h3>
      
      {progress !== undefined && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      
      {progress === undefined && (
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <BookOpen size={16} />
          <span>Start Learning</span>
        </div>
      )}
    </article>
  );
}
