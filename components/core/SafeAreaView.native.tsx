import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { ViewProps } from 'react-native';
import { forwardRef } from 'react';

export interface SafeAreaViewProps extends ViewProps {
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/** NATIVE: react-native-safe-area-context SafeAreaView */
export const SafeAreaView = forwardRef<typeof RNSafeAreaView, SafeAreaViewProps>(
  ({ edges = ['top', 'bottom', 'left', 'right'], ...props }, _ref) => (
    <RNSafeAreaView edges={edges} {...props} />
  )
);
SafeAreaView.displayName = 'SafeAreaView';
