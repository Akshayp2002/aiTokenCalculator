'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InputPanel } from '@/components/input-panel';
import { ProviderSelector } from '@/components/provider-selector';
import { ResultsPanel } from '@/components/results-panel';
import { PromptOptimizer } from '@/components/prompt-optimizer';
import { Provider, estimateTokens } from '@/lib/tokenizer';
import { Button } from '@/components/ui/button';
import { Zap, Sparkles, Lock, Gauge, Bolt, Code2, ArrowRight, Flame, Brain, Infinity } from 'lucide-react';

const EXAMPLE_PROMPTS = [
  'You are an expert software engineer with 10 years of experience. Write clean, efficient, and well-documented code.',
  'Explain quantum computing to a 12-year-old child in a way that is fun and engaging.',
  'Write a comprehensive business plan for a sustainable fashion startup including market analysis, financial projections, and marketing strategy.',
];

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity as unknown as number }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity as unknown as number }}
          className="absolute -top-40 right-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity as unknown as number }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36"
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Powered by Advanced Tokenization</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-6 mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight gradient-text">
              AI Token Calculator
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              Instantly estimate tokens for OpenAI, Claude, Gemini and more. Manage costs, optimize prompts, and understand context windows with precision.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="gap-2 rounded-full px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-600/50 h-12"
            >
              <Zap className="w-5 h-5" />
              Try Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full px-8 h-12 border-purple-500/50 text-slate-200 hover:bg-purple-500/10"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Trust Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 py-8 border-t border-b border-slate-700/50"
          >
            {[
              { name: 'OpenAI', icon: '◆' },
              { name: 'Anthropic', icon: '◈' },
              { name: 'Google', icon: '◇' },
              { name: 'Meta', icon: '◊' },
              { name: 'Ollama', icon: '◉' },
            ].map((provider, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span className="text-xl">{provider.icon}</span>
                <span className="text-sm font-medium">{provider.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* BENTO GRID SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative px-6 sm:px-8 lg:px-12 py-20 sm:py-28"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Power-Packed Calculator</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to optimize your AI prompts in one beautiful interface
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
            {/* LARGE INPUT CARD - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 md:row-span-2"
            >
              <div className="h-full rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/80 to-purple-900/30 backdrop-blur-xl p-8 shadow-2xl hover:border-purple-400/50 transition-all">
                <InputPanel
                  text={text}
                  onTextChange={setText}
                  provider={provider}
                  isMonospace={isMonospace}
                  onMonospaceChange={setIsMonospace}
                  examplePrompts={EXAMPLE_PROMPTS}
                  onExampleSelect={setText}
                />
              </div>
            </motion.div>

            {/* TOKEN STATS - 2 cards side by side */}
            {text && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="lg:col-span-1"
                >
                  <StatsCard
                    label="Input Tokens"
                    value={estimateTokens(text, provider).toString()}
                    icon={Zap}
                    gradient="from-blue-600 to-cyan-600"
                    trend="static"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="lg:col-span-1"
                >
                  <StatsCard
                    label="Output Tokens"
                    value={outputTokens.toString()}
                    icon={Flame}
                    gradient="from-orange-600 to-red-600"
                    trend="static"
                  />
                </motion.div>
              </>
            )}

            {/* PROVIDER SELECTOR - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-cyan-900/20 backdrop-blur-xl p-8 h-full shadow-2xl hover:border-cyan-400/50 transition-all">
                <ProviderSelector
                  selectedProvider={provider}
                  onProviderChange={setProvider}
                  selectedModel={model}
                  onModelChange={setModel}
                />
              </div>
            </motion.div>

            {/* CONTEXT USAGE - spans 2 cols */}
            {text && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <ContextCard
                  text={text}
                  provider={provider}
                  outputTokens={outputTokens}
                  contextWindow={contextWindow}
                  onContextWindowChange={setContextWindow}
                />
              </motion.div>
            )}

            {/* TOTAL TOKENS HIGHLIGHT */}
            {text && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="rounded-3xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-xl p-8 h-full shadow-2xl">
                  <div className="space-y-3">
                    <h3 className="text-slate-300 text-sm font-medium">Total Tokens</h3>
                    <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                      {estimateTokens(text, provider) + outputTokens}
                    </div>
                    <p className="text-slate-400 text-sm">Combined input & output</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* RESULTS PANEL - Full Width */}
      {text && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative px-6 sm:px-8 lg:px-12 py-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-br from-slate-900/80 to-indigo-900/20 backdrop-blur-xl p-8 shadow-2xl">
              <ResultsPanel
                text={text}
                provider={provider}
                outputTokens={outputTokens}
                onOutputTokensChange={setOutputTokens}
                contextWindow={contextWindow}
                onContextWindowChange={setContextWindow}
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* FEATURES SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative px-6 sm:px-8 lg:px-12 py-20 sm:py-28"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Why Choose Us?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Trusted by developers and AI teams worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bolt, title: 'Instant Results', desc: 'Real-time token counting without delays', color: 'from-blue-600 to-cyan-600' },
              { icon: Code2, title: 'Multi-Model', desc: 'Support for GPT-4, Claude, Gemini & more', color: 'from-purple-600 to-pink-600' },
              { icon: Gauge, title: 'Context Analysis', desc: 'Understand your token limits precisely', color: 'from-green-600 to-cyan-600' },
              { icon: Sparkles, title: 'Smart Optimization', desc: 'Reduce token usage intelligently', color: 'from-yellow-600 to-orange-600' },
              { icon: Lock, title: '100% Private', desc: 'All calculations happen locally', color: 'from-red-600 to-pink-600' },
              { icon: Infinity, title: 'Always Free', desc: 'No registration or limits ever', color: 'from-indigo-600 to-purple-600' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur p-6 hover:border-slate-600 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROMPT OPTIMIZER */}
      {text && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative px-6 sm:px-8 lg:px-12 py-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-slate-900/80 to-amber-900/20 backdrop-blur-xl p-8 shadow-2xl">
              <PromptOptimizer
                text={text}
                onOptimizedTextApply={setText}
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* FAQ SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative px-6 sm:px-8 lg:px-12 py-20 sm:py-28"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white">FAQs</h2>
            <p className="text-slate-400 text-lg">
              Common questions about our token calculator
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'How accurate are the estimates?', a: 'Our estimates match official tokenizers with 95%+ accuracy for all supported models.' },
              { q: 'Is my data private?', a: 'Absolutely. All calculations happen in your browser. No data is sent to servers.' },
              { q: 'Which models are supported?', a: 'We support OpenAI GPT, Anthropic Claude, Google Gemini, Meta Llama, and Ollama models.' },
              { q: 'Why do token counts differ by model?', a: 'Different models use different tokenization algorithms. We implement each one accurately.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur p-6 hover:border-slate-600 transition-all"
              >
                <h3 className="font-bold text-white mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative px-6 sm:px-8 lg:px-12 py-16 border-t border-slate-700/50 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-bold text-white">TokenCalc</span>
              </div>
              <p className="text-slate-400 text-sm">
                Advanced token estimation for AI developers
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'How it Works', 'Pricing'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
              { title: 'Resources', links: ['Docs', 'Blog', 'Discord'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm">
            <p>© 2024 Token Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for stats cards
function StatsCard({
  label,
  value,
  icon: Icon,
  gradient,
  trend,
}: {
  label: string;
  value: string;
  icon: any;
  gradient: string;
  trend?: 'up' | 'down' | 'static';
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`rounded-2xl border-2 border-transparent bg-gradient-to-br ${gradient} opacity-20 hover:opacity-30 transition-opacity p-6 relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-900/70 rounded-2xl" />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">{label}</span>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="text-4xl font-black text-white">{value}</div>

        {trend && (
          <p className="text-xs text-slate-400">
            {trend === 'up' && '↑ Increasing'}
            {trend === 'down' && '↓ Decreasing'}
            {trend === 'static' && '→ Estimated'}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Context card component
function ContextCard({
  text,
  provider,
  outputTokens,
  contextWindow,
  onContextWindowChange,
}: {
  text: string;
  provider: Provider;
  outputTokens: number;
  contextWindow: number;
  onContextWindowChange: (value: number) => void;
}) {
  const totalTokens = estimateTokens(text, provider) + outputTokens;
  const usagePercentage = Math.min((totalTokens / contextWindow) * 100, 100);

  return (
    <div className="rounded-3xl border-2 border-green-500/30 bg-gradient-to-br from-slate-900/80 to-green-900/20 backdrop-blur-xl p-8 h-full shadow-2xl">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Gauge className="w-5 h-5 text-green-400" />
          Context Window
        </h3>

        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-slate-300">Usage Efficiency</span>
            <span className="text-green-400 font-semibold">{Math.round(usagePercentage)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePercentage}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[4000, 8000, 16000, 32000].map((preset) => (
            <button
              key={preset}
              onClick={() => onContextWindowChange(preset)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                contextWindow === preset
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {preset / 1000}K
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
