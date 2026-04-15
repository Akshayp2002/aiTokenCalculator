'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
        variant === 'default' && 'bg-primary text-primary-foreground ring-primary',
        variant === 'secondary' &&
          'bg-secondary text-secondary-foreground ring-secondary',
        variant === 'destructive' &&
          'bg-destructive text-destructive-foreground ring-destructive',
        variant === 'outline' &&
          'text-foreground ring-border bg-background hover:bg-accent',
        variant === 'success' &&
          'bg-green-100/10 text-green-700 dark:text-green-400 ring-green-500/20',
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';

export { Badge };
