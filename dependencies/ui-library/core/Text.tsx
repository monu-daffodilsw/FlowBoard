import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/utils';

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  numberOfLines?: number; // mirrored from RN — applied as line-clamp
}

/**
 * WEB: renders a <span>; numberOfLines maps to Tailwind line-clamp
 */
export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, numberOfLines, style, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'text-base',
        numberOfLines === 1 && 'truncate',
        (numberOfLines && numberOfLines > 1) ? `line-clamp-${numberOfLines}` : null,
        className
      )}
      style={style}
      {...props}
    />
  )
);
Text.displayName = 'Text';
