import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Token Calculator',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-with-padding section-padding">
        <article className="max-w-4xl prose prose-invert">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Terms of Service</h1>

          <section className="space-y-6 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Token Calculator, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. License</h2>
              <p>
                Token Calculator grants you a limited, non-exclusive, non-transferable license to use this tool for personal,
                non-commercial use, subject to the restrictions in these Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer of Warranties</h2>
              <p>
                Token Calculator is provided "as is" without warranty of any kind, express or implied. While we strive for
                accuracy, token estimates may not be 100% exact and should not be used for critical billing decisions without
                verification.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
              <p>
                In no event shall Token Calculator be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of or inability to use the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Acceptable Use</h2>
              <p>You agree not to use Token Calculator for any unlawful purposes or in any way that violates these Terms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Modifications</h2>
              <p>
                We may modify these Terms at any time. Continued use of Token Calculator after changes constitutes your
                acceptance of the modified Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with applicable laws.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact</h2>
              <p>If you have questions about these Terms, please contact us at hello@token-calculator.com</p>
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
