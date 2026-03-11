'use client';
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
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
    const pathname = typeof window !== 'undefined' ? window.location.pathname : initialPath;
    const matched = matchPath(routes, pathname);
    return { pathname, routeName: matched?.name ?? null, params: matched?.params ?? {} };
  });

  useEffect(() => {
    const onPopState = () => {
      const pathname = window.location.pathname;
      const matched = matchPath(routes, pathname);
      setState({ pathname, routeName: matched?.name ?? null, params: matched?.params ?? {} });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [routes]);

  const navigate = useCallback((name: string, params?: Record<string, string>) => {
    const path = buildPath(routes, name, params);
    window.history.pushState({}, '', path);
    const matched = matchPath(routes, path);
    setState({ pathname: path, routeName: matched?.name ?? null, params: matched?.params ?? {} });
  }, [routes]);

  const replace = useCallback((name: string, params?: Record<string, string>) => {
    const path = buildPath(routes, name, params);
    window.history.replaceState({}, '', path);
    const matched = matchPath(routes, path);
    setState({ pathname: path, routeName: matched?.name ?? null, params: matched?.params ?? {} });
  }, [routes]);

  const back = useCallback(() => {
    window.history.back();
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
