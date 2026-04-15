'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InputPanel } from '@/components/input-panel';
import { ProviderSelector } from '@/components/provider-selector';
import { ResultsPanel } from '@/components/results-panel';
import { Provider, estimateTokens } from '@/lib/tokenizer';
import { ArrowLeft, Zap, Cpu } from 'lucide-react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

export default function Calculator() {
  const [text, setText] = useState('');
  const [provider, setProvider] = useState<Provider>('openai');
  const [model, setModel] = useState('GPT-4');
  const [isMonospace, setIsMonospace] = useState(false);
  const [outputTokens, setOutputTokens] = useState(256);
  const [contextWindow, setContextWindow] = useState(4000);

  useEffect(() => {
    const saved = localStorage.getItem('tokenCalcState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setText(state.text || '');
        setProvider(state.provider || 'openai');
        setModel(state.model || 'GPT-4');
        setOutputTokens(state.outputTokens || 256);
        setContextWindow(state.contextWindow || 4000);
      } catch (e) {
        console.error('Failed to load saved state');
      }
    }
  }, []);

  useEffect(() => {
    const state = { text, provider, model, outputTokens, contextWindow };
    localStorage.setItem('tokenCalcState', JSON.stringify(state));
  }, [text, provider, model, outputTokens, contextWindow]);

  const liveTokens = estimateTokens(text, provider);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 15% -5%, rgba(99,102,241,0.13) 0%, transparent 55%),
          radial-gradient(ellipse 55% 45% at 85% 105%, rgba(6,182,212,0.11) 0%, transparent 55%),
          radial-gradient(ellipse 45% 55% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 65%),
          #f6f6fc
        `,
      }}
    >
      {/* ============================================================
          STICKY CALCULATOR HEADER
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '0 1px 20px rgba(99,102,241,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </Link>

          {/* Title & live badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <h1 className="text-base font-extrabold text-gray-900 tracking-tight">Token Calculator</h1>
            </div>

            {/* Live token count pill */}
            {text && (
              <motion.div
                key={liveTokens}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  boxShadow: '0 2px 10px rgba(99,102,241,0.3)',
                }}
              >
                <Cpu className="w-3 h-3" />
                {formatNumber(liveTokens)} tokens
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span className="hidden sm:block">Model:</span>
            <span className="text-indigo-600 font-semibold">{model}</span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          MAIN CONTENT
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* ========== LEFT COLUMN (2/3) ========== */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Input Panel */}
            <div
              className="rounded-3xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 4px 30px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <InputPanel
                text={text}
                onTextChange={setText}
                provider={provider}
                isMonospace={isMonospace}
                onMonospaceChange={setIsMonospace}
                examplePrompts={[
                  'You are a helpful AI assistant. Answer the user\'s questions clearly and concisely, providing examples where helpful.',
                  'Write a comprehensive blog post about the future of artificial intelligence and its impact on society, covering both benefits and risks.',
                  'You are an expert software engineer. Review the following code and suggest improvements for performance, readability, and security.',
                  'Analyze the following dataset and provide key insights, trends, and actionable recommendations for improving business outcomes.',
                ]}
                onExampleSelect={setText}
              />
            </div>

            {/* Provider Selector */}
            <div
              className="rounded-3xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 4px 30px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <ProviderSelector
                selectedProvider={provider}
                onProviderChange={setProvider}
                selectedModel={model}
                onModelChange={setModel}
              />
            </div>
          </motion.div>

          {/* ========== RIGHT COLUMN (1/3) ========== */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="lg:sticky lg:top-24"
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 4px 30px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              {text ? (
                <ResultsPanel
                  text={text}
                  provider={provider}
                  outputTokens={outputTokens}
                  onOutputTokensChange={setOutputTokens}
                  contextWindow={contextWindow}
                  onContextWindowChange={setContextWindow}
                />
              ) : (
                <motion.div
                  className="p-10 text-center space-y-5"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  >
                    <Zap className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-base">Ready to analyze</p>
                    <p className="text-gray-400 text-sm mt-1">Paste your prompt on the left to get started</p>
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-gray-400">
                    {['Token count', 'Context usage', 'Cost estimate'].map((f) => (
                      <div key={f} className="flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
