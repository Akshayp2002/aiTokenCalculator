import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how Token Calculator estimates tokens for different AI models.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">How It Works</h1>

        <div className="max-w-4xl space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold">Token Estimation Algorithm</h2>
            <p className="text-lg text-muted-foreground">
              Our token calculator uses sophisticated estimation algorithms based on how different AI models tokenize text.
              Each provider has different tokenization patterns, which we've modeled based on official documentation and testing.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Step 1: Text Input</h3>
            <p className="text-muted-foreground">
              You paste or type your prompt into our calculator. The text is processed entirely in your browser,
              ensuring complete privacy. No data is sent to our servers or any third party.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Step 2: Provider Selection</h3>
            <p className="text-muted-foreground">
              Select which AI provider you're using. We support OpenAI, Anthropic, Google Gemini, Ollama, and general estimation.
              Each provider has different tokenization characteristics that we account for.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Step 3: Algorithmic Analysis</h3>
            <p className="text-muted-foreground">
              Our algorithm analyzes your text for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary">•</span> Word count and structure</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Special characters and punctuation</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Whitespace and formatting</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Unicode and multi-byte characters</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Step 4: Instant Results</h3>
            <p className="text-muted-foreground">
              Get real-time token counts, character counts, and word counts. Understand how your prompt fits
              within context windows and estimate API costs.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Accuracy Notes</h3>
            <p className="text-muted-foreground">
              Our estimates are highly accurate for practical purposes. Without using official tokenizers from each provider,
              there may be small variations (typically less than 5%). For exact counts, use official libraries:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary">•</span> OpenAI: tiktoken library</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Anthropic: claude-tokenizer</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Google: google-cloud-generative-ai</li>
            </ul>
          </section>

          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Ready to start?</h2>
            <Link href="/">
              <Button size="lg">Open Token Calculator</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
