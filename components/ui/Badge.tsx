import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'indigo' | 'green' | 'amber' | 'red' | 'blue';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/70',
  indigo: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
  green: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}

export function priorityBadge(priority: string) {
  const map: Record<string, BadgeVariant> = {
    Low: 'green',
    Medium: 'blue',
    High: 'amber',
    Critical: 'red',
  };
  return map[priority] ?? 'default';
}

export function statusBadge(status: string) {
  const map: Record<string, BadgeVariant> = {
    Backlog: 'default',
    'In Progress': 'indigo',
    'In Review': 'amber',
    Done: 'green',
  };
  return map[status] ?? 'default';
}
