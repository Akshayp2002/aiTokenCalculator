'use client';

import { PROVIDERS, Provider } from '@/lib/tokenizer';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Brain, Cpu, Globe, Zap, Network, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProviderSelectorProps {
  selectedProvider: Provider;
  onProviderChange: (provider: Provider) => void;
  selectedModel?: string;
  onModelChange?: (model: string) => void;
}

const PROVIDER_META: Record<string, { 
  gradient: string; 
  glow: string; 
  icon: any; 
  bg: string;
  tagline: string;
}> = {
  general:   { gradient: 'from-slate-500 to-slate-700',   glow: 'rgba(71,85,105,0.2)',  icon: Network,  bg: 'bg-slate-50',    tagline: 'Standard count' },
  openai:    { gradient: 'from-emerald-500 to-teal-700',   glow: 'rgba(16,185,129,0.3)',  icon: Cpu,      bg: 'bg-emerald-50',  tagline: 'GPT-4 / 3.5' },
  anthropic: { gradient: 'from-amber-500 to-orange-600',   glow: 'rgba(245,158,11,0.3)',  icon: Brain,    bg: 'bg-amber-50',    tagline: 'Claude 3' },
  gemini:    { gradient: 'from-blue-500 to-cyan-600',      glow: 'rgba(59,130,246,0.3)',  icon: Sparkles, bg: 'bg-blue-50',     tagline: 'Google AI' },
  ollama:    { gradient: 'from-indigo-600 to-violet-800',  glow: 'rgba(99,102,241,0.3)',  icon: Box,      bg: 'bg-indigo-50',   tagline: 'Local LLMs' },
};

export function ProviderSelector({
  selectedProvider,
  onProviderChange,
  selectedModel,
  onModelChange,
}: ProviderSelectorProps) {
  const providers = Object.entries(PROVIDERS) as [Provider, any][];

  return (
    <div className="space-y-10 p-2 sm:p-6">
      {/* Section Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase text-xs">AI Intelligence Provider</h2>
        </div>
        <p className="text-sm text-gray-500 font-medium ml-10">Select an ecosystem to see optimized token estimates</p>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map(([key, provider]) => {
          const meta = PROVIDER_META[key] ?? PROVIDER_META.general;
          const isSelected = selectedProvider === key;
          const Icon = meta.icon;

          return (
            <motion.button
              key={key}
              onClick={() => {
                onProviderChange(key);
                if (onModelChange) onModelChange(provider.models[0]);
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group text-left"
            >
              <div
                className={cn(
                  "relative h-full transition-all duration-300 rounded-[2rem] p-5 border-2 overflow-hidden flex flex-col gap-4",
                  isSelected 
                    ? "bg-white border-transparent shadow-[0_20px_40px_rgba(0,0,0,0.06)]" 
                    : "bg-white/40 border-gray-100 hover:border-gray-200 hover:bg-white/60"
                )}
                style={isSelected ? { boxShadow: `0 10px 30px -10px ${meta.glow}, 0 4px 12px rgba(0,0,0,0.03)` } : {}}
              >
                {/* Active Indicator Backdrop */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      layoutId="activeGlow"
                      className={cn("absolute inset-0 opacity-[0.03] bg-gradient-to-br", meta.gradient)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.05 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-start justify-between relative z-10">
                  {/* Icon Badge */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                      "bg-gradient-to-br", meta.gradient,
                      isSelected ? "scale-110 -rotate-6" : "grayscale-[0.3] opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                    )}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200"
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>

                <div className="relative z-10 space-y-1">
                  <h3 className={cn("font-extrabold text-lg transition-colors", isSelected ? "text-gray-900" : "text-gray-600")}>
                    {provider.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{meta.tagline}</p>
                </div>
                
                {/* Visual Accent */}
                {isSelected && (
                  <motion.div 
                    layoutId="underline"
                    className={cn("h-1.5 w-12 rounded-full bg-gradient-to-r", meta.gradient)} 
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Model Selection area */}
      {selectedModel && onModelChange && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white/40 p-1 rounded-3xl border border-gray-100/50 backdrop-blur-xl"
        >
          <div className="p-6 pb-2">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Select Model Variant</h3>
            
            <div className="flex flex-wrap gap-2">
              {PROVIDERS[selectedProvider].models.map((model: string) => {
                const isActive = selectedModel === model;
                const meta = PROVIDER_META[selectedProvider] ?? PROVIDER_META.general;

                return (
                  <motion.button
                    key={model}
                    onClick={() => onModelChange(model)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 outline-none ",
                      isActive 
                        ? "text-white shadow-xl" 
                        : "text-gray-500 hover:text-gray-700 bg-white/60 border border-gray-100 hover:border-gray-200"
                    )}
                    style={isActive ? { 
                      background: `linear-gradient(135deg, #6366f1, #a855f7)`,
                      boxShadow: '0 8px 20px -6px rgba(99,102,241,0.5)'
                    } : {}}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeModel"
                        className="absolute inset-x-0 bottom-0 h-1 bg-white/30 rounded-full mx-4 mb-1"
                      />
                    )}
                    <span className="relative z-10">{model}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

