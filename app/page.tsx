import Link from "next/link";
import { AssistantChat } from "@/components/ai/assistant-chat";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-20">
      <p className="mb-4 text-sm text-fd-muted-foreground">FUMADOCS · AI</p>
      <h1 className="text-5xl font-semibold tracking-tight">
        Minimal docs. Free AI when you need it.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-fd-muted-foreground">
        A current Fumadocs foundation with Flux, dark mode, native search,
        AI-readable docs, and an OpenRouter free-model fallback strategy.
      </p>
      <div className="mt-8">
        <Link
          href="/docs"
          className="rounded-xl bg-fd-primary px-5 py-3 text-fd-primary-foreground"
        >
          Open docs
        </Link>
      </div>
      <AssistantChat />
    </main>
  );
}
