import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Token Calculator team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          Have feedback, feature requests, or found a bug? We'd love to hear from you.
        </p>

        <div className="max-w-2xl">
          <form className="space-y-6 p-8 rounded-xl border border-border/40 bg-card/50 backdrop-blur">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input type="text" placeholder="Your name" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input type="text" placeholder="What is this about?" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="Tell us more..." className="min-h-[200px]" required />
            </div>

            <Button size="lg" className="w-full">
              Send Message
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              We'll get back to you as soon as possible.
            </p>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">hello@token-calculator.com</p>
            </div>
            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground">Usually within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
