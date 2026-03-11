import { Circle as RNCircle, CircleProps as RNCircleProps } from 'react-native-svg';

export interface CircleProps extends RNCircleProps {}

/** NATIVE: renders react-native-svg Circle */
export function Circle(props: CircleProps) {
  return <RNCircle {...props} />;
}
