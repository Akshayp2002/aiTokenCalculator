'use client';

import { motion } from 'framer-motion';
import { Zap, Sparkles, Lock, Gauge, Code2, ArrowRight, ChevronRight, Cpu, Database, Shield, Bolt } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-mesh">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 glass rounded-full text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
            Advanced AI Token Calculation · Free & Instant
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">NEW</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tight text-gray-900">
              Know Your{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Token Cost
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
              Instant, accurate token counting for OpenAI, Claude, Gemini, and{' '}
              <span className="font-semibold text-gray-700">20+ AI models</span>.
              See exactly what your prompts cost before you run them.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                Start Calculating
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </Link>
            <motion.a
              href="#how"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-gray-700 glass border border-gray-200/80 hover:border-indigo-200 hover:text-indigo-600 transition-all text-lg"
            >
              How it works
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-6 pt-10 mt-4 border-t border-gray-200/60"
          >
            {[
              { value: '10M+', label: 'Tokens Analyzed', icon: Database, color: 'from-indigo-500 to-indigo-600' },
              { value: '50K+', label: 'Happy Users', icon: Sparkles, color: 'from-violet-500 to-violet-600' },
              { value: '20+', label: 'AI Models', icon: Cpu, color: 'from-cyan-500 to-cyan-600' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="space-y-2 group cursor-default"
                >
                  <div className="flex justify-center">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FEATURES SECTION
          ============================================================ */}
      <section id="features" className="py-28 px-6 relative overflow-hidden" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-sm font-semibold tracking-widest text-indigo-500 uppercase">Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Powerful tools for{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                perfect accuracy
              </span>
            </h2>
            <p className="text-lg text-gray-500">
              Everything you need for precise token management across all major AI providers.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Real-Time Calculation',
                desc: 'See token counts update instantly as you type. Zero latency, maximum productivity.',
                gradient: 'from-indigo-500 to-indigo-600',
                bg: 'bg-indigo-50',
                border: 'hover:border-indigo-200',
                delay: 0,
              },
              {
                icon: Code2,
                title: 'Multi-Model Support',
                desc: 'GPT-4, Claude 3, Gemini Ultra, Ollama, Mistral, and 20+ more AI models supported.',
                gradient: 'from-violet-500 to-violet-600',
                bg: 'bg-violet-50',
                border: 'hover:border-violet-200',
                delay: 0.08,
              },
              {
                icon: Gauge,
                title: 'Context Analysis',
                desc: 'Visualize your usage within the model\'s context window with a live progress bar.',
                gradient: 'from-cyan-500 to-cyan-600',
                bg: 'bg-cyan-50',
                border: 'hover:border-cyan-200',
                delay: 0.16,
              },
              {
                icon: Bolt,
                title: 'Cost Estimation',
                desc: 'Get estimated API costs in real time based on the latest pricing for each model.',
                gradient: 'from-amber-500 to-orange-500',
                bg: 'bg-amber-50',
                border: 'hover:border-amber-200',
                delay: 0.24,
              },
              {
                icon: Lock,
                title: '100% Private',
                desc: 'All calculations happen locally in your browser. Your prompts never leave your device.',
                gradient: 'from-emerald-500 to-green-600',
                bg: 'bg-emerald-50',
                border: 'hover:border-emerald-200',
                delay: 0.32,
              },
              {
                icon: Sparkles,
                title: 'Smart Optimization',
                desc: 'Get intelligent suggestions to trim token usage and reduce your AI costs effectively.',
                gradient: 'from-rose-500 to-pink-600',
                bg: 'bg-rose-50',
                border: 'hover:border-rose-200',
                delay: 0.4,
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: f.delay, type: 'spring', stiffness: 120 }}
                  viewport={{ once: true, margin: '-80px' }}
                  whileHover={{ y: -6 }}
                  className={`group p-8 rounded-3xl border border-gray-100 bg-white ${f.border} transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-100`}
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS
          ============================================================ */}
      <section id="how" className="py-28 px-6 bg-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-sm font-semibold tracking-widest text-indigo-500 uppercase">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Simple as{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                1 — 2 — 3
              </span>
            </h2>
            <p className="text-lg text-gray-500">Fast, accurate, and totally free token counting in seconds.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-16 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200" />

            {[
              { step: '01', title: 'Paste Your Prompt', desc: 'Enter or paste any text — a prompt, system message, conversation, or code snippet.', emoji: '📝', color: 'from-indigo-500 to-indigo-600' },
              { step: '02', title: 'Select Your Model', desc: 'Choose from OpenAI GPT-4, Claude, Gemini, or any of 20+ supported providers.', emoji: '🤖', color: 'from-violet-500 to-violet-600' },
              { step: '03', title: 'See Results Instantly', desc: 'Get token count, context usage, and cost estimate displayed in real time.', emoji: '⚡', color: 'from-cyan-500 to-cyan-600' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 120 }}
                viewport={{ once: true, margin: '-80px' }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="glass-card p-8 h-full"
                >
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white font-black text-lg shadow-lg mb-6`}>
                    {item.step}
                  </div>

                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: i * 0.6 }}
                    className="text-4xl mb-4"
                  >
                    {item.emoji}
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                Try It Free Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          WHY CHOOSE US — Card row (inspired by reference)
          ============================================================ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-3 max-w-2xl mx-auto"
          >
            <p className="text-sm font-semibold tracking-widest text-indigo-500 uppercase">Why Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Built for developers, by developers
            </h2>
            <p className="text-gray-500 text-lg">
              Because calculating tokens should be effortless and accurate, every single time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Secure & Private',
                desc: 'Your data never leaves the browser. No servers, no tracking, no logs. Completely private by design.',
                iconBg: 'from-emerald-500 to-green-600',
                glowColor: 'rgba(16,185,129,0.1)',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Instant token counting as you type. Handles prompts of any size with zero delay.',
                iconBg: 'from-amber-500 to-orange-500',
                glowColor: 'rgba(245,158,11,0.1)',
              },
              {
                icon: Code2,
                title: '20+ Models',
                desc: 'Full support for every major AI provider — OpenAI, Anthropic, Google, Meta, Mistral, Ollama.',
                iconBg: 'from-indigo-500 to-violet-600',
                glowColor: 'rgba(99,102,241,0.1)',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="relative p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                  style={{
                    boxShadow: `0 4px 30px ${item.glowColor}, 0 1px 4px rgba(0,0,0,0.04)`,
                  }}
                >
                  <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${item.iconBg} shadow-lg mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA BANNER
          ============================================================ */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)' }}>
        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/10 translate-x-1/2 translate-y-1/2"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Start Calculating Tokens Today
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Fast, accurate, and completely free. No registration required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="px-12 py-5 rounded-2xl bg-white text-indigo-700 font-extrabold text-xl shadow-2xl transition-all inline-flex items-center gap-3"
              >
                Launch Calculator
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> 100% Private & Secure
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Lightning Fast
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" /> Never Stored
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
