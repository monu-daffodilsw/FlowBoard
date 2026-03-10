'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation';
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

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const nextRouter = useNextRouter();
  const nextPathname = useNextPathname();

  const [state, setState] = useState<RouterState>(() => {
    const matched = matchPath(nextPathname);
    return {
      pathname: nextPathname,
      routeName: matched?.name ?? null,
      params: matched?.params ?? {},
    };
  });

  // Sync whenever Next.js pathname changes (browser back/forward, Next.js navigation)
  useEffect(() => {
    const matched = matchPath(nextPathname);
    setState({
      pathname: nextPathname,
      routeName: matched?.name ?? null,
      params: matched?.params ?? {},
    });
  }, [nextPathname]);

  const navigate = useCallback(
    (name: RouteName, params?: Record<string, string>) => {
      nextRouter.push(buildPath(name, params));
    },
    [nextRouter],
  );

  const replace = useCallback(
    (name: RouteName, params?: Record<string, string>) => {
      nextRouter.replace(buildPath(name, params));
    },
    [nextRouter],
  );

  const back = useCallback(() => {
    nextRouter.back();
  }, [nextRouter]);

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
