'use client';
import { useSpeech } from '@/hooks/useSpeech';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SpeechNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export function SpeechNotes({ value, onChange }: SpeechNotesProps) {
  const { isRecording, interim, supported, start, stop } = useSpeech((text) => {
    onChange(value + (value ? ' ' : '') + text);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white/80">Notes</h3>
        <div className="flex items-center gap-2">
          {supported === false && (
            <span className="text-xs text-amber-400">Speech not supported</span>
          )}
          <Button
            size="sm"
            variant={isRecording ? 'danger' : 'ghost'}
            onClick={isRecording ? stop : start}
            className={isRecording ? 'relative' : ''}
          >
            {isRecording && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {isRecording ? '⏹ Stop Recording' : '🎤 Start Recording'}
          </Button>
        </div>
      </div>

      {isRecording && interim && (
        <div className="mb-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300/70 italic">
          {interim}
        </div>
      )}

      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Add notes..."
        rows={4}
      />
    </div>
  );
}
