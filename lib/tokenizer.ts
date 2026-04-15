/**
 * Token calculation utilities for different providers
 * These use estimation algorithms since exact tokenizers would require external libraries
 */

export type Provider = 'general' | 'openai' | 'anthropic' | 'gemini' | 'ollama';

export interface TokenEstimate {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  provider: Provider;
  model?: string;
}

/**
 * Estimates tokens based on character count
 * Average: ~4 characters per token across most models
 */
export function estimateTokensByCharacters(text: string): number {
  // General estimation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
}

/**
 * OpenAI token estimation
 * Based on GPT tokenizer patterns: words + punctuation weighted
 */
export function estimateOpenAITokens(text: string): number {
  let tokens = 0;

  // Count words (average 1.3 tokens per word for OpenAI)
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  tokens += Math.ceil(words.length * 1.3);

  // Add extra tokens for punctuation and special characters
  const specialChars = text.match(/[.,!?;:\(\)\[\]\{\}"'`\-]/g) || [];
  tokens += Math.ceil(specialChars.length * 0.5);

  // Add tokens for newlines and formatting
  const newlines = (text.match(/\n/g) || []).length;
  tokens += newlines * 1;

  // Add a small buffer for subword tokens
  tokens += Math.ceil(text.length / 15);

  return Math.max(1, tokens);
}

/**
 * Anthropic token estimation
 * Anthropic uses a similar but slightly different tokenization scheme
 */
export function estimateAnthropicTokens(text: string): number {
  let tokens = 0;

  // Words (Anthropic: ~1.2 tokens per word on average)
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  tokens += Math.ceil(words.length * 1.2);

  // Characters (Anthropic handles some characters differently)
  tokens += Math.ceil(text.length / 5);

  // Newlines
  const newlines = (text.match(/\n/g) || []).length;
  tokens += newlines * 1;

  return Math.max(1, tokens);
}

/**
 * Gemini token estimation
 * Google Gemini tokenization characteristics
 */
export function estimateGeminiTokens(text: string): number {
  let tokens = 0;

  // Words (Gemini: ~1.25 tokens per word)
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  tokens += Math.ceil(words.length * 1.25);

  // Characters
  tokens += Math.ceil(text.length / 4.5);

  // Special handling for punctuation
  const punctuation = (text.match(/[.!?,;:]/g) || []).length;
  tokens += Math.ceil(punctuation * 0.8);

  return Math.max(1, tokens);
}

/**
 * Ollama token estimation (local models)
 * Typically uses similar tokenization to OpenAI models
 */
export function estimateOllamaTokens(text: string): number {
  // Ollama uses similar tokenization to OpenAI
  return estimateOpenAITokens(text);
}

/**
 * General token estimation (best effort)
 */
export function estimateGeneralTokens(text: string): number {
  let tokens = 0;

  // Average of ~1.2 tokens per word (universal average)
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  tokens += Math.ceil(words.length * 1.2);

  // Character-based estimation
  tokens += Math.ceil(text.length / 4);

  // Newlines
  const newlines = (text.match(/\n/g) || []).length;
  tokens += newlines;

  return Math.max(1, tokens);
}

/**
 * Get token estimate for a given provider
 */
export function estimateTokens(
  text: string,
  provider: Provider = 'general'
): number {
  if (!text) return 0;

  switch (provider) {
    case 'openai':
      return estimateOpenAITokens(text);
    case 'anthropic':
      return estimateAnthropicTokens(text);
    case 'gemini':
      return estimateGeminiTokens(text);
    case 'ollama':
      return estimateOllamaTokens(text);
    case 'general':
    default:
      return estimateGeneralTokens(text);
  }
}

/**
 * Calculate all token estimates for a given text and estimated output tokens
 */
export function calculateTokenEstimates(
  inputText: string,
  outputTokens: number = 256,
  provider: Provider = 'general'
): TokenEstimate {
  const inputTokens = estimateTokens(inputText, provider);

  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    provider,
  };
}

/**
 * Text statistics
 */
export interface TextStats {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  sentences: number;
}

export function getTextStats(text: string): TextStats {
  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const paragraphs =
    text
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0).length || 0;
  const sentences = (text.match(/[.!?]+/g) || []).length || 0;

  return {
    characters,
    charactersWithoutSpaces,
    words,
    lines,
    paragraphs,
    sentences,
  };
}

/**
 * Context window presets
 */
export const WINDOW_PRESETS = [
  { label: '4K', value: 4000 },
  { label: '8K', value: 8000 },
  { label: '16K', value: 16000 },
  { label: '32K', value: 32000 },
  { label: '64K', value: 65000 },
  { label: '128K', value: 128000 },
  { label: '200K', value: 200000 },
  { label: '1M', value: 1000000 },
];

/**
 * Provider metadata
 */
export const PROVIDERS = {
  general: {
    name: 'General',
    description: 'Best-effort token estimation',
    models: ['Standard'],
  },
  openai: {
    name: 'OpenAI',
    description: 'GPT-4, GPT-3.5 tokenization',
    models: ['GPT-4', 'GPT-3.5 Turbo', 'GPT-3'],
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude tokenization',
    models: ['Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 2'],
  },
  gemini: {
    name: 'Google Gemini',
    description: 'Gemini tokenization',
    models: ['Gemini 1.5 Pro', 'Gemini 1.0 Pro'],
  },
  ollama: {
    name: 'Ollama',
    description: 'Local model tokenization',
    models: ['Llama 2', 'Mistral', 'Neural Chat'],
  },
};

/**
 * Context window warnings
 */
export function getContextWindowStatus(
  totalTokens: number,
  contextWindow: number
): {
  percentage: number;
  status: 'safe' | 'caution' | 'danger';
  message: string;
  badge: string;
} {
  const percentage = Math.round((totalTokens / contextWindow) * 100);

  if (percentage <= 50) {
    return {
      percentage,
      status: 'safe',
      message: 'Well within context window',
      badge: '✓ Safe',
    };
  } else if (percentage <= 80) {
    return {
      percentage,
      status: 'caution',
      message: 'Approaching context window limit',
      badge: '⚠ Caution',
    };
  } else {
    return {
      percentage,
      status: 'danger',
      message: 'Exceeds or is very close to context window limit',
      badge: '✕ Too Large',
    };
  }
}

/**
 * Prompt optimization utilities
 */
export interface OptimizationResult {
  originalTokens: number;
  optimizedTokens: number;
  originalLength: number;
  optimizedLength: number;
  reduction: number;
  reductionPercentage: number;
  optimizedText: string;
}

export function removeExtraWhitespace(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
}

export function normalizeLineBreaks(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

export function trimEmptyLines(text: string): string {
  return text
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .join('\n');
}

export function optimizePrompt(
  text: string,
  options: {
    removeExtraWhitespace?: boolean;
    normalizeLineBreaks?: boolean;
    trimEmptyLines?: boolean;
  } = {}
): OptimizationResult {
  const { removeExtraWhitespace: removeWhitespace = true } = options;

  let optimized = text;
  let originalTokens = estimateGeneralTokens(text);

  if (removeWhitespace) {
    optimized = removeExtraWhitespace(optimized);
  }

  if (options.normalizeLineBreaks) {
    optimized = normalizeLineBreaks(optimized);
  }

  if (options.trimEmptyLines) {
    optimized = trimEmptyLines(optimized);
  }

  const optimizedTokens = estimateGeneralTokens(optimized);
  const reduction = originalTokens - optimizedTokens;
  const reductionPercentage =
    originalTokens > 0 ? Math.round((reduction / originalTokens) * 100) : 0;

  return {
    originalTokens,
    optimizedTokens,
    originalLength: text.length,
    optimizedLength: optimized.length,
    reduction: Math.max(0, reduction),
    reductionPercentage: Math.max(0, reductionPercentage),
    optimizedText: optimized,
  };
}
