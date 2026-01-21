import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface StartupPageProps {
  onStart: () => void;
}

export default function StartupPage({ onStart }: StartupPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Swifted
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-muted-foreground leading-relaxed">
            Turn Doomscrolling into Learning Bits
          </p>
        </div>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
}
