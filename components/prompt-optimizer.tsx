'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { optimizePrompt } from '@/lib/tokenizer';
import { copyToClipboard, formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface PromptOptimizerProps {
  text: string;
  onOptimizedTextApply?: (text: string) => void;
}

export function PromptOptimizer({ text, onOptimizedTextApply }: PromptOptimizerProps) {
  const [showOptimized, setShowOptimized] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = optimizePrompt(text, {
    removeExtraWhitespace: true,
    normalizeLineBreaks: true,
    trimEmptyLines: true,
  });

  const handleCopy = async () => {
    await copyToClipboard(result.optimizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasReduction = result.reduction > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-base flex items-center gap-2'>
              <Sparkles className='h-4 w-4 text-yellow-500' />
              Prompt Optimization
            </CardTitle>
            {hasReduction && (
              <Badge variant='success'>
                Save {result.reductionPercentage}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          {hasReduction ? (
            <>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-secondary/30 rounded-lg border border-border/40'>
                <div className='text-center'>
                  <p className='text-lg font-bold text-red-500'>
                    {formatNumber(result.originalTokens)}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Original
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-lg font-bold text-green-600 dark:text-green-400'>
                    {formatNumber(result.optimizedTokens)}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Optimized
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-lg font-bold text-blue-500'>
                    {result.reduction}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Reduced
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-lg font-bold text-purple-500'>
                    {result.reductionPercentage}%
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Savings
                  </p>
                </div>
              </div>

              <div className='space-y-2'>
                {!showOptimized && (
                  <Button
                    onClick={() => setShowOptimized(true)}
                    className='w-full gap-2'
                  >
                    <Sparkles className='h-4 w-4' />
                    Show Optimized Text
                  </Button>
                )}

                {showOptimized && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='space-y-2'
                  >
                    <div className='p-3 bg-card rounded-lg border border-border/40 text-sm max-h-40 overflow-y-auto font-mono text-xs whitespace-pre-wrap break-words'>
                      {result.optimizedText}
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => setShowOptimized(false)}
                      >
                        Hide
                      </Button>
                      <Button
                        size='sm'
                        onClick={handleCopy}
                        className='gap-2 flex-1'
                      >
                        <Copy className='h-4 w-4' />
                        {copied ? 'Copied' : 'Copy Optimized'}
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => onOptimizedTextApply?.(result.optimizedText)}
                      >
                        Apply
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <div className='p-4 text-center text-sm text-muted-foreground bg-secondary/20 rounded-lg'>
              <p>Prompt is already optimized!</p>
              <p className='text-xs mt-1'>No extra whitespace or empty lines detected</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
