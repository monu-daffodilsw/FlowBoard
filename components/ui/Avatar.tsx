import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { cn } from '@/utils/utils';

interface AvatarProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, color = '#6366f1', size = 'md', className }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const sizes = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-12 h-12' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <View
      className={cn('rounded-full items-center justify-center flex-shrink-0', sizes[size], className)}
      style={{ backgroundColor: color }}
    >
      <Text className={cn('font-semibold text-white', textSizes[size])}>{initials}</Text>
    </View>
  );
}
