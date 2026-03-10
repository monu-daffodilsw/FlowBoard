import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps as RNProps } from 'react-native';

export interface ActivityIndicatorProps extends RNProps {
  className?: string;
}

/** NATIVE: React Native ActivityIndicator */
export function ActivityIndicator({ className, ...props }: ActivityIndicatorProps) {
  return <RNActivityIndicator {...props} />;
}
