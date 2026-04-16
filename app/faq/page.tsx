'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageSquare, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is a token?',
      answer: 'A token is the base unit of text processed by AI models. Typically, 1 token is about 4 characters or 0.75 words. Each AI provider uses their own specific tokenization algorithm.',
      icon: Zap
    },
    {
      question: 'Are your estimates 100% accurate?',
      answer: 'Our estimates match official tokenizers with ~98% accuracy. While perfect parity is impossible without using provider-specific APIs, our tool is the most precise independent estimation engine available.',
      icon: Sparkles
    },
    {
      question: 'Why do counts differ between GPT-4 and Claude?',
      answer: 'Every provider uses a unique "dictionary" (tokenizer). For example, OpenAI uses Tiktoken (BPE), while Claude uses a different algorithm. The same word can be 1 token for one model and 2 for another.',
      icon: MessageSquare
    },
    {
      question: 'Is my input data private?',
      answer: '100% yes. All calculations happen locally in your browser. No text is ever sent to our servers, and your prompts never leave your device. We don\'t even have a database for your text.',
      icon: Shield
    },
    {
      question: 'What is a Context Window?',
      answer: 'It is the total memory limit of a model. For example, if a model has a 128k context window, that is the combined limit of your input prompt and the AI\'s generated response.',
      icon: Zap
    },
    {
      question: 'Can I use this for production billings?',
      answer: 'Our tool is built for high-precision estimation and prompt optimization. For financial billing or strict production limits, we recommend using the provider\'s official API for the final count.',
      icon: Shield
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          Documentation
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
        >
          Frequently Asked <br />
          <span className="gradient-text">Questions</span>
        </motion.h1>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto relative group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border-2 border-transparent focus:border-indigo-100 shadow-xl focus:outline-none placeholder:text-gray-400 text-gray-900 transition-all"
          />
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="pb-32 px-6 max-w-3xl mx-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const Icon = faq.icon;
              
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={cn(
                      "w-full text-left p-8 rounded-3xl transition-all duration-300 border-2 flex gap-6 items-start",
                      isOpen 
                        ? "bg-white border-indigo-100 shadow-2xl scale-[1.02] z-10 relative" 
                        : "bg-white/60 border-transparent hover:bg-white hover:border-gray-100"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                      isOpen ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-100 text-gray-500"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={cn(
                          "text-xl font-black tracking-tight transition-colors",
                          isOpen ? "text-gray-900" : "text-gray-700"
                        )}>
                          {faq.question}
                        </h3>
                        <ChevronDown className={cn(
                          "w-5 h-5 text-gray-400 transition-transform duration-500",
                          isOpen && "rotate-180 text-indigo-500"
                        )} />
                      </div>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-500 font-medium leading-relaxed italic pr-8 overflow-hidden"
                          >
                            {faq.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-xl font-bold text-gray-400">No matching questions found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
