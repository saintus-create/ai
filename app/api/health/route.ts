import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET() {
  const configured = Boolean(process.env.OPENROUTER_API_KEY?.trim() || process.env.AI_API_KEY?.trim());
  return NextResponse.json({
    ok: true,
    ai: {
      configured,
      model: process.env.AI_MODEL || 'openrouter/free',
      provider: configured ? 'openrouter-compatible' : 'fallback-only',
    },
  });
}