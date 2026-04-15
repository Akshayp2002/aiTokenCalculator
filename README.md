# Token Calculator

A production-ready AI token counter and estimator for OpenAI, Anthropic, Google Gemini, Ollama, and other language models. Features real-time token counting, context window analysis, and prompt optimization tools.

## Features

- **Multi-Provider Support**: OpenAI, Anthropic Claude, Google Gemini, Ollama, and general estimation
- **Real-Time Analysis**: Live token counting, character and word counts, line tracking
- **Context Window Tools**: Presets, custom sizing, usage visualization, and warnings
- **Prompt Optimization**: Remove whitespace, normalize formatting, and see token savings
- **Dark Mode**: Fully responsive with beautiful light and dark themes
- **Privacy First**: 100% browser-based, no server uploads or data collection
- **Beautiful UI**: Modern design with smooth animations and excellent UX

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/token-calculator.git
cd token-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page with calculator
├── globals.css             # Global styles
├── robots.ts               # SEO robots.txt
├── sitemap.ts              # XML sitemap
├── features/page.tsx
├── how-it-works/page.tsx
├── faq/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
└── not-found.tsx

components/
├── ui/                     # Base UI components
├── header.tsx
├── footer.tsx
├── token-calculator.tsx
├── provider-selector.tsx
├── results-panel.tsx
└── prompt-optimizer.tsx

lib/
├── tokenizer.ts            # Token estimation logic
└── utils.ts                # Utilities
```

## Extending with Exact Tokenizers

### Add OpenAI tiktoken

```bash
npm install js-tiktoken
```

Then in `lib/tokenizer.ts`:
```typescript
import { encoding_for_model } from 'js-tiktoken';

export function estimateOpenAITokensExact(text: string, model: string): number {
  const enc = encoding_for_model(model);
  return enc.encode(text).length;
}
```

### Add Anthropic Token Counter

```bash
npm install @anthropic-ai/sdk
```

### Add Google Generative AI

```bash
npm install @google/generative-ai
```

## SEO Features

- ✅ Semantic HTML
- ✅ Meta tags and Open Graph
- ✅ robots.txt and sitemap.xml
- ✅ Responsive design
- ✅ Fast load times

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Requires JavaScript

## License

MIT License - See LICENSE file for details

## Support

- Email: hello@token-calculator.com
- GitHub Issues
- Visit: https://token-calculator.com/contact

## Deployment

Deploy to Vercel, AWS, Docker, or any Node.js host.

### Vercel
```bash
vercel
```

### Docker
```bash
docker build -t token-calculator .
docker run -p 3000:3000 token-calculator
```

Built with ❤️ for the AI community
