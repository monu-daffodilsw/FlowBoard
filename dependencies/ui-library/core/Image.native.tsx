import { Image as RNImage, ImageProps as RNImageProps } from 'react-native';
import { forwardRef } from 'react';

export interface ImageProps extends RNImageProps {
  className?: string;
}

/**
 * NATIVE: renders a React Native <Image>
 */
export const Image = forwardRef<RNImage, ImageProps>(
  (props, ref) => <RNImage ref={ref} {...props} />
);
Image.displayName = 'Image';
