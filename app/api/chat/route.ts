import { convertToModelMessages, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { source } from "@/lib/source";

export const runtime = "nodejs";

const FALLBACK =
  "The AI provider is not configured or is temporarily unavailable. The documentation is still available.";

function getModel() {
  const apiKey =
    process.env.OPENROUTER_API_KEY?.trim() ||
    process.env.AI_API_KEY?.trim();

  if (!apiKey) return null;

  const openrouter = createOpenAI({
    apiKey,
    baseURL:
      process.env.AI_BASE_URL?.trim() ||
      "https://openrouter.ai/api/v1",
    headers: {
      "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
      "X-Title": "AI Fumadocs",
    },
  });

  return openrouter(
    process.env.AI_MODEL?.trim() || "openrouter/free",
  );
}

async function documentationContext() {
  const pages = source.getPages().slice(0, 40);
  const results = await Promise.all(
    pages.map(async (page) => {
      const text = await page.data.getText("processed").catch(() => "");
      return `## ${page.data.title}\nURL: ${page.url}\n${text.slice(0, 5000)}`;
    }),
  );
  return results.join("\n\n").slice(0, 60000);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const model = getModel();

    if (!model) {
      return Response.json({ error: FALLBACK }, { status: 503 });
    }

    const context = await documentationContext();
    const messages = await convertToModelMessages(body.messages ?? []);

    const result = streamText({
      model,
      system:
        "You are the AI assistant for this documentation site. Answer using the supplied documentation context when relevant. If the documentation does not contain the answer, say so instead of inventing a site-specific fact. Be concise.\n\nDocumentation context:\n" +
        context,
      messages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route failure:", error);
    return Response.json({ error: FALLBACK }, { status: 500 });
  }
}
