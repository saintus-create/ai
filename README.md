# AI

Minimal Fumadocs documentation site with Flux, native dark/light theming, built-in document search, AI-readable documentation endpoints, and a free OpenRouter AI assistant.

## Local setup

Requirements: Node.js 22+ and pnpm 10+.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Then open `http://localhost:3000`.

## AI

Set `OPENROUTER_API_KEY` in `.env.local`. The default model is `openrouter/free`, which lets OpenRouter route requests across currently available free models.

Optional:

```env
AI_MODEL=openrouter/free
AI_BASE_URL=https://openrouter.ai/api/v1
APP_URL=https://your-domain.example
```

The server-side AI layer deliberately fails closed: missing credentials, provider errors, and rate limits return a useful response instead of hanging the documentation UI.

## Fumadocs

- Flux minimal docs layout
- native light/dark/system theme
- MDX content source
- built-in ZBSearch API at `/api/search`
- `/llms.txt`
- `/llms-full.txt`
- `/docs/<path>.md` AI-readable documentation

Fumadocs' native search is free and self-hostable. Orama Cloud can be substituted later if you want cloud search; the content architecture does not need to change.

## Deployment

The project is Vercel-ready. Add `OPENROUTER_API_KEY` and the optional AI environment variables to the Vercel project, then deploy with Node.js 22+.
