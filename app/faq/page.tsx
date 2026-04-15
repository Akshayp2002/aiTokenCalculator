import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ - Token Calculator',
  description: 'Frequently asked questions about token counting, AI models, and the Token Calculator tool.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is a token?',
      answer:
        'A token is a unit of text that AI models process. On average, one token equals about 4 characters or ~0.75 words. However, this varies by model—different tokenizers handle text differently.',
    },
    {
      question: 'Are your token estimates accurate?',
      answer:
        'Our estimates are highly accurate (typically within 5%) based on the tokenization patterns of each provider. For production use with critical cost calculations, consider using official tokenizer libraries from each provider.',
    },
    {
      question: 'Why do different models show different token counts?',
      answer:
        'Different AI models use different tokenizers. For example, OpenAI uses BPE (Byte Pair Encoding), while other models may use different algorithms. This causes the same text to have different token counts across providers.',
    },
    {
      question: 'What is a context window?',
      answer:
        'A context window is the maximum amount of tokens a model can process. For example, GPT-4 has a 128K context window, meaning it can handle up to 128,000 tokens in total (input + output).',
    },
    {
      question: 'How do I reduce my token usage?',
      answer:
        'Use our optimization tool to remove extra whitespace, normalize formatting, and reduce redundancy. You can also craft more concise prompts and remove unnecessary details while preserving meaning.',
    },
    {
      question: 'Is my data safe?',
      answer:
        'Yes, completely. All calculations happen in your browser. We do not store, transmit, or process your text on any server. Everything is private and local.',
    },
    {
      question: 'Do you charge for this tool?',
      answer:
        'No, Token Calculator is completely free to use. No registration, no hidden costs, no limits. We believe token estimation should be accessible to everyone.',
    },
    {
      question: 'Can I use this for production applications?',
      answer:
        'Our tool is great for estimation and planning. For precise billing and production use, we recommend using official tokenizer libraries from each provider for exact counts.',
    },
    {
      question: 'Which AI models do you support?',
      answer:
        'We support OpenAI (GPT-4, GPT-3.5), Anthropic Claude, Google Gemini, Ollama (local models), and provide general estimation for other models.',
    },
    {
      question: 'Can I export my results?',
      answer:
        'You can copy token counts to your clipboard. For persistent storage, results are saved locally in your browser. You can share the page URL with others.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">FAQ</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          Answers to common questions about Token Calculator and token counting
        </p>

        <div className="max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur group cursor-pointer"
            >
              <summary className="font-semibold text-lg flex items-center justify-between">
                {faq.question}
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
