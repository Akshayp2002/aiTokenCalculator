'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText, Gavel, Scale, ShieldAlert, History } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function TermsPage() {
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          Legal
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
        >
          Terms of <br />
          <span className="gradient-text">Service</span>
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
              title: 'Acceptance of Agreement',
              icon: Scale,
              desc: 'By accessing and using TokenCalc, you accept and agree to be bound by the terms and provision of this agreement. Use of our services constitutes full acceptance of these terms.',
              color: 'from-indigo-500 to-indigo-600'
            },
            {
              id: '02',
              title: 'Usage License',
              icon: FileText,
              desc: 'TokenCalc grants you a limited, non-exclusive, non-transferable license to use this tool for personal or professional token estimation. You may not attempt to reverse engineer or disrupt the service.',
              color: 'from-violet-500 to-violet-600'
            },
            {
              id: '03',
              title: 'Disclaimer of Accuracy',
              icon: ShieldAlert,
              desc: 'The tool is provided "as is". While we aim for 99% accuracy, token counts remain estimates. Users should not rely solely on these estimates for financial billing or high-stakes production limits.',
              color: 'from-cyan-500 to-cyan-600'
            },
            {
              id: '04',
              title: 'Liability Limits',
              icon: Gavel,
              desc: 'In no event shall TokenCalc be liable for any damages resulting from your use of or inability to use the service. Use of the calculator is at your own risk.',
              color: 'from-rose-500 to-pink-600'
            },
            {
              id: '05',
              title: 'Service Modifications',
              icon: History,
              desc: 'We reserve the right to modify these terms at any time. Continued use of the platform after updates indicates your agreement to the modified terms.',
              color: 'from-emerald-500 to-green-600'
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
                <div className="glass-card p-10 flex flex-col md:flex-row gap-8 items-start transition-all hover:bg-white border-2 border-transparent hover:border-gray-100">
                  <div className={cn(
                    "w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br",
                    item.color
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{item.id}</span>
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
          className="mt-20 p-12 rounded-[3rem] bg-gray-900 shadow-2xl text-center space-y-8"
        >
          <h2 className="text-3xl font-black text-white tracking-tight">Need assistance with our terms?</h2>
          <p className="text-white/60 font-medium max-w-xl mx-auto">
            Our terms are designed to be as simple and transparent as our calculator. 
            For further legal inquiries, please consult qualified legal counsel.
          </p>
          <Link href="/calculator">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-white text-indigo-700 font-black shadow-xl transition-all"
            >
              Return to Calculator
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer copyright simple */}
      <div className="pb-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        © {currentYear} TokenCalc Legal Engineering
      </div>
    </div>
  );
}
