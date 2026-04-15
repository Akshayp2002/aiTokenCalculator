import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://token-calculator.com'),
  title: {
    default: 'Token Calculator - AI Token Counter & Estimator',
    template: '%s | Token Calculator',
  },
  description:
    'Instantly estimate tokens for OpenAI GPT, Anthropic Claude, Google Gemini, Ollama, and more. Free online token counter for AI prompts.',
  keywords: [
    'token calculator',
    'token counter',
    'ai token estimator',
    'openai tokens',
    'claude tokens',
    'gemini tokens',
    'gpt-4 tokens',
    'prompt tokens',
    'context window',
  ],
  authors: [{ name: 'Token Calculator' }],
  creator: 'Token Calculator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://token-calculator.com',
    title: 'Token Calculator - AI Token Counter & Estimator',
    description:
      'Instantly estimate tokens for OpenAI GPT, Anthropic Claude, Google Gemini, Ollama, and more.',
    siteName: 'Token Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Calculator - AI Token Counter & Estimator',
    description:
      'Instantly estimate tokens for OpenAI GPT, Anthropic Claude, Google Gemini, and more.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://token-calculator.com',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%236366f1'>⚡</text></svg>"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
