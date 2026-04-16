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
 * Improved token estimation based on character and word density.
 * divisor: average characters per token (usually ~4)
 */
function calculateHeuristic(text: string, divisor: number): number {
  if (!text) return 0;
  
  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const punctuation = (text.match(/[.,!?;:\(\)\[\]\{\}"'`\-]/g) || []).length;
  
  // Rule of thumb: tokens follow characters for simple English
  // BUT special characters and dense code increase the count.
  const baseTokens = chars / divisor;
  
  // Add weight for punctuation and line breaks
  const weight = punctuation * 0.15;
  
  // For standard English, tokens are usually >= words
  return Math.max(1, Math.ceil(baseTokens + weight));
}

/**
 * Estimates tokens based on character count
 */
export function estimateTokensByCharacters(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * OpenAI token estimation (cl100k_base / p50k_base)
 * Factor: ~3.7-4 chars per token
 */
export function estimateOpenAITokens(text: string): number {
  return calculateHeuristic(text, 3.8);
}

/**
 * Anthropic token estimation
 * Factor: ~3.5 chars per token (Claude tend to be slightly more dense)
 */
export function estimateAnthropicTokens(text: string): number {
  return calculateHeuristic(text, 3.4);
}

/**
 * Gemini token estimation
 * Factor: ~4 chars per token
 */
export function estimateGeminiTokens(text: string): number {
  return calculateHeuristic(text, 4.0);
}

/**
 * Ollama token estimation (local models)
 */
export function estimateOllamaTokens(text: string): number {
  return calculateHeuristic(text, 3.8);
}

/**
 * General token estimation (best effort)
 */
export function estimateGeneralTokens(text: string): number {
  return calculateHeuristic(text, 3.8);
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
