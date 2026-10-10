# Executive Profile

Single-page executive profile built with Next.js (App Router) and Sanity, implemented from the
"Executive Profile v2" design on the Modernist design system.

## Run

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

Until Sanity is connected the site renders the design's built-in copy (`src/sanity/fallback.ts`).

## Connect Sanity

1. Create a project at https://www.sanity.io/manage (or `npx sanity init --bare`) and note the project ID.
2. `cp .env.example .env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.
3. In the Sanity project's API settings, add `http://localhost:3000` (and the production URL) as a CORS origin with credentials.
4. Optional: load the design's copy as the starting document:
   ```bash
   npx sanity dataset import seed/profile.ndjson production
   ```
5. Open `/studio` and edit **Executive profile**, and add entries under **Articles** (each gets its own page at `/insights/<slug>`). Images left empty render as the design's grey placeholders.

## Publishing updates

Content is cached for an hour. For instant updates add a Sanity webhook:

- URL: `https://<your-domain>/api/revalidate`
- Filter: `_type in ["profile", "article"]`
- Secret: the value of `SANITY_REVALIDATE_SECRET`

## Layout

- `src/app/(site)`: the page, layout and styles (`globals.css` holds the Modernist tokens)
- `src/app/(studio)/studio`: embedded Sanity Studio
- `src/sanity`: client, query, types, schema and fallback content
- `sanity.config.ts`: Studio config (`profile` is a singleton)
