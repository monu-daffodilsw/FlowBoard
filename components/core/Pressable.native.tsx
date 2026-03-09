import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { forwardRef } from 'react';

export interface PressableProps extends Omit<RNPressableProps, 'style'> {
  className?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * NATIVE: renders a React Native <Pressable>
 * Provides subtle opacity feedback by default
 */
export const Pressable = forwardRef<typeof RNPressable, PressableProps>(
  ({ style, ...props }, _ref) => (
    <RNPressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.75 : 1 },
        typeof style === 'function' ? undefined : style,
      ]}
      {...props}
    />
  )
);
Pressable.displayName = 'Pressable';
