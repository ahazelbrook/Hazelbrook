/**
 * Prerender the Journal to static HTML.
 *
 * Runs after `vite build`. Reads the markdown in src/journal/, and writes a real
 * HTML document per article into dist/journal/<slug>/index.html, plus the
 * journal index, a sitemap and robots.txt.
 *
 * WHY THIS EXISTS, RATHER THAN A ROUTE IN THE APP
 * The site is a client-rendered single-page app. That is fine for one page a
 * visitor arrives at deliberately, but articles have to be found — and a page
 * whose content only exists after JavaScript runs is at the mercy of whether a
 * given crawler executes it. Search engines mostly do; the assistants that an
 * increasing share of this audience asks instead mostly do not.
 *
 * So these pages ship no JavaScript at all. They are prose, they need none, and
 * static HTML is the most reliably indexable thing there is. They borrow the
 * app's compiled stylesheet, whose hashed filename is read out of the built
 * index.html rather than guessed.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const journalSrc = join(root, 'src', 'journal');

const SITE = 'https://hazelbrook.co';

/* Held raw, and escaped at each point of use. Storing them pre-escaped meant
   the ampersand went through esc() a second time on its way into <title>, and
   the tab read "Hazelbrook &amp;amp; Hazelbrook". */
const FIRM = 'Hazelbrook & Hazelbrook';
const DISCIPLINE = 'Infrastructure Strategy & Commercial Advisory';

/* -----------------------------------------------------------------------------
   Frontmatter — a deliberately small parser.

   The four keys below are all the build needs, and every value is a plain
   single-line string. Pulling in a YAML dependency to read four strings would
   be more code to audit, not less.
----------------------------------------------------------------------------- */
function parseFrontmatter(raw, file) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`${file}: missing frontmatter block`);

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const at = line.indexOf(':');
    if (at === -1) throw new Error(`${file}: cannot parse frontmatter line "${line}"`);
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  for (const key of ['title', 'description', 'slug', 'date', 'standfirst']) {
    if (!data[key]) throw new Error(`${file}: frontmatter is missing "${key}"`);
  }
  return { data, body: match[2] };
}

/** Escape for use in HTML text and attribute values. */
const esc = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Escape for embedding inside a JSON-LD <script> block. */
const jsonLd = obj => JSON.stringify(obj).replace(/</g, '\\u003c');

/**
 * Reading time at 220 words per minute — the rate for considered prose rather
 * than the 250+ usually quoted for web copy.
 */
const readingTime = body => `${Math.max(1, Math.round(body.split(/\s+/).length / 220))} min read`;

const formatDate = iso =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/* -----------------------------------------------------------------------------
   Page furniture
   Hand-written rather than rendered from the React components, because these
   pages deliberately have no React on them. The markup mirrors SiteHeader and
   SiteFooter; the classes are the same, so the compiled stylesheet dresses
   them identically.
----------------------------------------------------------------------------- */
const header = `<header class="hb-site-header">
      <div class="hb-site-header__inner">
        <div class="hb-hstack" style="display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%">
          <a href="/" class="hb-lockup" aria-label="${esc(FIRM)} — home" style="display:flex;align-items:center;gap:8px">
            <img src="/favicon.svg" width="32" height="32" alt="" />
            <span class="hb-wordmark">${esc(FIRM)}</span>
          </a>
          <nav aria-label="Primary">
            <div style="display:flex;align-items:center;gap:24px">
              <a href="/#practice" class="hb-nav-link">Practice</a>
              <a href="/#services" class="hb-nav-link">Services</a>
              <a href="/journal/" class="hb-nav-link">Journal</a>
              <a href="/#contact" class="hb-nav-link">Contact</a>
            </div>
          </nav>
        </div>
      </div>
    </header>`;

const footer = `<footer class="hb-section hb-panel--ink">
      <div class="hb-container">
        <p class="hb-label">${esc(DISCIPLINE)}</p>
        <hr class="hb-rule hb-rule--reversed" style="margin-block:32px" />
        <div style="display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between">
          <p class="hb-label">© ${new Date().getFullYear()} ${esc(FIRM)}</p>
          <a href="mailto:hello@hazelbrook.co" class="hb-link hb-link--reversed">hello@hazelbrook.co</a>
        </div>
      </div>
    </footer>`;

/** The compiled stylesheet's hashed name, read from the built index.html. */
function stylesheetHref() {
  const indexPath = join(dist, 'index.html');
  if (!existsSync(indexPath)) {
    throw new Error('dist/index.html not found — run `vite build` before prerendering.');
  }
  const found = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/.exec(readFileSync(indexPath, 'utf8'));
  if (!found) throw new Error('No stylesheet link found in dist/index.html.');
  return found[1];
}

function document_({ title, description, canonical, head = '', body }) {
  return `<!doctype html>
<html lang="en-AU">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/hazelbrook-monogram-ink-512.png" />
    <meta name="theme-color" content="#F6F5F1" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="${esc(FIRM)}" />
    <meta property="og:image" content="${SITE}/hazelbrook-logomark-2400.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="${CSS}" />
${head}  </head>
  <body>
    <a href="#article" class="hb-skip-link">Skip to content</a>
    ${header}
    <main>
${body}
    </main>
    ${footer}
  </body>
</html>
`;
}

/* -----------------------------------------------------------------------------
   Build
----------------------------------------------------------------------------- */
const CSS = stylesheetHref();

if (!existsSync(journalSrc)) {
  console.log('prerender: no src/journal directory — nothing to build.');
  process.exit(0);
}

const files = readdirSync(journalSrc).filter(f => f.endsWith('.md'));
if (files.length === 0) {
  console.log('prerender: no articles found.');
  process.exit(0);
}

marked.setOptions({ mangle: false, headerIds: false });

const articles = files
  .map(file => {
    const { data, body } = parseFrontmatter(readFileSync(join(journalSrc, file), 'utf8'), file);
    return { ...data, body, html: marked.parse(body), minutes: readingTime(body), file };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

/* Every article carries Article schema. The publisher is the firm rather than a
   person: the site names no principal, and claiming an author it does not show
   would be a structured-data lie. */
for (const a of articles) {
  const url = `${SITE}/journal/${a.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Hazelbrook & Hazelbrook' },
    publisher: { '@type': 'Organization', name: 'Hazelbrook & Hazelbrook' },
  };

  const body = `      <article class="hb-section" id="article">
        <div class="hb-container">
          <p class="hb-label"><a href="/journal/" style="color:inherit">Journal</a></p>
          <h1 class="hb-display hb-display--l" style="margin-block:24px 0;max-width:20ch">${esc(a.title)}</h1>
          <p class="hb-standfirst" style="margin-block-start:24px;max-width:var(--hb-measure)">${esc(a.standfirst)}</p>
          <div class="hb-meta" style="margin-block-start:32px">
            <p class="hb-label">${formatDate(a.date)}</p>
            <p class="hb-label">${a.minutes}</p>
          </div>
          <hr class="hb-rule" style="margin-block:48px" />
          <div class="hb-article">
${a.html}
          </div>
        </div>
      </article>

      <section class="hb-section hb-section--shade">
        <div class="hb-container">
          <p class="hb-label">Hazelbrook &amp; Hazelbrook</p>
          <p class="hb-standfirst" style="margin-block-start:16px;max-width:var(--hb-measure)">Independent advice on the commercial case for transport, energy, water and social infrastructure.</p>
          <p style="margin-block-start:32px"><a href="/#contact" class="hb-link">Tell us what you are working on →</a></p>
        </div>
      </section>`;

  const dir = join(dist, 'journal', a.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, 'index.html'),
    document_({
      title: `${a.title} — ${FIRM}`,
      description: a.description,
      canonical: url,
      head: `    <script type="application/ld+json">${jsonLd(schema)}</script>\n`,
      body,
    }),
  );
  console.log(`prerender: /journal/${a.slug}/ (${a.minutes})`);
}

/* The index. */
const entries = articles
  .map(
    a => `            <li class="hb-entry">
              <a href="/journal/${a.slug}/">
                <p class="hb-label">${formatDate(a.date)} · ${a.minutes}</p>
                <h2 class="hb-entry__title">${esc(a.title)}</h2>
                <p class="hb-entry__standfirst">${esc(a.standfirst)}</p>
              </a>
            </li>`,
  )
  .join('\n');

mkdirSync(join(dist, 'journal'), { recursive: true });
writeFileSync(
  join(dist, 'journal', 'index.html'),
  document_({
    title: `Journal — ${FIRM}`,
    description:
      'Notes on infrastructure business cases, demand forecasting, contracting models and the commercial case — from an independent Melbourne advisory.',
    canonical: `${SITE}/journal/`,
    body: `      <section class="hb-section" id="article">
        <div class="hb-container">
          <p class="hb-label">Journal</p>
          <h1 class="hb-display hb-display--l" style="margin-block:24px 0">Notes from the practice</h1>
          <p class="hb-standfirst" style="margin-block-start:24px;max-width:var(--hb-measure)">What we have learned about business cases, demand evidence, contracting models and the numbers that decide a project.</p>
          <ul class="hb-entries" style="margin-block-start:64px">
${entries}
          </ul>
        </div>
      </section>`,
  }),
);

/* Sitemap and robots. The home page is listed first and weighted highest; the
   journal index and articles follow. */
const urls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/journal/`, priority: '0.8' },
  ...articles.map(a => ({ loc: `${SITE}/journal/${a.slug}/`, priority: '0.7', lastmod: a.date })),
];

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`,
);

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`prerender: ${articles.length} article(s), index, sitemap, robots.txt`);
