import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
      <div className="container-with-padding text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-muted-foreground/50" />
        </div>

        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>

        <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Back to Home</Button>
          </Link>
          <Link href="/faq">
            <Button size="lg" variant="outline">
              Visit FAQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
