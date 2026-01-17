import { Play, Pause, Square, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface TextToSpeechControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number;
  volume: number;
  rate: number;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onVolumeChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onSeek: (percent: number) => void;
}

export function TextToSpeechControls({
  isPlaying,
  isPaused,
  progress,
  volume,
  rate,
  onPlay,
  onPause,
  onResume,
  onStop,
  onVolumeChange,
  onRateChange,
  onSeek,
}: TextToSpeechControlsProps) {
  return (
    <div className="w-full bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 space-y-3">
      {/* Progress Bar */}
      <div className="space-y-1.5">
        <Slider
          value={[progress]}
          onValueChange={(vals) => onSeek(vals[0])}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{Math.round(progress)}%</span>
          <span>Reading</span>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          {!isPlaying ? (
            <button
              onClick={onPlay}
              className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Play"
            >
              <Play size={18} className="ml-0.5" />
            </button>
          ) : isPaused ? (
            <button
              onClick={onResume}
              className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Resume"
            >
              <Play size={18} className="ml-0.5" />
            </button>
          ) : (
            <button
              onClick={onPause}
              className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Pause"
            >
              <Pause size={18} />
            </button>
          )}
          
          {isPlaying && (
            <button
              onClick={onStop}
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Stop"
            >
              <Square size={16} />
            </button>
          )}
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Speed</span>
          <div className="flex gap-1">
            {[0.75, 1, 1.25, 1.5].map((r) => (
              <button
                key={r}
                onClick={() => onRateChange(r)}
                className={cn(
                  "px-2 py-1 text-[10px] rounded-md transition-colors",
                  rate === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <button
            onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={volume === 0 ? "Unmute" : "Mute"}
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <Slider
            value={[volume * 100]}
            onValueChange={(vals) => onVolumeChange(vals[0] / 100)}
            max={100}
            step={5}
            className="w-16"
          />
        </div>
      </div>
    </div>
  );
}
