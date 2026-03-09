import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { forwardRef } from 'react';

export interface TextProps extends RNTextProps {
  className?: string; // NativeWind
}

/**
 * NATIVE: renders a React Native <Text>
 */
export const Text = forwardRef<RNText, TextProps>(
  (props, ref) => <RNText ref={ref} {...props} />
);
Text.displayName = 'Text';
