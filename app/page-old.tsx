'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InputPanel } from '@/components/input-panel';
import { ProviderSelector } from '@/components/provider-selector';
import { ResultsPanel } from '@/components/results-panel';
import { PromptOptimizer } from '@/components/prompt-optimizer';
import { Provider } from '@/lib/tokenizer';
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
    // Load from LocalStorage if available
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
    // Save to LocalStorage
    const state = {
      text,
      provider,
      model,
      outputTokens,
      contextWindow,
    };
    localStorage.setItem('tokenCalcState', JSON.stringify(state));
  }, [text, provider, model, outputTokens, contextWindow]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-purple-900/30 dark:to-blue-900/20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-28"
      >
        {/* Background Decoration - Multiple Vibrant Glows */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full blur-3xl opacity-40 dark:opacity-30 animate-pulse" />
          <div className="absolute -top-40 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl opacity-30 dark:opacity-20" />
          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-tr from-pink-300 to-purple-400 rounded-full blur-3xl opacity-20 dark:opacity-15" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="inline-flex items-center justify-center"
          >
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-400/40 via-blue-400/30 to-cyan-400/20 border-2 border-purple-500/50 shadow-lg shadow-purple-500/30 dark:shadow-purple-600/40">
              <Zap className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400">
                AI Token Calculator
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Instantly estimate tokens for OpenAI GPT, Anthropic Claude, Google Gemini, Ollama, and
              more. Calculate costs, manage context windows, and optimize your AI prompts.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="gap-2 rounded-xl px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/40 glow-primary">
              <Zap className="h-5 w-5" />
              Start Calculating
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl px-8 border-2 border-purple-400 dark:border-purple-500 hover:border-blue-400 dark:hover:border-blue-400 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Calculator Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 space-y-16"
      >
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Input & Provider */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            {/* Input Panel */}
            <InputPanel
              text={text}
              onTextChange={setText}
              provider={provider}
              isMonospace={isMonospace}
              onMonospaceChange={setIsMonospace}
              examplePrompts={EXAMPLE_PROMPTS}
              onExampleSelect={setText}
            />

            {/* Provider Selector */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border-2 border-gradient-to-r from-purple-400 to-blue-400 dark:border-purple-600/50 p-8 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-slate-900/40 dark:via-purple-900/20 dark:to-slate-900/40 backdrop-blur-xl shadow-xl shadow-purple-200/20 dark:shadow-purple-950/30"
            >
              <ProviderSelector
                selectedProvider={provider}
                onProviderChange={setProvider}
                selectedModel={model}
                onModelChange={setModel}
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Results */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="sticky top-24 rounded-2xl border-2 border-dashed border-gradient-to-br from-purple-300 to-blue-300 dark:border-purple-700/50 p-8 bg-gradient-to-br from-purple-50/40 via-blue-50/20 to-cyan-50/30 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-cyan-900/10 text-center space-y-4 shadow-lg shadow-purple-200/10 dark:shadow-purple-950/20"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-lg shadow-purple-400/50">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">Ready to analyze</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Enter your prompt in the text area to see detailed token analysis and insights
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Prompt Optimizer */}
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <PromptOptimizer
              text={text}
              onOptimizedTextApply={setText}
            />
          </motion.div>
        )}
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-200px' }}
        className="relative py-16 sm:py-20 lg:py-28 border-t border-purple-200 dark:border-purple-900/50 bg-gradient-to-b from-white dark:from-slate-900/50 via-blue-50/50 dark:via-blue-900/20 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Why Choose Our Token Calculator?
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              Built for developers and AI practitioners who need accurate, fast token estimation
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bolt,
                title: 'Instant Results',
                description: 'Get token counts in real-time as you type your prompts',
                gradient: 'from-orange-400 to-red-500',
                bgGradient: 'from-orange-50 dark:from-orange-900/20 to-red-50 dark:to-red-900/20',
              },
              {
                icon: Code2,
                title: 'Multi-Model Support',
                description: 'Works with GPT-4, Claude, Gemini, Ollama, and more',
                gradient: 'from-blue-400 to-cyan-500',
                bgGradient: 'from-blue-50 dark:from-blue-900/20 to-cyan-50 dark:to-cyan-900/20',
              },
              {
                icon: Gauge,
                title: 'Context Window Analysis',
                description: 'Understand how your prompts fit within context limits',
                gradient: 'from-green-400 to-emerald-500',
                bgGradient: 'from-green-50 dark:from-green-900/20 to-emerald-50 dark:to-emerald-900/20',
              },
              {
                icon: Sparkles,
                title: 'Smart Optimization',
                description: 'Get suggestions to reduce token usage effectively',
                gradient: 'from-pink-400 to-rose-500',
                bgGradient: 'from-pink-50 dark:from-pink-900/20 to-rose-50 dark:to-rose-900/20',
              },
              {
                icon: Zap,
                title: '100% Free Forever',
                description: 'No signup, no limits, completely free to use always',
                gradient: 'from-yellow-400 to-amber-500',
                bgGradient: 'from-yellow-50 dark:from-yellow-900/20 to-amber-50 dark:to-amber-900/20',
              },
              {
                icon: Lock,
                title: 'Private & Secure',
                description: 'All calculations happen locally in your browser',
                gradient: 'from-purple-400 to-indigo-500',
                bgGradient: 'from-purple-50 dark:from-purple-900/20 to-indigo-50 dark:to-indigo-900/20',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className={`group rounded-2xl border-2 border-slate-200 dark:border-slate-700/50 p-6 sm:p-8 bg-gradient-to-br ${feature.bgGradient} hover:border-purple-400/50 dark:hover:border-purple-400/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
              >
                <div className={`mb-4 inline-block p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-200px' }}
        className="py-16 sm:py-20 lg:py-28 border-t border-blue-200 dark:border-blue-900/50 bg-gradient-to-b from-cyan-50/30 dark:from-cyan-900/10 via-white dark:via-slate-900/30 to-blue-50/30 dark:to-blue-900/10"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              Have questions? We've got answers
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                q: 'Are these token counts accurate?',
                a: 'Our estimates are based on proven tokenization algorithms for each provider. While not 100% exact without official tokenizers, they are highly accurate for practical purposes.',
                color: 'from-blue-400 to-blue-600',
              },
              {
                q: 'Why do different models have different token counts?',
                a: 'Different AI models use different tokenizers, which can split text differently. This affects the total token count for the same text.',
                color: 'from-cyan-400 to-cyan-600',
              },
              {
                q: 'Is my data saved or tracked?',
                a: 'No. All calculations happen in your browser. We do not send your text to any server or save it anywhere.',
                color: 'from-green-400 to-green-600',
              },
              {
                q: 'Can I export or share my results?',
                a: 'You can copy results to clipboard and share the page link. Results are stored locally in your browser.',
                color: 'from-purple-400 to-purple-600',
              },
              {
                q: 'How do I reduce my token usage?',
                a: 'Use our optimization tool to remove extra whitespace, normalize formatting, and reduce overall text size while preserving meaning.',
                color: 'from-pink-400 to-pink-600',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-slate-200 dark:border-slate-700/50 p-6 sm:p-8 bg-white dark:bg-slate-900/30 hover:border-blue-400/50 dark:hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-gradient-to-b ${item.color} group-hover:w-2 group-hover:h-2 transition-all`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${item.color} group-hover:bg-clip-text transition-all">
                      {item.q}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Educational Content */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-200px' }}
        className="py-16 sm:py-20 lg:py-28 border-t border-purple-200 dark:border-purple-900/50 bg-gradient-to-b from-purple-50/40 dark:from-purple-900/20 via-white dark:via-slate-900/50 to-transparent"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Understanding AI Token Calculators
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
              A token calculator is an essential tool for anyone working with Large Language Models (LLMs).
              Whether you're using OpenAI's GPT-4, Anthropic's Claude, Google's Gemini, or running local
              models with Ollama, understanding token consumption is crucial for managing costs and optimizing
              your AI applications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="rounded-2xl border-2 border-purple-200 dark:border-purple-800/50 p-6 bg-gradient-to-br from-purple-50 dark:from-purple-900/20 to-pink-50 dark:to-pink-900/10 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-purple-700 dark:text-purple-300">What are Tokens?</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Tokens are the fundamental units that AI models use to process text. A token roughly corresponds
                  to 4 characters or 1 word, though the exact size varies by model. Understanding token counts helps
                  you estimate API costs and ensure your prompts fit within context window limits.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-blue-200 dark:border-blue-800/50 p-6 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-cyan-50 dark:to-cyan-900/10 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-300">Key Features</h3>
                <ul className="space-y-2">
                  {[
                    'Multi-provider support',
                    'Real-time token counting',
                    'Context window analysis',
                    'Prompt optimization',
                    'Completely free',
                    'Fully private',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-blue-500 dark:text-blue-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
