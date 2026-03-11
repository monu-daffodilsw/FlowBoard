import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { RouteDefinition, buildPath, matchPath } from './routes';

interface RouterState {
  pathname: string;
  routeName: string | null;
  params: Record<string, string>;
}

export interface RouterContextValue extends RouterState {
  navigate: (name: string, params?: Record<string, string>) => void;
  replace: (name: string, params?: Record<string, string>) => void;
  back: () => void;
  buildPath: (name: string, params?: Record<string, string>) => string;
}

const RouterContext = createContext<RouterContextValue | null>(null);

// Native router: pure in-memory state, no URL bar
export function RouterProvider({
  children,
  routes,
  initialPath = '/',
}: {
  children: ReactNode;
  routes: RouteDefinition[];
  initialPath?: string;
}) {
  const [state, setState] = useState<RouterState>(() => {
    const matched = matchPath(routes, initialPath);
    return { pathname: initialPath, routeName: matched?.name ?? null, params: matched?.params ?? {} };
  });

  const navigate = useCallback((name: string, params?: Record<string, string>) => {
    const path = buildPath(routes, name, params);
    const matched = matchPath(routes, path);
    setState({ pathname: path, routeName: matched?.name ?? null, params: matched?.params ?? {} });
  }, [routes]);

  const replace = useCallback((name: string, params?: Record<string, string>) => {
    const path = buildPath(routes, name, params);
    const matched = matchPath(routes, path);
    setState({ pathname: path, routeName: matched?.name ?? null, params: matched?.params ?? {} });
  }, [routes]);

  const back = useCallback(() => {
    // No-op without a history stack on native; consumers may layer their own stack
  }, []);

  const bound = useCallback((name: string, params?: Record<string, string>) => {
    return buildPath(routes, name, params);
  }, [routes]);

  return (
    <RouterContext.Provider value={{ ...state, navigate, replace, back, buildPath: bound }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouterContext(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouterContext must be used within <RouterProvider>');
  return ctx;
}
