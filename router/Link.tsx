'use client';
import React from 'react';
import { useRouterContext } from './context';
import { buildPath, type RouteName } from './routes';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: RouteName;
  params?: Record<string, string>;
  children: React.ReactNode;
}

/**
 * Platform-agnostic Link component.
 * On web: renders a real <a> tag (SEO-friendly, correct browser behaviour).
 * On native: swap this file for a Pressable-based implementation.
 */
export function Link({ to, params, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouterContext();
  const href = buildPath(to, params);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(to, params);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
