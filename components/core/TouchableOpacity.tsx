import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';

export interface TouchableOpacityProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onPress?: () => void;
  activeOpacity?: number; // RN compat — unused on web
  disabled?: boolean;
}

/** WEB: renders a <button> with opacity feedback via Tailwind active: */
export const TouchableOpacity = forwardRef<HTMLButtonElement, TouchableOpacityProps>(
  ({ className, onPress, activeOpacity, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={cn('cursor-pointer touch-manipulation active:opacity-70 transition-opacity', className)}
      onClick={onPress ?? onClick}
      {...props}
    />
  )
);
TouchableOpacity.displayName = 'TouchableOpacity';
