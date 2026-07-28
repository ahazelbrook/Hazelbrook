# Hazelbrook &amp; Hazelbrook

Marketing site for Hazelbrook &amp; Hazelbrook — an independent infrastructure
advisory in Melbourne, working across transport, energy, water and social
infrastructure. One page: the proposition, the practice, a track record, a
statement on conflicts, four service areas, and a contact form.

Built with [Astryx](https://github.com/facebook/astryx) (Meta's design system)
on Vite + React + TypeScript.

## Before it goes live

Two jobs, both in `src/content.ts`. The full list of what must be confirmed is
in [`docs/copy-plan.md`](docs/copy-plan.md) §6.

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

**2 · Confirm the claims and the phone number.**

Nothing on the page is a placeholder, so the site can ship as it stands. Three
things still want checking:

- **`+61 426 364 426`** is carried over from the previous site — confirm it is
  a live line.
- **`$30bn+` of projects worked on** and **15+ years** are load-bearing claims,
  set in the display face. Check each against what you can evidence.

**ABN and professional indemnity cover are deferred, not forgotten.** They
belong on the footer's bottom line — the comment in `SiteFooter.tsx` marks the
spot. Until they are there, a prime cannot onboard the practice as a
subcontractor from the website alone, and a procurement officer has to ask for
the ABN.

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

**To host it privately: [`DEPLOY.md`](DEPLOY.md).** Step-by-step, no coding —
hosts the site on Cloudflare from this repository and puts it behind a login so
only named email addresses can reach it. `wrangler.jsonc` in the root is the
deployment config; the two `false` settings in it are what keep the site off
Cloudflare's public `workers.dev` addresses, and should stay that way.

[`docs/cloudflare-zero-trust.md`](docs/cloudflare-zero-trust.md) is the
technical reference behind it — how Access enforcement actually works, why it
fails silently, and why a 525 is a separate problem from an unprotected site.

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

All copy lives in `src/content.ts` — hero, practice, track record, conduct, the
four service areas, contact section, and the enquiry types in the form dropdown.
Nothing is hard-coded in the components.

Before changing anything structural, read [`docs/copy-plan.md`](docs/copy-plan.md).
It is the brief the copy was written to: positioning, audience map, voice rules
and lexicon, and a section-by-section content map. It also records what a brand
review recommended and was deliberately *not* done (§7) — naming the principal,
panel positions, an engagement-shapes block — so those decisions do not get
silently reversed by the next edit.

Two things in there are easy to undo by accident and shouldn't be:

- **The third paragraph of the practice section** is the most commercially
  valuable copy on the site. Every instinct in revision is to make it more
  professional. Don't.
- **The project card labels lead with the discipline**, not the city. That is
  what makes the track record read as proof rather than borrowed glory, and it
  is the reason the conduct section exists directly beneath it.

## Working on it with Claude

`npx astryx` is the discovery tool: `astryx search "<thing>"`,
`astryx component <Name>`, `astryx docs <topic>`. Conventions are in
`.claude/CLAUDE.md`. The short version: components do the layout, tokens do the
values, and the brand CSS is only for editorial moves Astryx has no component
for.
