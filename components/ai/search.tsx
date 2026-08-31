'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AIAssistantTrigger() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);

  async function ask() {
    const prompt = question.trim();
    if (!prompt || busy) return;
    setBusy(true); setAnswer('');
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const data = await response.json();
      setAnswer(data.text ?? 'No answer was returned.');
    } catch { setAnswer('The AI service could not be reached. The documentation is still available.'); }
    finally { setBusy(false); }
  }

  return <>
    <Button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 end-4 z-20 shadow-lg">Ask AI</Button>
    {open ? <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-label="AI Chat" className="flex max-h-[80vh] w-full max-w-md flex-col rounded-xl border bg-fd-card p-3 shadow-2xl">
        <div className="flex items-center justify-between px-2 py-1"><div><div className="text-sm font-medium">AI Chat</div><div className="text-xs text-fd-muted-foreground">Answers are grounded in this documentation when possible.</div></div><Button variant="ghost" onClick={() => setOpen(false)}>Close</Button></div>
        <div className="my-3 min-h-40 flex-1 overflow-auto rounded-lg border bg-fd-secondary p-3 text-sm whitespace-pre-wrap">{answer || 'Ask anything about the documentation.'}</div>
        <form onSubmit={(event) => { event.preventDefault(); void ask(); }} className="flex gap-2">
          <input value={question} onChange={(event) => setQuestion(event.target.value)} disabled={busy} placeholder={busy ? 'AI is answering…' : 'Ask a question…'} aria-label="Question" className="min-w-0 flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fd-ring" />
          <Button type="submit" disabled={busy || !question.trim()}>{busy ? '…' : 'Ask'}</Button>
        </form>
      </section>
    </div> : null}
  </>;
}

export function AISearch({ children }: { children: React.ReactNode }) { return <>{children}</>; }
