import { ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-32 h-32',
};

export function Avatar({ className, size = 'md', alt = '', ...props }: AvatarProps) {
  return (
    <img
      className={cn(
        'rounded-full object-cover border border-border',
        sizeMap[size],
        className
      )}
      alt={alt}
      {...props}
    />
  );
}
