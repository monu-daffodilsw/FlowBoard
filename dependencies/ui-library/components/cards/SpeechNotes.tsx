'use client';
import { useSpeech } from '../../hooks/useSpeech';
import { Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { View } from '../../core/View';
import { Text } from '../../core/Text';

interface SpeechNotesProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  unsupportedText?: string;
  startLabel?: string;
  stopLabel?: string;
}

export function SpeechNotes({
  value,
  onChange,
  label = 'Notes',
  placeholder = 'Add notes...',
  unsupportedText = 'Speech not supported',
  startLabel = '🎤 Start Recording',
  stopLabel = '⏹ Stop Recording',
}: SpeechNotesProps) {
  const { isRecording, interim, supported, start, stop } = useSpeech((text) => {
    onChange(value + (value ? ' ' : '') + text);
  });

  return (
    <View>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm font-semibold text-white/80">{label}</Text>
        <View className="flex-row items-center gap-2">
          {supported === false && (
            <Text className="text-xs text-amber-400">{unsupportedText}</Text>
          )}
          <Button size="sm" variant={isRecording ? 'danger' : 'ghost'} onPress={isRecording ? stop : start}>
            {isRecording ? stopLabel : startLabel}
          </Button>
        </View>
      </View>

      {isRecording && interim && (
        <View className="mb-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Text className="text-sm text-indigo-300/70 italic">{interim}</Text>
        </View>
      )}

      <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4} />
    </View>
  );
}
