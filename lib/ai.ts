import { createOpenAI } from '@ai-sdk/openai';
import { generateText, type LanguageModel } from 'ai';
import { source } from '@/lib/source';

const FALLBACK = 'I can still respond, but no AI provider is currently available. Check the AI environment variables and try again.';

function getModel(): LanguageModel | null {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim() || process.env.AI_API_KEY?.trim();
  if (!apiKey) return null;

  const openrouter = createOpenAI({
    apiKey,
    baseURL: process.env.AI_BASE_URL?.trim() || 'https://openrouter.ai/api/v1',
    headers: {
      'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
      'X-Title': 'AI Fumadocs',
    },
  });

  return openrouter(process.env.AI_MODEL?.trim() || 'openrouter/free');
}

async function documentationContext() {
  const pages = source.getPages().slice(0, 40);
  const results = await Promise.all(pages.map(async (page) => {
    const text = await page.data.getText('processed').catch(() => '');
    return `## ${page.data.title}\nURL: ${page.url}\n${text.slice(0, 5000)}`;
  }));
  return results.join('\n\n').slice(0, 60000);
}

export async function answer(prompt: string) {
  const model = getModel();
  if (!model) return { text: FALLBACK, provider: 'fallback' };

  try {
    const context = await documentationContext();
    const result = await generateText({
      model,
      system: 'You are the AI assistant for this documentation site. Answer using the supplied documentation context when relevant. If the documentation does not contain the answer, say so instead of inventing a site-specific fact. Be concise.',
      prompt: `Documentation context:\n${context}\n\nUser question:\n${prompt}`,
    });
    return { text: result.text || FALLBACK, provider: 'openrouter' };
  } catch (error) {
    console.error('AI provider failure:', error);
    return {
      text: 'The configured free AI provider is temporarily unavailable or rate-limited. The documentation remains fully available; please try the AI again shortly.',
      provider: 'provider-error',
    };
  }
}