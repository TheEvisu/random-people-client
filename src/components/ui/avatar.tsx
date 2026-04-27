import { ComponentProps, useState } from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends ComponentProps<'img'> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-32 h-32',
};

const textClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-xl',
};

function initials(alt: string) {
  return alt
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ className, size = 'md', alt = '', ...props }: AvatarProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          'rounded-full border border-border bg-muted flex items-center justify-center font-semibold text-muted-foreground shrink-0',
          sizeClasses[size],
          textClasses[size],
          className
        )}
      >
        {initials(alt)}
      </div>
    );
  }

  return (
    <img
      className={cn(
        'rounded-full object-cover border border-border shrink-0',
        sizeClasses[size],
        className
      )}
      alt={alt}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
