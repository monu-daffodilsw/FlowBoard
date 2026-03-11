'use client';
import React from 'react';
import { useRouterContext } from './context';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}

export function Link({ to, params, children, onClick, ...rest }: LinkProps) {
  const { navigate, buildPath } = useRouterContext();
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
