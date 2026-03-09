import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  value?: string;
  onChangeText?: (text: string) => void; // RN-style handler
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  placeholder?: string;
  secureTextEntry?: boolean; // RN compat → type="password"
  multiline?: boolean;       // RN compat → ignored here, use TextArea instead
  editable?: boolean;        // RN compat → readOnly
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: string;    // RN compat — ignored on web
  onSubmitEditing?: () => void; // RN compat → onKeyDown Enter
  numberOfLines?: number;    // RN compat — ignored, use TextArea
}

/**
 * WEB: renders an <input>
 * onChangeText mirrors React Native's TextInput API
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    className, onChangeText, onChange, secureTextEntry,
    editable, autoCapitalize, returnKeyType, onSubmitEditing,
    numberOfLines, multiline, ...props
  }, ref) => (
    <input
      ref={ref}
      type={secureTextEntry ? 'password' : 'text'}
      readOnly={editable === false}
      autoCapitalize={autoCapitalize}
      className={cn(
        'bg-transparent text-white placeholder-white/30 focus:outline-none w-full',
        className
      )}
      onChange={(e) => {
        onChangeText?.(e.target.value);
        onChange?.(e);
      }}
      onKeyDown={(e) => { if (e.key === 'Enter') onSubmitEditing?.(); }}
      {...props}
    />
  )
);
TextInput.displayName = 'TextInput';
