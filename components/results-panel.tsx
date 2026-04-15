'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Gauge, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { MetricsCard } from './metrics-card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getContextWindowStatus, Provider, estimateTokens } from '@/lib/tokenizer';
import { formatNumber } from '@/lib/utils';

interface ResultsPanelProps {
  text: string;
  provider: Provider;
  outputTokens?: number;
  onOutputTokensChange?: (tokens: number) => void;
  contextWindow?: number;
  onContextWindowChange?: (window: number) => void;
}

export function ResultsPanel({
  text,
  provider,
  outputTokens = 256,
  onOutputTokensChange,
  contextWindow = 4000,
  onContextWindowChange,
}: ResultsPanelProps) {
  const inputTokens = estimateTokens(text, provider);
  const totalTokens = inputTokens + outputTokens;
  const contextStatusResult = getContextWindowStatus(totalTokens, contextWindow);
  const contextStatus = contextStatusResult.status;
  const usagePercentage = Math.min((totalTokens / contextWindow) * 100, 100);

  const statusConfig = {
    safe: {
      label: 'Safe',
      color: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
      icon: CheckCircle,
    },
    caution: {
      label: 'Caution',
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-100',
      icon: AlertCircle,
    },
    danger: {
      label: 'Over Limit',
      color: 'from-rose-500 to-red-600',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-100',
      icon: AlertCircle,
    },
  };

  const status = statusConfig[contextStatus];
  const StatusIcon = status.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5 p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Analysis</h2>
        <p className="text-sm text-gray-400">Live token usage breakdown</p>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <MetricsCard
          label="Input Tokens"
          value={formatNumber(inputTokens)}
          icon={<Zap className="h-4 w-4" />}
          variant="primary"
        />
        <MetricsCard
          label="Output Tokens"
          value={formatNumber(outputTokens)}
          icon={<TrendingUp className="h-4 w-4" />}
          variant="warning"
        />
      </motion.div>

      {/* Total Tokens */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
        }}
      >
        {/* Floating orb */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />

        <div className="relative z-10">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">Total Tokens</p>
          <motion.h3
            key={totalTokens}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-black text-white leading-none mb-1"
          >
            {formatNumber(totalTokens)}
          </motion.h3>
          <p className="text-xs text-white/60">
            {totalTokens === 0 ? 'Enter a prompt to calculate' : 'Input + expected output tokens'}
          </p>
        </div>
      </motion.div>

      {/* Context Window Usage */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-gray-100 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)' }}
      >
        <div className="p-5 space-y-4">
          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md">
              <Gauge className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Context Window Usage</h3>
          </div>

          {/* Status badge */}
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${status.bg} ${status.border}`}>
            <StatusIcon className={`w-4 h-4 ${status.text} flex-shrink-0`} />
            <span className={`text-xs font-bold ${status.text}`}>
              {status.label} — {Math.round(usagePercentage)}% usage
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span className="font-semibold text-gray-700">
                {formatNumber(totalTokens)} / {formatNumber(contextWindow)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usagePercentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${status.color}`}
              />
            </div>
          </div>

          {/* Context Window Size presets */}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Context Window Size</p>
            <div className="grid grid-cols-4 gap-2">
              {[4000, 8000, 16000, 32000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => onContextWindowChange?.(preset)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    contextWindow === preset
                      ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  {preset / 1000}K
                </button>
              ))}
            </div>
            <Input
              type="number"
              min={100}
              max={200000}
              value={contextWindow}
              onChange={(e) => onContextWindowChange?.(Math.max(100, parseInt(e.target.value) || 0))}
              className="h-9 text-xs rounded-xl border-gray-200 bg-gray-50 focus:border-indigo-300"
              placeholder="Custom context window..."
            />
          </div>
        </div>
      </motion.div>

      {/* Output Tokens Configuration */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-gray-100 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)' }}
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Expected Output</h3>
          </div>

          <Slider
            min={10}
            max={4000}
            step={10}
            value={outputTokens}
            onChange={(value) => onOutputTokensChange?.(value)}
            label="Adjust estimated output tokens"
          />

          <div className="flex flex-wrap gap-2">
            {[128, 256, 512, 1024, 2048].map((preset) => (
              <button
                key={preset}
                onClick={() => onOutputTokensChange?.(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  outputTokens === preset
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                {formatNumber(preset)}
              </button>
            ))}
          </div>

          <Input
            type="number"
            min={10}
            max={4000}
            value={outputTokens}
            onChange={(e) => onOutputTokensChange?.(Math.max(10, parseInt(e.target.value) || 0))}
            className="h-9 text-xs rounded-xl border-gray-200 bg-gray-50 focus:border-amber-300"
            placeholder="Custom output tokens..."
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
