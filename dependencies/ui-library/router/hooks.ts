import { useRouterContext } from './context';

export interface RouterHandle {
  navigate: (name: string, params?: Record<string, string>) => void;
  replace: (name: string, params?: Record<string, string>) => void;
  back: () => void;
}

export function useRouter(): RouterHandle {
  const { navigate, replace, back } = useRouterContext();
  return { navigate, replace, back };
}

export function usePathname(): string {
  return useRouterContext().pathname;
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useRouterContext().params as T;
}
