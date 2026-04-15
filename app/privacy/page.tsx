import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Token Calculator',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <article className="max-w-4xl prose prose-invert">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>

          <section className="space-y-6 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                Token Calculator ("we", "our", or "us") operates as a privacy-first tool. We are committed to protecting your
                privacy and ensuring you have a positive experience on our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Data Collection</h2>
              <p>
                Token Calculator does NOT collect, store, or transmit your text input. All calculations are performed locally
                in your browser. No personal information is sent to our servers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Local Storage</h2>
              <p>
                We use browser local storage only to remember your preferences (such as dark mode and last calculator state).
                This data never leaves your device.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Analytics</h2>
              <p>
                We may use privacy-respecting analytics to understand how people use our tool, but we do not track individual
                prompts or personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
              <p>
                Token Calculator does not integrate with third-party services that would compromise your privacy. We do not use
                cookies for tracking purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Security</h2>
              <p>
                Since all calculations happen locally in your browser, your data is inherently secure. There is no transmission
                or server storage that could be compromised.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to This Policy</h2>
              <p>
                We may update this privacy policy to reflect changes in our practices. We will notify users of any significant
                changes by updating the date on this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
              <p>If you have questions about this privacy policy, please contact us at hello@token-calculator.com</p>
            </div>

            <p className="text-sm pt-8 border-t border-border/40">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
