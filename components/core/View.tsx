import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * WEB: renders a <div> with flex-col by default (mirrors RN View)
 */
export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props} />
  )
);
View.displayName = 'View';
