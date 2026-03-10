import { createContext, useCallback, useContext, useState } from 'react';
import { RouteName, buildPath, matchPath } from './routes';

interface RouterState {
  pathname: string;
  routeName: RouteName | null;
  params: Record<string, string>;
}

export interface RouterContextValue extends RouterState {
  navigate: (name: RouteName, params?: Record<string, string>) => void;
  replace: (name: RouteName, params?: Record<string, string>) => void;
  back: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

// Native router: pure in-memory state, no URL bar
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RouterState>({
    pathname: '/login',
    routeName: 'login',
    params: {},
  });

  const navigate = useCallback((name: RouteName, params?: Record<string, string>) => {
    setState({ pathname: buildPath(name, params), routeName: name, params: params ?? {} });
  }, []);

  const replace = useCallback((name: RouteName, params?: Record<string, string>) => {
    setState({ pathname: buildPath(name, params), routeName: name, params: params ?? {} });
  }, []);

  const back = useCallback(() => {
    setState(prev => {
      const matched = matchPath(prev.pathname);
      const fallback: RouterState = { pathname: '/dashboard', routeName: 'dashboard', params: {} };
      return matched ? prev : fallback;
    });
  }, []);

  return (
    <RouterContext.Provider value={{ ...state, navigate, replace, back }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouterContext(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouterContext must be used within <RouterProvider>');
  return ctx;
}
