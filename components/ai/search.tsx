'use client';

import { useState } from 'react';

export function AIAssistantTrigger() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);

  async function ask() {
    const prompt = question.trim();
    if (!prompt || busy) return;
    setBusy(true);
    setAnswer('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setAnswer(data.text ?? 'No answer was returned.');
    } catch {
      setAnswer('The AI service could not be reached. The documentation is still available.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 end-4 z-20 rounded-2xl border bg-fd-card px-4 py-2 text-sm shadow-lg">
        Ask AI
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 backdrop-blur-sm">
          <section className="flex max-h-[80vh] w-full max-w-md flex-col rounded-2xl border bg-fd-card p-3 shadow-2xl">
            <div className="flex items-center justify-between px-2 py-1">
              <div>
                <div className="text-sm font-medium">AI Chat</div>
                <div className="text-xs text-fd-muted-foreground">Answers are grounded in this documentation when possible.</div>
              </div>
              <button className="rounded-lg px-2 py-1 text-sm" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="my-3 min-h-40 flex-1 overflow-auto rounded-xl border bg-fd-secondary p-3 text-sm whitespace-pre-wrap">
              {answer || 'Ask anything about the documentation.'}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); void ask(); }} className="flex gap-2">
              <input value={question} onChange={(event) => setQuestion(event.target.value)} disabled={busy} placeholder={busy ? 'AI is answering…' : 'Ask a question…'} className="min-w-0 flex-1 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" />
              <button disabled={busy || !question.trim()} className="rounded-xl bg-fd-primary px-4 py-2 text-sm text-fd-primary-foreground disabled:opacity-50">
                {busy ? '…' : 'Ask'}
              </button>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

export function AISearch({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
