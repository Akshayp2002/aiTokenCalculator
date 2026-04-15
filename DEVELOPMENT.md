# Development Guide

This document provides guidance for extending Token Calculator with additional features and exact tokenizers.

## Adding Exact Tokenizers

### OpenAI (js-tiktoken)

OpenAI provides the official `js-tiktoken` library for exact token counting.

**Installation:**
```bash
npm install js-tiktoken
```

**Integration in `lib/tokenizer.ts`:**
```typescript
import { encoding_for_model } from 'js-tiktoken';

export function estimateOpenAITokensExact(
  text: string,
  model: 'gpt-4' | 'gpt-3.5-turbo' = 'gpt-4'
): number {
  try {
    const enc = encoding_for_model(model);
    const tokens = enc.encode(text);
    return tokens.length;
  } catch (error) {
    console.error('Tokenization error:', error);
    return estimateOpenAITokens(text);
  }
}
```

**Update `ResultsPanel` component to use exact counts:**
```typescript
import { estimateOpenAITokensExact } from '@/lib/tokenizer';

// In the component...
const inputTokens = provider === 'openai' 
  ? estimateOpenAITokensExact(text, model as any)
  : estimateTokens(text, provider);
```

### Anthropic (claude-tokenizer)

Anthropic provides token counting through the SDK.

**Installation:**
```bash
npm install @anthropic-ai/sdk
```

**Integration (async - requires API component wrapper):**
```typescript
import Anthropic from '@anthropic-ai/sdk';

export async function estimateAnthropicTokensExact(
  text: string,
  model: string = 'claude-3-opus-20240229'
): Promise<number> {
  const client = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  });

  try {
    const response = await client.messages.countTokens({
      model,
      messages: [{ role: 'user', content: text }],
    });
    return response.input_tokens;
  } catch (error) {
    console.error('Token count error:', error);
    return estimateAnthropicTokens(text);
  }
}
```

### Google Generative AI

**Installation:**
```bash
npm install @google/generative-ai
```

**Integration:**
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function estimateGeminiTokensExact(text: string): Promise<number> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  try {
    const result = await model.countTokens(text);
    return result.totalTokens;
  } catch (error) {
    console.error('Token count error:', error);
    return estimateGeminiTokens(text);
  }
}
```

## Adding Pricing Calculations

Create `lib/pricing.ts`:

```typescript
export interface PricingModel {
  id: string;
  provider: string;
  model: string;
  inputCostPer1mTokens: number; // USD
  outputCostPer1mTokens: number;
  releaseDate: Date;
}

export const PRICING_MODELS: PricingModel[] = [
  {
    id: 'gpt-4',
    provider: 'openai',
    model: 'GPT-4',
    inputCostPer1mTokens: 30,
    outputCostPer1mTokens: 60,
    releaseDate: new Date('2023-03-14'),
  },
  {
    id: 'gpt-4-turbo',
    provider: 'openai',
    model: 'GPT-4 Turbo',
    inputCostPer1mTokens: 10,
    outputCostPer1mTokens: 30,
    releaseDate: new Date('2023-11-06'),
  },
  {
    id: 'gpt-3.5-turbo',
    provider: 'openai',
    model: 'GPT-3.5 Turbo',
    inputCostPer1mTokens: 0.5,
    outputCostPer1mTokens: 1.5,
    releaseDate: new Date('2022-11-30'),
  },
  {
    id: 'claude-3-opus',
    provider: 'anthropic',
    model: 'Claude 3 Opus',
    inputCostPer1mTokens: 15,
    outputCostPer1mTokens: 75,
    releaseDate: new Date('2024-03-04'),
  },
  {
    id: 'claude-3-sonnet',
    provider: 'anthropic',
    model: 'Claude 3 Sonnet',
    inputCostPer1mTokens: 3,
    outputCostPer1mTokens: 15,
    releaseDate: new Date('2024-03-04'),
  },
  {
    id: 'gemini-1.5-pro',
    provider: 'gemini',
    model: 'Gemini 1.5 Pro',
    inputCostPer1mTokens: 3.5,
    outputCostPer1mTokens: 10.5,
    releaseDate: new Date('2024-04-09'),
  },
];

export interface CostCalculation {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: 'USD';
}

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: PricingModel
): CostCalculation {
  const inputCost = (inputTokens / 1_000_000) * model.inputCostPer1mTokens;
  const outputCost = (outputTokens / 1_000_000) * model.outputCostPer1mTokens;

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    currency: 'USD',
  };
}

export function getPricingModel(
  provider: string,
  model: string
): PricingModel | undefined {
  return PRICING_MODELS.find(
    (p) => p.provider === provider && p.model === model
  );
}
```

**Add pricing display to ResultsPanel:**
```typescript
import { calculateCost, getPricingModel, PRICING_MODELS } from '@/lib/pricing';

// In component state
const [selectedPricingModel, setSelectedPricingModel] = useState<PricingModel>(
  PRICING_MODELS[0]
);

// In component
const costs = calculateCost(inputTokens, outputTokens, selectedPricingModel);

// Add section to display
<Card>
  <CardHeader>
    <CardTitle>Estimated Cost</CardTitle>
  </CardHeader>
  <CardContent className='space-y-4'>
    <select onChange={(e) => setSelectedPricingModel(PRICING_MODELS[parseInt(e.target.value)])}>
      {PRICING_MODELS.map((model, i) => (
        <option key={i} value={i}>
          {model.provider} - {model.model}
        </option>
      ))}
    </select>
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <p className='text-sm text-muted-foreground'>Input Cost</p>
        <p className='text-lg font-bold'>${costs.inputCost.toFixed(6)}</p>
      </div>
      <div>
        <p className='text-sm text-muted-foreground'>Output Cost</p>
        <p className='text-lg font-bold'>${costs.outputCost.toFixed(6)}</p>
      </div>
    </div>
    <div className='p-3 bg-primary/5 rounded-lg'>
      <p className='text-sm text-muted-foreground'>Total Estimated Cost</p>
      <p className='text-2xl font-bold text-primary'>${costs.totalCost.toFixed(6)}</p>
    </div>
  </CardContent>
</Card>
```

## Database Integration (Future)

To add user accounts and history tracking, consider:

### Prisma Setup

**Install:**
```bash
npm install @prisma/client
npm install -D prisma
```

**Initialize:**
```bash
npx prisma init
```

**Create schema (`prisma/schema.prisma`):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  history CalculationHistory[]
  createdAt DateTime @default(now())
}

model CalculationHistory {
  id        Int     @id @default(autoincrement())
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
  text      String
  provider  String
  tokens    Int
  createdAt DateTime @default(now())
}
```

## Testing

Add testing framework:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Create `lib/__tests__/tokenizer.test.ts`:**
```typescript
import { describe, it, expect } from 'vitest';
import { estimateOpenAITokens, estimateTokens } from '@/lib/tokenizer';

describe('Token Estimator', () => {
  it('should estimate OpenAI tokens', () => {
    const text = 'Hello, world!';
    const tokens = estimateOpenAITokens(text);
    expect(tokens).toBeGreaterThan(0);
  });

  it('should handle empty strings', () => {
    const tokens = estimateTokens('', 'openai');
    expect(tokens).toBe(0);
  });
});
```

## Performance Optimization

### Enable Image Optimization

```bash
npm install sharp
```

### Add Monitoring

```bash
npm install @vercel/analytics @vercel/speed-insights
```

**In `app/layout.tsx`:**
```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Deployment Configuration

### Vercel Environment Variables

Set in Vercel dashboard:
```
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_key_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_key_here
DATABASE_URL=your_database_url
```

### Docker Multi-stage Build

Already configured in `Dockerfile` - optimized for production.

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/exact-tokenizers

# Commit changes
git add .
git commit -m "feat: add exact OpenAI tokenizer"

# Push and create PR
git push origin feature/exact-tokenizers
```

## Code Style

- Use TypeScript strict mode
- Follow existing component patterns
- Use Tailwind CSS for styling
- Keep components under 300 lines
- Add comments for complex logic

## Contributing

See main README.md for contribution guidelines.
