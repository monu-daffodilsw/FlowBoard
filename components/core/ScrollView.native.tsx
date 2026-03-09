import { ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps } from 'react-native';
import { forwardRef } from 'react';

export interface ScrollViewProps extends RNScrollViewProps {
  className?: string;
  contentContainerClassName?: string;
}

/**
 * NATIVE: renders a React Native <ScrollView>
 */
export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  ({ contentContainerClassName, contentContainerStyle, ...props }, ref) => (
    <RNScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  )
);
ScrollView.displayName = 'ScrollView';
