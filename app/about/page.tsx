import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Token Calculator and our mission to make AI token estimation accessible.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">About Token Calculator</h1>

        <div className="max-w-4xl space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Token Calculator was created with a simple mission: make token estimation for AI models
              accessible, free, and easy to use for everyone from casual users to developers and enterprises.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Why We Built This</h2>
            <p className="text-muted-foreground mb-4">
              As AI adoption accelerates, understanding token consumption becomes critical for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary">•</span> Managing API costs effectively</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Optimizing prompt engineering</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Understanding context window limitations</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Planning infrastructure requirements</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Our Approach</h2>
            <p className="text-muted-foreground">
              Token Calculator uses sophisticated estimation algorithms based on the tokenization patterns
              of major AI providers. We're committed to transparency, accuracy, and privacy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">Transparent</h3>
                <p className="text-sm text-muted-foreground">
                  Clear about our estimation methods and accuracy levels
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">Private</h3>
                <p className="text-sm text-muted-foreground">
                  100% browser-based, no server processing or data collection
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">Free</h3>
                <p className="text-sm text-muted-foreground">
                  Completely free with no signup, registration, or limits
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Technology</h2>
            <p className="text-muted-foreground">
              Token Calculator is built with modern web technologies:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary">•</span> Next.js 16 with App Router</li>
              <li className="flex gap-3"><span className="text-primary">•</span> React 19 for responsive UI</li>
              <li className="flex gap-3"><span className="text-primary">•</span> TypeScript for type safety</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Tailwind CSS for styling</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Framer Motion for animations</li>
            </ul>
          </section>

          <div className="text-center py-8 border-t border-border/40">
            <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
            <Link href="/">
              <Button size="lg">Open Token Calculator</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
