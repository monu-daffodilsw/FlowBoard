import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/utils';

export interface SafeAreaViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[]; // RN compat — ignored on web
}

/** WEB: no safe area insets on web — plain flex container */
export const SafeAreaView = forwardRef<HTMLDivElement, SafeAreaViewProps>(
  ({ className, edges, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col flex-1', className)} {...props} />
  )
);
SafeAreaView.displayName = 'SafeAreaView';
