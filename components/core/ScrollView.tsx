import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  horizontal?: boolean;           // RN compat → overflow-x-auto
  showsVerticalScrollIndicator?: boolean;   // RN compat — no-op on web
  showsHorizontalScrollIndicator?: boolean; // RN compat — no-op on web
  contentContainerClassName?: string;       // inner wrapper className
  keyboardShouldPersistTaps?: string;       // RN compat — ignored
  bounces?: boolean;                        // RN compat — ignored
}

/**
 * WEB: renders a scrollable <div>
 */
export const ScrollView = forwardRef<HTMLDivElement, ScrollViewProps>(
  ({
    className, horizontal, contentContainerClassName,
    showsVerticalScrollIndicator, showsHorizontalScrollIndicator,
    keyboardShouldPersistTaps, bounces, children, ...props
  }, ref) => (
    <div
      ref={ref}
      className={cn(
        horizontal ? 'overflow-x-auto flex flex-row' : 'overflow-y-auto flex flex-col',
        className
      )}
      {...props}
    >
      <div className={cn('flex', horizontal ? 'flex-row' : 'flex-col', contentContainerClassName)}>
        {children}
      </div>
    </div>
  )
);
ScrollView.displayName = 'ScrollView';
