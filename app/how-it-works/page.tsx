'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight, Brain, Cpu, MessageSquare, Terminal, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      title: 'Input Analysis',
      desc: 'Our system takes your input and performs a deep analysis of characters, words, and structural patterns.',
      color: 'from-indigo-500 to-indigo-600',
      glow: 'rgba(99,102,241,0.2)'
    },
    {
      step: '02',
      icon: Cpu,
      title: 'Model-Specific Logic',
      desc: 'Different models tokenize differently. We apply specific weightings for GPT-4, Claude, Gemini, and more.',
      color: 'from-violet-500 to-violet-600',
      glow: 'rgba(139,92,246,0.2)'
    },
    {
      step: '03',
      icon: Brain,
      title: 'Algorithm Execution',
      desc: 'Our proprietary estimation engine calculates the probable token count with up to 98% accuracy.',
      color: 'from-cyan-500 to-cyan-600',
      glow: 'rgba(6,182,212,0.2)'
    },
    {
      step: '04',
      icon: Terminal,
      title: 'Cost Projection',
      desc: 'Finally, we pair your token count with real-time API pricing to give you an exact cost estimate.',
      color: 'from-emerald-500 to-green-600',
      glow: 'rgba(16,185,129,0.2)'
    }
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
          Inner Workings
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
        >
          High-precision <br />
          <span className="gradient-text">token estimation</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
        >
          How we bridge the gap between plain text and AI model consumption with industry-leading accuracy.
        </motion.p>
      </section>

      {/* Steps Visual Section */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="group relative"
              >
                <div className="glass-card p-10 h-full flex flex-col items-start gap-6 border-2 border-transparent hover:border-indigo-100 hover:bg-white transition-all duration-500">
                  <div className="flex items-center justify-between w-full">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg relative",
                      s.color
                    )}>
                      <Icon className="w-7 h-7" strokeWidth={2.5} />
                      <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: s.glow }} />
                    </div>
                    <span className="text-4xl font-black text-gray-100 group-hover:text-indigo-50 transition-colors">
                      {s.step}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{s.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed italic">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Deep Dive */}
        <div className="mt-32 space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Technical Implementation</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Privacy Section */}
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Browser-Local Execution</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Unlike other tools, we don't send your data to a server for processing. 
                Everything happens right in your browser using optimized JavaScript. 
                This means 100% privacy and zero risk of prompt leakage.
              </p>
            </div>

            {/* Accuracy Section */}
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">98% Calculation Accuracy</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Our model profiles are calibrated against official tokenizers. 
                While exact counts can vary slightly by provider updates, our 
                estimation engine remains the most accurate non-official tool 
                on the web.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 text-center p-16 rounded-[4rem] bg-indigo-600 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-700 opacity-90" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Ready to start calculating?
            </h2>
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-indigo-700 font-black text-xl shadow-xl transition-all"
              >
                Launch Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
