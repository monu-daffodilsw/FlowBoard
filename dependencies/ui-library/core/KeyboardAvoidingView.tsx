import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/utils';

export interface KeyboardAvoidingViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  behavior?: 'height' | 'padding' | 'position'; // RN compat — no-op on web
}

/**
 * WEB: browsers handle keyboard automatically, so this is a plain <div>
 */
export const KeyboardAvoidingView = forwardRef<HTMLDivElement, KeyboardAvoidingViewProps>(
  ({ className, behavior, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col flex-1', className)} {...props} />
  )
);
KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';
