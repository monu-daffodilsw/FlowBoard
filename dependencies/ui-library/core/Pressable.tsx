import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/utils';

export interface PressableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onPress?: () => void;         // RN-style alias for onClick
  onLongPress?: () => void;     // RN-style: maps to onContextMenu on web
  disabled?: boolean;
  activeOpacity?: number;       // RN compat — unused on web (use active: variant)
}

/**
 * WEB: renders a <button>; onPress maps to onClick
 */
export const Pressable = forwardRef<HTMLButtonElement, PressableProps>(
  ({ className, onPress, onLongPress, activeOpacity, onClick, onContextMenu, ...props }, ref) => (
    <button
      ref={ref}
      className={cn('cursor-pointer touch-manipulation', className)}
      onClick={onPress ?? onClick}
      onContextMenu={onLongPress ? (e) => { e.preventDefault(); onLongPress(); } : onContextMenu}
      {...props}
    />
  )
);
Pressable.displayName = 'Pressable';
