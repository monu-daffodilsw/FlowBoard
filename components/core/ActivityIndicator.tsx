import { cn } from '@/utils/utils';

export interface ActivityIndicatorProps {
  className?: string;
  size?: 'small' | 'large' | number;
  color?: string;
}

/** WEB: CSS spinning border circle */
export function ActivityIndicator({ className, size = 'small', color }: ActivityIndicatorProps) {
  const dim = size === 'small' ? 'w-5 h-5 border-2' : size === 'large' ? 'w-10 h-10 border-4' : undefined;
  const style = typeof size === 'number' ? { width: size, height: size, borderColor: color, borderTopColor: 'transparent' } : { borderTopColor: 'transparent', borderColor: color };
  return (
    <div
      className={cn('rounded-full border-current animate-spin', dim, className)}
      style={style}
    />
  );
}
