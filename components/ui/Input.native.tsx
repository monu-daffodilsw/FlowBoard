import { forwardRef } from 'react';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { TextInput as CoreTextInput } from '@/components/core/TextInput';
import { cn } from '@/utils/utils';

interface InputProps {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChange?: (e: { target: { value: string } }) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  secureTextEntry?: boolean;
  [key: string]: unknown;
}

export const Input = forwardRef<unknown, InputProps>(
  ({ label, error, className, onChange, type, autoComplete, ...props }, ref) => (
    <View className="gap-1.5 w-full">
      {label ? <Text className="text-sm text-white/60 font-medium">{label}</Text> : null}
      <CoreTextInput
        secureTextEntry={type === 'password'}
        className={cn(
          'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm',
          error && 'border-red-500',
          className
        )}
        onChangeText={text => {
          props.onChangeText?.(text);
          onChange?.({ target: { value: text } });
        }}
        {...(props as any)}
      />
      {error ? <Text className="text-xs text-red-400">{error}</Text> : null}
    </View>
  )
);
Input.displayName = 'Input';

interface TextareaProps {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  rows?: number;
  onChangeText?: (text: string) => void;
  onChange?: (e: { target: { value: string } }) => void;
  placeholder?: string;
  [key: string]: unknown;
}

export const Textarea = forwardRef<unknown, TextareaProps>(
  ({ label, error, className, rows = 4, onChange, ...props }, ref) => (
    <View className="gap-1.5 w-full">
      {label ? <Text className="text-sm text-white/60 font-medium">{label}</Text> : null}
      <CoreTextInput
        multiline
        numberOfLines={rows}
        className={cn(
          'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm',
          error && 'border-red-500',
          className
        )}
        onChangeText={text => {
          props.onChangeText?.(text);
          onChange?.({ target: { value: text } });
        }}
        {...(props as any)}
      />
      {error ? <Text className="text-xs text-red-400">{error}</Text> : null}
    </View>
  )
);
Textarea.displayName = 'Textarea';
