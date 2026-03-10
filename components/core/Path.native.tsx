import { Path as RNPath, PathProps as RNPathProps } from 'react-native-svg';

export interface PathProps extends RNPathProps {}

/** NATIVE: renders react-native-svg Path */
export function Path(props: PathProps) {
  return <RNPath {...props} />;
}
