import { NextResponse } from 'next/server';
import { answer } from '@/lib/ai';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) return NextResponse.json({ text: 'Please enter a question.' }, { status: 400 });
    if (prompt.length > 12000) return NextResponse.json({ text: 'Please shorten that question.' }, { status: 413 });

    return NextResponse.json(await answer(prompt));
  } catch (error) {
    console.error('Chat route failure:', error);
    return NextResponse.json({
      text: 'The AI request failed safely. The documentation is still available and you can try again.',
      provider: 'route-fallback',
    });
  }
}