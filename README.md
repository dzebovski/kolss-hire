# KOLSS Hire

Landing page for the KOLSS Legionowo furniture sales vacancy, in Polish, Ukrainian and English. Next.js 16.4, React 19.3, TypeScript, Tailwind 4. Applications are delivered only to the private HR Slack channel.

## Local development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `/uk`, `/pl` or `/en`. Without Slack configuration, submitting returns 503 and preserves the form. Empty Pixel ID disables tracking. Never use the CRM Slack token.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm test
npm run build
```

`npm run check:content` rejects unresolved HR placeholders. The production prebuild runs it when `VERCEL_ENV=production`; previews remain available. Next fonts require network access during a clean build.

## Release requirements

Fill server/public environment variables described in `.env.example`, replace all HR notices, configure BotID and WAF rate limiting for `POST /api/apply`, and verify Slack delivery plus consent and event deduplication in Meta Test Events. CV files are limited to 4,000,000 bytes; larger CVs must be linked. The complete validation record and remaining checks are in [docs/04-verification.md](docs/04-verification.md).

No deployment or push is performed by this implementation.
