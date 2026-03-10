import { ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  source: { uri: string } | number; // RN-style source prop
  className?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

const resizeModeMap: Record<string, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  stretch: 'object-fill',
  center: 'object-none',
};

/**
 * WEB: renders an <img>; accepts RN-style source={{ uri }} or plain string
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ source, className, resizeMode = 'cover', alt = '', ...props }, ref) => {
    const src = typeof source === 'object' && 'uri' in source ? source.uri : '';
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(resizeModeMap[resizeMode], className)}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';
