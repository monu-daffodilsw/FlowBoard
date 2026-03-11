import { createElement, ReactNode } from 'react';
import { RouterProvider as LibRouterProvider, useRouter as useLibRouter } from '@ui-library';
import { routes } from './routes';
import type { RouteName } from './routes';

/** Project-specific RouterProvider — pre-bound with FlowBoard routes. */
export function RouterProvider({ children, initialPath }: { children: ReactNode; initialPath?: string }) {
  return createElement(LibRouterProvider, { routes, initialPath, children });
}

/** Typed useRouter — navigate/replace accept RouteName instead of plain string. */
export function useRouter() {
  const handle = useLibRouter();
  return {
    navigate: (name: RouteName, params?: Record<string, string>) => handle.navigate(name, params),
    replace: (name: RouteName, params?: Record<string, string>) => handle.replace(name, params),
    back: handle.back,
  };
}

export { useRouterContext, usePathname, useParams, Link } from '@ui-library';
export type { RouterHandle, LinkProps, RouterContextValue } from '@ui-library';
export { buildPath, matchPath, routes } from './routes';
export type { RouteName } from './routes';
