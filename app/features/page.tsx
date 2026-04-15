import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore the powerful features of Token Calculator for AI token counting and prompt optimization.',
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          Comprehensive token analysis and optimization tools for AI applications
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              title: 'Multi-Provider Support',
              items: ['OpenAI (GPT-4, GPT-3.5)', 'Anthropic Claude', 'Google Gemini', 'Ollama', 'General estimation'],
            },
            {
              title: 'Real-Time Analysis',
              items: ['Live token counting', 'Character & word counts', 'Line tracking', 'Paragraph detection'],
            },
            {
              title: 'Context Window Tools',
              items: ['Context window presets', 'Custom window sizing', 'Usage percentage bars', 'Status warnings'],
            },
            {
              title: 'Optimization Suite',
              items: ['Remove extra whitespace', 'Normalize line breaks', 'Trim empty lines', 'Token savings calculator'],
            },
            {
              title: 'User Experience',
              items: ['Dark mode support', 'Responsive design', 'Keyboard navigation', 'Local data storage'],
            },
            {
              title: 'Privacy & Security',
              items: ['No server uploads', 'Browser-based calculation', 'No tracking', 'No data collection'],
            },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-muted-foreground">
                    <span className="text-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to optimize your prompts?</h2>
          <Link href="/">
            <Button size="lg">Start Using Token Calculator</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
