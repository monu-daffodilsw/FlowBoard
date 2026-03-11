'use client';
import { ReactNode } from 'react';
import { Pressable } from '../../core/Pressable';
import { Text } from '../../core/Text';
import { cn } from '../../utils/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onPress?: () => void;  // universal handler
  onClick?: () => void;  // web alias (maps to onPress)
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // web only, ignored on native
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onPress,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  const base = 'flex-row items-center justify-center rounded-xl';

  const variants = {
    primary: 'bg-indigo-500 active:bg-indigo-400',
    secondary: 'bg-white/10 border border-white/10',
    ghost: 'bg-transparent',
    danger: 'bg-red-500/20 border border-red-500/30',
  };

  const textVariants = {
    primary: 'text-white font-semibold',
    secondary: 'text-white',
    ghost: 'text-white/70',
    danger: 'text-red-400',
  };

  const sizes = {
    sm: { view: 'px-3 py-1.5 gap-1.5', text: 'text-xs' },
    md: { view: 'px-4 py-2 gap-2', text: 'text-sm' },
    lg: { view: 'px-6 py-3 gap-2', text: 'text-base' },
  };

  return (
    <Pressable
      onPress={onPress ?? onClick}
      disabled={disabled}
      type={type}
      className={cn(
        base,
        variants[variant],
        sizes[size].view,
        disabled && 'opacity-50',
        className
      )}
    >
      {typeof children === 'string' ? (
        <Text className={cn(sizes[size].text, textVariants[variant])}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
