'use client';

import Link from 'next/link';
import { Zap, Mail, Globe, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const essentialLinks = [
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  const socialLinks = [
    { icon: Globe, href: '#', label: 'GitHub' },
    { icon: Send, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[#050508] overflow-hidden">
      {/* Subtle top border/accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Brand & Tagline */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white/90">
                TokenCalc
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Professional, private token estimation for modern AI development.
            </p>
          </div>

          {/* Minimal Nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {essentialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-gray-500 hover:text-indigo-400 transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials & Divider */}
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="h-px w-24 bg-gray-800/50" />
            <div className="flex gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="text-gray-500 hover:text-indigo-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom simple bar */}
          <div className="pt-4 flex flex-col gap-2">
            <p className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em]">
              © {currentYear} TokenCalc. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-700">
              Built with precision for the global AI community.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none" />
    </footer>
  );
}

