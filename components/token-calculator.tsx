'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getTextStats, estimateTokens, Provider } from '@/lib/tokenizer';
import { copyToClipboard, formatNumber } from '@/lib/utils';
import { Copy, RotateCcw } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TokenCalculatorProps {
  text: string;
  onTextChange: (text: string) => void;
  provider: Provider;
  isMonospace?: boolean;
  onMonospaceChange?: (isMonospace: boolean) => void;
}

export function TokenCalculator({
  text,
  onTextChange,
  provider,
  isMonospace = false,
  onMonospaceChange,
}: TokenCalculatorProps) {
  const stats = getTextStats(text);
  const tokens = estimateTokens(text, provider);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleClear = () => {
    if (text && !confirm('Clear all text?')) return;
    onTextChange('');
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h2 className='text-lg font-semibold mb-1'>Your Prompt</h2>
          <p className='text-sm text-muted-foreground'>
            Paste or type your prompt to get started
          </p>
        </div>
        <div className='flex items-center gap-2 w-full sm:w-auto'>
          <label className='flex items-center gap-2 text-sm font-medium cursor-pointer'>
            <input
              type='checkbox'
              checked={isMonospace}
              onChange={(e) => onMonospaceChange?.(e.target.checked)}
              className='rounded border border-border'
              aria-label='Use monospace font'
            />
            <span>Monospace</span>
          </label>
        </div>
      </div>

      <div className='relative'>
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste your prompt here... Try: 'You are an expert software engineer...'"
          className={`min-h-[300px] text-base leading-relaxed focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
            isMonospace ? 'font-mono' : 'font-sans'
          }`}
        />

        <div className='absolute bottom-4 right-4 flex gap-2'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleCopy}
              title='Copy text'
              className='gap-2'
            >
              <Copy className='h-4 w-4' />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClear}
              title='Clear text'
            >
              <RotateCcw className='h-4 w-4' />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-secondary/30 rounded-lg border border-border/40'
      >
        <div className='text-center'>
          <p className='text-2xl font-bold text-primary'>
            {formatNumber(stats.characters)}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Characters</p>
        </div>
        <div className='text-center'>
          <p className='text-2xl font-bold text-accent'>
            {formatNumber(stats.words)}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Words</p>
        </div>
        <div className='text-center'>
          <p className='text-2xl font-bold text-blue-500'>
            {formatNumber(stats.lines)}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Lines</p>
        </div>
        <div className='text-center'>
          <p className='text-2xl font-bold text-purple-500'>
            {formatNumber(tokens)}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Tokens</p>
        </div>
      </motion.div>
    </div>
  );
}
