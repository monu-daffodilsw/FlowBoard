import { SVGAttributes } from 'react';
import { cn } from '../utils/utils';

export interface SvgProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
  size?: number;
}

/** WEB: renders a native <svg> element */
export function Svg({ className, size, width, height, children, ...props }: SvgProps) {
  return (
    <svg
      width={size ?? width}
      height={size ?? height}
      className={cn(className)}
      {...props}
    >
      {children}
    </svg>
  );
}
