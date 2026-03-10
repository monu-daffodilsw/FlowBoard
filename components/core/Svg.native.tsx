import RNSvg, { SvgProps as RNSvgProps } from 'react-native-svg';

export interface SvgProps extends RNSvgProps {
  className?: string;
  size?: number;
}

/** NATIVE: renders react-native-svg Svg */
export function Svg({ size, width, height, children, ...props }: SvgProps) {
  return (
    <RNSvg width={size ?? width} height={size ?? height} {...props}>
      {children}
    </RNSvg>
  );
}
