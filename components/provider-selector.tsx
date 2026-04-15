'use client';

import { Button } from '@/components/ui/button';
import { PROVIDERS, Provider } from '@/lib/tokenizer';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProviderSelectorProps {
  selectedProvider: Provider;
  onProviderChange: (provider: Provider) => void;
  selectedModel?: string;
  onModelChange?: (model: string) => void;
}

const PROVIDER_COLORS: Record<string, { gradient: string; glow: string; emoji: string }> = {
  openai:    { gradient: 'from-emerald-500 to-teal-600',   glow: 'rgba(16,185,129,0.25)',  emoji: '🤖' },
  anthropic: { gradient: 'from-amber-500 to-orange-500',   glow: 'rgba(245,158,11,0.25)',  emoji: '🧠' },
  google:    { gradient: 'from-blue-500 to-cyan-500',      glow: 'rgba(59,130,246,0.25)',  emoji: '✨' },
  meta:      { gradient: 'from-indigo-500 to-violet-600',  glow: 'rgba(99,102,241,0.25)',  emoji: '🌐' },
  mistral:   { gradient: 'from-rose-500 to-pink-600',      glow: 'rgba(244,63,94,0.25)',   emoji: '💠' },
  ollama:    { gradient: 'from-gray-600 to-gray-800',      glow: 'rgba(75,85,99,0.25)',    emoji: '🦙' },
};

function getProviderStyle(key: string) {
  return PROVIDER_COLORS[key] ?? { gradient: 'from-indigo-500 to-violet-600', glow: 'rgba(99,102,241,0.25)', emoji: '⚡' };
}

export function ProviderSelector({
  selectedProvider,
  onProviderChange,
  selectedModel,
  onModelChange,
}: ProviderSelectorProps) {
  const providers = Object.entries(PROVIDERS) as [Provider, any][];

  return (
    <div className="space-y-8 p-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">AI Provider</h2>
        <p className="text-sm text-gray-400 mt-0.5">Choose your preferred AI model provider</p>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {providers.map(([key, provider]) => {
          const style = getProviderStyle(key);
          const isSelected = selectedProvider === key;

          return (
            <motion.button
              key={key}
              onClick={() => {
                onProviderChange(key);
                if (onModelChange) onModelChange(provider.models[0]);
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative"
            >
              <div
                className="relative rounded-2xl p-4 text-center transition-all duration-200 border overflow-hidden"
                style={
                  isSelected
                    ? {
                        background: 'rgba(255,255,255,0.9)',
                        borderColor: 'transparent',
                        boxShadow: `0 0 0 2px rgba(99,102,241,0.6), 0 8px 24px ${style.glow}`,
                        backdropFilter: 'blur(12px)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.6)',
                        borderColor: 'rgba(229,231,235,0.8)',
                        backdropFilter: 'blur(8px)',
                      }
                }
              >
                {/* Gradient background when selected */}
                {isSelected && (
                  <motion.div
                    layoutId="providerBg"
                    className={`absolute inset-0 opacity-10 bg-gradient-to-br ${style.gradient}`}
                    transition={{ type: 'spring', stiffness: 100 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-3">
                  {/* Emoji / Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${style.gradient} shadow-md`}
                  >
                    {style.emoji}
                  </div>

                  <p className={`font-semibold text-sm ${isSelected ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {provider.name}
                  </p>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Model Selection */}
      {selectedModel && onModelChange && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Model</h3>
            <p className="text-sm text-gray-400">Select a specific model variant</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PROVIDERS[selectedProvider].models.map((model: string) => {
              const isActive = selectedModel === model;
              const style = getProviderStyle(selectedProvider);
              return (
                <motion.button
                  key={model}
                  onClick={() => onModelChange(model)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
                          color: 'white',
                          boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.7)',
                          color: '#4b5563',
                          border: '1px solid rgba(229,231,235,0.8)',
                          backdropFilter: 'blur(8px)',
                        }
                  }
                >
                  {model}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
