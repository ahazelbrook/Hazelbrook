# Hazelbrook &amp; Hazelbrook

Marketing site for Hazelbrook &amp; Hazelbrook — infrastructure strategy and
insight, with a focus on renewables. One page: the proposition, the practice,
four service areas, and a contact form.

Built with [Astryx](https://github.com/facebook/astryx) (Meta's design system)
on Vite + React + TypeScript.

## Before it goes live

Two things need real values. Both are in `src/content.ts`.

**1 · Point the contact form at a real endpoint.**

The form posts JSON to `FORM_ENDPOINT`. Create a form at
[Formspree](https://formspree.io) — or Getform / Basin, the payload shape is the
same — and paste the endpoint in:

```ts
export const FORM_ENDPOINT = 'https://formspree.io/f/xyzabc123';
```

Until that is a real URL the form runs in **preview mode**: it validates, and it
tells the visitor plainly that nothing was sent. It never shows a success
message for a message that did not go anywhere.

**2 · Confirm the contact details.**

The address, email and registration number come from the brand pack's
stationery. The telephone number on that mock-up (`+44 20 7946 0102`) is in an
Ofcom range **reserved for fiction and drama** — it is a placeholder, not a live
line. Replace it before launch.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
npm run lint
```

`dist/` is a static bundle — it deploys to Netlify, Vercel, Cloudflare Pages, S3
or any static host with no server-side component.

## How the brand is wired

The brand ships as two files, both from the Hazelbrook brand pack. They are used
for different jobs, and the split is deliberate:

| File | Job |
|---|---|
| `src/theme/hazelbrookTheme.ts` | Every decision Astryx can express — Ember accent, ink, paper, zero radius, Young Serif + Space Grotesk. Applied once in `src/main.tsx` via `<Theme>`. |
| `src/styles/hazelbrook-brand.css` | Only what Astryx has no component for: the ruled line, the dot grid, the tracked label, the reading measure. |
| `src/styles/site.css` | Page chrome — container, section rhythm, the sticky header, the reversed footer. |

The brand pack's CSS also contains a token bridge that writes `--color-*` onto
`:root`. That is **not** reproduced here: the theme already sets those tokens,
and Astryx asks that they stay off `:root`. Layer order is declared once, up
front, in `src/styles/index.css`.

### Two corrections to the supplied pack

Both are commented at the point of change:

- **Font families were double-quoted** in `hazelbrookTheme.ts`
  (`family: "'Space Grotesk'"`). Astryx quotes family names itself, so these
  compiled to `font-family: "'Space Grotesk'"` — not a valid family reference.
  Every Astryx-styled element was silently falling back to a system font. The
  names are now bare.
- **Body size** was inheriting Astryx neutral's 14px base. The brand deck
  specifies 16px with 1.68 leading, so the type scale base is set to 16.

### Fonts are self-hosted

The brand pack pulls Young Serif and Space Grotesk from Google Fonts. This site
bundles them instead (`@fontsource/*`) — the display face is the first thing a
visitor sees and should not depend on a third-party CDN. Same families, same
weights. Both are SIL Open Font License 1.1.

### The mark

`src/components/Brand.tsx` places the supplied vector artwork and never rebuilds
the mark from typefaces, per the brand standard. Minimum sizes from the deck
(180px primary, 32px monogram) are enforced in code. Below 560px the header
drops to the monogram alone, which is what the deck reserves it for.

## Editing the words

All copy lives in `src/content.ts` — hero, mission, the four service areas,
contact section, and the enquiry types in the form dropdown. Nothing is
hard-coded in the components.

The draft copy is written from the brand pack's own language (the proposition,
the standfirsts, and the spectrum's sector meanings) and is meant to be
rewritten. The figures in the practice section — `£40bn+` advised, two offices —
are illustrative and should be checked before publication.

## Working on it with Claude

`npx astryx` is the discovery tool: `astryx search "<thing>"`,
`astryx component <Name>`, `astryx docs <topic>`. Conventions are in
`.claude/CLAUDE.md`. The short version: components do the layout, tokens do the
values, and the brand CSS is only for editorial moves Astryx has no component
for.
