import React from 'react';
import { useRouterContext } from './context';
import { type RouteName } from './routes';
import { Pressable } from '@/components/core/Pressable';
import { Text } from '@/components/core/Text';

export interface LinkProps {
  to: RouteName;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
  style?: object;
}

/**
 * NATIVE: Pressable that navigates via the custom router.
 * Bare string children are automatically wrapped in <Text> (RN requirement).
 */
export function Link({ to, params, children, className, style }: LinkProps) {
  const { navigate } = useRouterContext();
  const wrapped = typeof children === 'string'
    ? <Text className={className}>{children}</Text>
    : children;
  return (
    <Pressable onPress={() => navigate(to, params)} className={typeof children === 'string' ? undefined : className} style={style as any}>
      {wrapped}
    </Pressable>
  );
}
