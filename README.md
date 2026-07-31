# Atty. Paul Magtulis — Landing Page

Editorial one-page site for Atty. Paul Anthony Magtulis, a Philippine attorney in
private practice. Built around the concept **"Clear counsel. Considered action."**

- Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion
- Fonts: Newsreader (serif) + Manrope (sans) via `next/font`
- All copy is grounded in the verified profile at `content/paul-profile.md`;
  structured site content lives in `content/paul-profile.ts`.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run lint
npm run build
```

## Remaining TODOs (need verified information)

1. **Contact details** — the source document contains no email, phone, or office
   address. Add them in `content/paul-profile.ts` (`contact`); the contact section
   and footer render each row automatically once present.
2. **Inquiry delivery** — the form validates and POSTs to `app/api/inquiry/route.ts`,
   which is a documented integration point (Resend/SMTP instructions inside). Until
   wired up, the endpoint returns 503 and the UI tells the visitor honestly that
   nothing was sent.
3. **Production domain** — replace the placeholder `site.url` in
   `content/paul-profile.ts` (used for canonical URL, Open Graph, and JSON-LD).
4. **Privacy notice** — the footer link is a placeholder; add a real page before launch.
5. **LinkedIn / profile URL** — not present in the source document; add to
   `contact.linkedin` if Paul wants it shown.

## Content rules

Do not add awards, case results, testimonials, statistics, or superlatives that are
not supported by `content/paul-profile.md`. The "Representative Work" section was
deliberately omitted — the source contains no publishable engagements.
