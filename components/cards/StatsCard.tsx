import { ReactNode } from 'react';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { cn } from '@/utils/utils';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  color: 'indigo' | 'green' | 'amber' | 'red';
  className?: string;
}

const colorMap = {
  indigo: 'from-indigo-500/20 to-transparent border-indigo-500/20',
  green: 'from-emerald-500/20 to-transparent border-emerald-500/20',
  amber: 'from-amber-500/20 to-transparent border-amber-500/20',
  red: 'from-red-500/20 to-transparent border-red-500/20',
};

const iconBg = {
  indigo: 'bg-indigo-500/20 text-indigo-400',
  green: 'bg-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/20 text-amber-400',
  red: 'bg-red-500/20 text-red-400',
};

export function StatsCard({ label, value, icon, color, className }: StatsCardProps) {
  return (
    <View className={cn(
      'relative p-4 rounded-xl border bg-gradient-to-br backdrop-blur-sm overflow-hidden',
      colorMap[color], className
    )}>
      <View className="flex-row items-start justify-between gap-2">
        <View className="min-w-0">
          <Text className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">{label}</Text>
          <Text className="text-2xl font-bold text-white">{value}</Text>
        </View>
        <View className={cn('p-2 rounded-xl flex-shrink-0', iconBg[color])}>
          {icon}
        </View>
      </View>
    </View>
  );
}
