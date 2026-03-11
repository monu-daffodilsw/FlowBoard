import { SafeAreaView } from 'react-native-safe-area-context';
import { ViewProps } from 'react-native';
import { forwardRef } from 'react';

export interface ScreenProps extends ViewProps {
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * NATIVE: SafeAreaView from react-native-safe-area-context.
 * Automatically handles notch, dynamic island, home indicator insets.
 * edges prop controls which sides get safe area padding.
 */
export const Screen = forwardRef<typeof SafeAreaView, ScreenProps>(
  ({ edges = ['top', 'bottom', 'left', 'right'], ...props }, _ref) => (
    <SafeAreaView
      edges={edges}
      style={{ flex: 1, backgroundColor: '#0a0f1e' }}
      {...props}
    />
  )
);
Screen.displayName = 'Screen';
