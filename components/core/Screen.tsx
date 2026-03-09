import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[]; // RN SafeAreaView compat — ignored on web
}

/**
 * WEB: full-screen container — SafeAreaView equivalent.
 * On web there are no safe area insets, so this is just a flex container.
 */
export const Screen = forwardRef<HTMLDivElement, ScreenProps>(
  ({ className, edges, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col flex-1 bg-[#0a0f1e]', className)}
      {...props}
    />
  )
);
Screen.displayName = 'Screen';
