import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
    <div className={cn(
      'relative p-4 sm:p-5 rounded-xl border bg-gradient-to-br backdrop-blur-sm overflow-hidden',
      colorMap[color],
      className
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-white/50 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1 truncate">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={cn('p-2 sm:p-2.5 rounded-xl flex-shrink-0', iconBg[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}
