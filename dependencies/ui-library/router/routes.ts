export interface RouteDefinition {
  name: string;
  path: string;
}

/** Build a URL path given a routes registry, name, and optional params. */
export function buildPath(routes: RouteDefinition[], name: string, params?: Record<string, string>): string {
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

/** Match a pathname against a routes registry. Returns name + params or null. */
export function matchPath(routes: RouteDefinition[], pathname: string): { name: string; params: Record<string, string> } | null {
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
      paramNames.forEach((n, i) => { params[n] = decodeURIComponent(match[i + 1]); });
      return { name: route.name, params };
    }
  }
  return null;
}
