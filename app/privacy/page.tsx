'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, EyeOff, Database, History, Globe } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          Security
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
        >
          Privacy <br />
          <span className="gradient-text !from-emerald-500 !to-teal-600">Policy</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-gray-400 font-medium"
        >
          <History className="w-4 h-4" />
          Last updated: {lastUpdated}
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="pb-32 px-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          {[
            {
              id: '01',
              title: 'Privacy-First Architecture',
              icon: ShieldCheck,
              desc: 'TokenCalc is built as a client-side only tool. This means we are mathematically incapable of seeing your prompts because the text never leaves your local browser session.',
              color: 'from-emerald-500 to-emerald-600'
            },
            {
              id: '02',
              title: 'No Data Collection',
              icon: EyeOff,
              desc: 'We do not collect, store, or transmit your text input. No logs, no databases, and no tracking scripts are attached to your prompt data.',
              color: 'from-teal-500 to-teal-600'
            },
            {
              id: '03',
              title: 'Zero Cookies',
              icon: Lock,
              desc: 'We do not use tracking cookies or personalized analytics. Your browsing behavior and prompt history remain your property and yours alone.',
              color: 'from-cyan-500 to-cyan-600'
            },
            {
              id: '04',
              title: 'Local Storage Only',
              icon: Database,
              desc: 'We use browser LocalStorage strictly to remember your UI preferences (like Dark Mode) and your last selected model. This data is never synced to our servers.',
              color: 'from-indigo-500 to-indigo-600'
            },
            {
              id: '05',
              title: 'Third-Party Audits',
              icon: Globe,
              desc: 'Our code is transparent and follows industry best practices for security. We do not integrate with third-party tracking services that compromise your anonymity.',
              color: 'from-violet-500 to-violet-600'
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="group relative"
              >
                <div className="glass-card p-10 flex flex-col md:flex-row gap-8 items-start transition-all hover:bg-white border-2 border-transparent hover:border-emerald-100 shadow-sm hover:shadow-2xl">
                  <div className={cn(
                    "w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br",
                    item.color
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{item.id}</span>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[3.5rem] bg-emerald-900 shadow-2xl text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Your data is yours. <br className="hidden md:block" /> Period.</h2>
          <p className="text-white/70 font-medium max-w-xl mx-auto">
            We believe that privacy is a human right, especially in the age of AI. 
            TokenCalc will always remain a secure, private tool for the community.
          </p>
          <Link href="/calculator">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-white text-emerald-700 font-black shadow-xl transition-all"
            >
              Back to Calculator
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer copyright simple */}
      <div className="pb-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        © {currentYear} TokenCalc Privacy Labs
      </div>
    </div>
  );
}
