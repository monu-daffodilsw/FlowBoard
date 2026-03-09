import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { forwardRef } from 'react';

export interface TextInputProps extends RNTextInputProps {
  className?: string;
  // onChangeText is already in RNTextInputProps — no mapping needed
}

/**
 * NATIVE: renders a React Native <TextInput>
 * secureTextEntry, multiline, onChangeText all work natively
 */
export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => (
    <RNTextInput
      ref={ref}
      placeholderTextColor="rgba(255,255,255,0.3)"
      {...props}
    />
  )
);
TextInput.displayName = 'TextInput';
