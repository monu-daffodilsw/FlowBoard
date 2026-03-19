export { Badge } from '@ultra-ui-library';
export type { BadgeVariant } from '@ultra-ui-library';

export function priorityBadge(priority: string): import('@ultra-ui-library').BadgeVariant {
  const map: Record<string, import('@ultra-ui-library').BadgeVariant> = { Low: 'green', Medium: 'blue', High: 'amber', Critical: 'red' };
  return map[priority] ?? 'default';
}

export function statusBadge(status: string): import('@ultra-ui-library').BadgeVariant {
  const map: Record<string, import('@ultra-ui-library').BadgeVariant> = { Backlog: 'default', 'In Progress': 'indigo', 'In Review': 'amber', Done: 'green' };
  return map[status] ?? 'default';
}
