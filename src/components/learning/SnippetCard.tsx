import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface SnippetCardProps {
  title: string;
  description: string;
  topic: string;
  readTime: string;
  className?: string;
  style?: CSSProperties;
}

export function SnippetCard({ title, description, topic, readTime, className, style }: SnippetCardProps) {
  return (
    <article className={cn("learning-card", className)} style={style}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="tag">{topic}</span>
        <span className="text-xs text-muted-foreground">{readTime}</span>
      </div>
      
      <h3 className="font-semibold text-foreground leading-snug mb-2">
        {title}
      </h3>
      
      <p className="body-text line-clamp-2 mb-4">
        {description}
      </p>
      
      <button className="flex items-center gap-2 text-primary text-sm font-medium hover:opacity-80 transition-opacity">
        <BookOpen size={16} />
        <span>Read Snippet</span>
      </button>
    </article>
  );
}
