import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps as RNProps } from 'react-native';
import { forwardRef } from 'react';

export interface TouchableOpacityProps extends RNProps {
  className?: string;
  onPress?: () => void;
}

/** NATIVE: React Native TouchableOpacity */
export const TouchableOpacity = forwardRef<RNTouchableOpacity, TouchableOpacityProps>(
  ({ activeOpacity = 0.7, ...props }, ref) => (
    <RNTouchableOpacity ref={ref} activeOpacity={activeOpacity} {...props} />
  )
);
TouchableOpacity.displayName = 'TouchableOpacity';
