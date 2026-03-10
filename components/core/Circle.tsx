import { SVGAttributes } from 'react';

export interface CircleProps extends SVGAttributes<SVGCircleElement> {}

/** WEB: renders a native <circle> inside an SVG */
export function Circle(props: CircleProps) {
  return <circle {...props} />;
}
