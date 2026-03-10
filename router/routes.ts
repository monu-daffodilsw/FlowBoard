export type RouteName =
  | 'login'
  | 'register'
  | 'dashboard'
  | 'projects'
  | 'projectBoard'
  | 'taskDetail'
  | 'profile'
  | 'settings';

interface RouteDefinition {
  name: RouteName;
  path: string;
}

export const routes: RouteDefinition[] = [
  { name: 'login', path: '/login' },
  { name: 'register', path: '/register' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'projects', path: '/projects' },
  { name: 'projectBoard', path: '/projects/:id' },
  { name: 'taskDetail', path: '/projects/:id/tasks/:taskId' },
  { name: 'profile', path: '/profile' },
  { name: 'settings', path: '/settings' },
];

/** Build a URL path from a route name and optional params. */
export function buildPath(name: RouteName, params?: Record<string, string>): string {
  const route = routes.find(r => r.name === name);
  if (!route) throw new Error(`Unknown route: "${name}"`);
  let path = route.path;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, encodeURIComponent(value));
    }
  }
  return path;
}

/** Match a URL pathname against the route registry. Returns route name + extracted params, or null. */
export function matchPath(pathname: string): { name: RouteName; params: Record<string, string> } | null {
  // Most-specific first (longest path pattern)
  const ordered = [...routes].sort((a, b) => b.path.length - a.path.length);
  for (const route of ordered) {
    const paramNames: string[] = [];
    const regexStr = route.path
      .replace(/:[a-zA-Z]+/g, match => {
        paramNames.push(match.slice(1));
        return '([^/]+)';
      })
      .replace(/\//g, '\\/');
    const match = pathname.match(new RegExp(`^${regexStr}$`));
    if (match) {
      const params: Record<string, string> = {};
      paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      return { name: route.name, params };
    }
  }
  return null;
}
