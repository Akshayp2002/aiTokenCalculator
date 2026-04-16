'use client';

import { motion } from 'framer-motion';
import { Zap, Gauge, Bolt, Sparkles, ArrowRight, Shield, Network, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function FeaturesPage() {
  const features = [
    {
      icon: Network,
      title: 'Multi-Provider Support',
      desc: 'Native support for OpenAI, Anthropic, Gemini, Mistral, and local Ollama models with dedicated tokenization logic.',
      color: 'from-indigo-500 to-indigo-600',
      glow: 'rgba(99,102,241,0.2)'
    },
    {
      icon: Search,
      title: 'Real-Time Analysis',
      desc: 'Experience zero-latency calculations. Every keystroke triggers a lightning-fast re-count across all selected parameters.',
      color: 'from-violet-500 to-violet-600',
      glow: 'rgba(139,92,246,0.2)'
    },
    {
      icon: Gauge,
      title: 'Context Visualizer',
      desc: 'Beautifully visualize how your prompt occupies the model\'s context window with interactive progress indicators.',
      color: 'from-cyan-500 to-cyan-600',
      glow: 'rgba(6,182,212,0.2)'
    },
    {
      icon: Bolt,
      title: 'Cost Estimation',
      desc: 'Stay ahead of your budget with real-time API cost projections based on current market pricing for every model.',
      color: 'from-amber-500 to-orange-500',
      glow: 'rgba(245,158,11,0.2)'
    },
    {
      icon: Shield,
      title: '100% Privacy First',
      desc: 'Your data never leaves your browser. All calculations are performed locally, ensuring total prompt confidentiality.',
      color: 'from-emerald-500 to-green-600',
      glow: 'rgba(16,185,129,0.2)'
    },
    {
      icon: Sparkles,
      title: 'Smart Optimization',
      desc: 'Automatic suggestions to reduce token bloat by normalizing whitespace, line breaks, and redundant formatting.',
      color: 'from-rose-500 to-pink-600',
      glow: 'rgba(244,63,94,0.2)'
    },
  ];

  return (
    <div className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          Capabilities
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
        >
          Powerful features for <br />
          <span className="gradient-text">precision counting</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
        >
          The most comprehensive toolset for analyzing, optimizing, and managing AI tokens across all major providers.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative z-10 glass-card p-10 h-full flex flex-col items-start transition-all duration-300 border-2 hover:border-indigo-100 shadow-sm hover:shadow-2xl hover:bg-white"
                     style={{ background: 'rgba(255,255,255,0.7)' }}>
                  
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg mb-8 transition-transform group-hover:scale-110 group-hover:-rotate-3",
                    feature.color
                  )}>
                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: feature.glow }} />
                  </div>

                  <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic text-sm">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-24 text-center p-12 rounded-[3.5rem] bg-gray-900 shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-colors" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Ready to take control of your <br className="hidden md:block" /> AI prompt costs?
            </h2>
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-indigo-700 font-black text-xl shadow-xl transition-all"
              >
                Launch Calculator
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
