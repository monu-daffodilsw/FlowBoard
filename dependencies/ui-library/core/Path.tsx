import { SVGAttributes } from 'react';

export interface PathProps extends SVGAttributes<SVGPathElement> {}

/** WEB: renders a native <path> inside an SVG */
export function Path(props: PathProps) {
  return <path {...props} />;
}
