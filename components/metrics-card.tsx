'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const gradientMap = {
  default:  'from-gray-500 to-gray-600',
  primary:  'from-indigo-500 to-violet-600',
  success:  'from-emerald-500 to-green-600',
  warning:  'from-amber-500 to-orange-500',
  danger:   'from-rose-500 to-red-600',
};

const textColorMap = {
  default:  'text-gray-800',
  primary:  'text-indigo-700',
  success:  'text-emerald-700',
  warning:  'text-amber-700',
  danger:   'text-rose-700',
};

const bgGlowMap = {
  default:  'rgba(107,114,128,0.06)',
  primary:  'rgba(99,102,241,0.08)',
  success:  'rgba(16,185,129,0.08)',
  warning:  'rgba(245,158,11,0.08)',
  danger:   'rgba(239,68,68,0.08)',
};

export function MetricsCard({
  label,
  value,
  icon,
  variant = 'default',
  trend,
  trendValue,
  className,
}: MetricsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/70 p-6 transition-all duration-200',
        className
      )}
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: `0 4px 24px ${bgGlowMap[variant]}, 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)`,
      }}
    >
      {/* Subtle gradient bg layer */}
      <div
        className="absolute inset-0 opacity-5 rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${gradientMap[variant].replace('from-', '').replace(' to-', ', ')})` }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
          {icon && (
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientMap[variant]} shadow-md`}>
              <span className="text-white [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className={cn('text-4xl font-black tracking-tight', textColorMap[variant])}>
          {value}
        </div>

        {/* Trend */}
        {trend && trendValue && (
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className={cn(
                'text-xs font-bold px-2.5 py-1 rounded-full',
                trend === 'up'      && 'bg-emerald-100 text-emerald-700',
                trend === 'down'    && 'bg-rose-100 text-rose-700',
                trend === 'neutral' && 'bg-gray-100 text-gray-600'
              )}
            >
              {trend === 'up' && '↑ '}
              {trend === 'down' && '↓ '}
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
