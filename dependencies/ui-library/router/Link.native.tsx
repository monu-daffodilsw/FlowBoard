import React from 'react';
import { useRouterContext } from './context';
import { Pressable } from '../core/Pressable';
import { Text } from '../core/Text';

export interface LinkProps {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
  style?: object;
}

export function Link({ to, params, children, className, style }: LinkProps) {
  const { navigate } = useRouterContext();
  const wrapped = typeof children === 'string'
    ? <Text className={className}>{children}</Text>
    : children;
  return (
    <Pressable
      onPress={() => navigate(to, params)}
      className={typeof children === 'string' ? undefined : className}
      style={style as any}
    >
      {wrapped}
    </Pressable>
  );
}
