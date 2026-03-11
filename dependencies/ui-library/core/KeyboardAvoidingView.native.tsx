import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps as RNKAVProps,
  Platform,
} from 'react-native';
import { forwardRef } from 'react';

export interface KeyboardAvoidingViewProps extends RNKAVProps {
  className?: string;
}

/**
 * NATIVE: pushes content up when the keyboard appears.
 * Uses 'padding' on iOS (best feel), 'height' on Android.
 */
export const KeyboardAvoidingView = forwardRef<RNKeyboardAvoidingView, KeyboardAvoidingViewProps>(
  ({ behavior, style, ...props }, ref) => (
    <RNKeyboardAvoidingView
      ref={ref}
      behavior={behavior ?? (Platform.OS === 'ios' ? 'padding' : 'height')}
      style={[{ flex: 1 }, style as object]}
      {...props}
    />
  )
);
KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';
