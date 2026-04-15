'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw, Wand2, Clipboard, Type } from 'lucide-react';
import { copyToClipboard, formatNumber } from '@/lib/utils';
import { estimateTokens, Provider } from '@/lib/tokenizer';
import { cn } from '@/lib/utils';

interface InputPanelProps {
  text: string;
  onTextChange: (text: string) => void;
  provider: Provider;
  isMonospace?: boolean;
  onMonospaceChange?: (isMonospace: boolean) => void;
  examplePrompts?: string[];
  onExampleSelect?: (example: string) => void;
}

export function InputPanel({
  text,
  onTextChange,
  provider,
  isMonospace = false,
  onMonospaceChange,
  examplePrompts = [],
  onExampleSelect,
}: InputPanelProps) {
  const [copied, setCopied] = useState(false);
  const charCount = text.length;
  const tokenCount = estimateTokens(text, provider);

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

  const handlePaste = async () => {
    try {
      const pastedText = await navigator.clipboard.readText();
      onTextChange(pastedText);
    } catch (error) {
      console.error('Failed to paste:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Your Prompt</h2>
          <p className="text-sm text-gray-400 mt-0.5">Paste or type your AI prompt to analyze token usage</p>
        </div>

        {/* Monospace toggle */}
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => onMonospaceChange?.(!isMonospace)}
            className={cn(
              'relative w-9 h-5 rounded-full transition-all duration-200 cursor-pointer',
              isMonospace
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500'
                : 'bg-gray-200'
            )}
          >
            <div
              className={cn(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
                isMonospace ? 'left-4' : 'left-0.5'
              )}
            />
          </div>
          <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors flex items-center gap-1">
            <Type className="w-3 h-3" /> Mono
          </span>
        </label>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap">
        {[
          { icon: Clipboard, label: 'Paste', action: handlePaste, disabled: false },
          { icon: Copy, label: copied ? 'Copied!' : 'Copy', action: handleCopy, disabled: !text },
          { icon: RotateCcw, label: 'Clear', action: handleClear, disabled: !text },
        ].map((btn) => {
          const Icon = btn.icon;
          return (
            <motion.button
              key={btn.label}
              onClick={btn.action}
              disabled={btn.disabled}
              whileHover={!btn.disabled ? { scale: 1.04 } : {}}
              whileTap={!btn.disabled ? { scale: 0.96 } : {}}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
                btn.disabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {btn.label}
            </motion.button>
          );
        })}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste your prompt here... e.g. 'You are an expert software engineer. Write clean, efficient code...'"
          className={cn(
            'w-full min-h-[360px] p-5 text-sm leading-relaxed resize-none rounded-2xl transition-all duration-200 outline-none',
            'bg-white/60 backdrop-blur-sm border border-gray-200/80',
            'placeholder:text-gray-300',
            'focus:bg-white/90 focus:border-indigo-300 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1),0_4px_20px_rgba(99,102,241,0.08)]',
            'hover:border-gray-300 hover:bg-white/70',
            isMonospace ? 'font-mono text-xs' : 'font-sans'
          )}
        />

        {/* Live counter badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 flex items-center gap-2.5 text-xs px-3.5 py-2 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <span className="font-semibold text-gray-700">{formatNumber(charCount)}</span>
          <span className="text-gray-400">chars</span>
          <span className="w-px h-3.5 bg-gray-200" />
          <span className="font-bold text-indigo-600">{formatNumber(tokenCount)}</span>
          <span className="text-gray-400">tokens</span>
        </motion.div>
      </div>

      {/* Example Prompts */}
      {!text && examplePrompts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-dashed border-indigo-200 p-6"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.04), rgba(6,182,212,0.03))' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="h-4 w-4 text-indigo-500" />
            <p className="text-sm font-semibold text-indigo-700">Try an example prompt</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examplePrompts.map((example, i) => (
              <motion.button
                key={i}
                onClick={() => onExampleSelect?.(example)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-left p-4 rounded-xl bg-white border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-sm shadow-sm hover:shadow-md group"
              >
                <p className="font-semibold text-gray-700 mb-1 group-hover:text-indigo-700 transition-colors text-xs uppercase tracking-wider">
                  Example {i + 1}
                </p>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {example.substring(0, 80)}...
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
