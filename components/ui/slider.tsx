'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value,
      onChange,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full space-y-2'>
        {label && (
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(parseInt(e.target.value, 10))}
          className={cn(
            'w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
