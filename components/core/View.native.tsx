import { View as RNView, ViewProps as RNViewProps } from 'react-native';
import { forwardRef } from 'react';

export interface ViewProps extends RNViewProps {
  className?: string; // NativeWind processes this
}

/**
 * NATIVE: renders a React Native <View>
 * NativeWind converts className to StyleSheet automatically
 */
export const View = forwardRef<RNView, ViewProps>(
  (props, ref) => <RNView ref={ref} {...props} />
);
View.displayName = 'View';
