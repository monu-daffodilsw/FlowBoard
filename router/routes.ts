import { buildPath as libBuildPath, matchPath as libMatchPath } from '@ultra-ui-library';
import type { RouteDefinition } from '@ultra-ui-library';

export type RouteName =
  | 'login'
  | 'register'
  | 'dashboard'
  | 'projects'
  | 'projectBoard'
  | 'taskDetail'
  | 'profile'
  | 'settings';

export const routes: RouteDefinition[] = [
  { name: 'login',       path: '/login' },
  { name: 'register',    path: '/register' },
  { name: 'dashboard',   path: '/dashboard' },
  { name: 'projects',    path: '/projects' },
  { name: 'projectBoard', path: '/projects/:id' },
  { name: 'taskDetail',  path: '/projects/:id/tasks/:taskId' },
  { name: 'profile',     path: '/profile' },
  { name: 'settings',    path: '/settings' },
];

export function buildPath(name: RouteName, params?: Record<string, string>): string {
  return libBuildPath(routes, name, params);
}

export function matchPath(pathname: string): { name: RouteName; params: Record<string, string> } | null {
  return libMatchPath(routes, pathname) as { name: RouteName; params: Record<string, string> } | null;
}
