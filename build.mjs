/* ==========================================================================
   KAPS build
   Assembles ten static pages from one shell plus per-page body content.
   Output is plain HTML at the repo root: no runtime framework, openable
   directly from disk.

   Run:  node build.mjs
   ========================================================================== */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'src');
const read = (p) => readFileSync(join(src, p), 'utf8');

const shell = read('shell.html');
const header = read('partials/header.html');
const footer = read('partials/footer.html');

/* Photography credits are not rendered, by client instruction.

   The attribution data is not lost: assets/img/photo/credits.json holds the
   photographer, profile URL and Unsplash id for every image in use, and the
   `.credits` styles are still in base.css.

   Note that Unsplash's API terms do require the photographer be named with a
   link back to their profile while their images are on the site. Restoring
   the line is a two-step change: set RENDER_CREDITS below to true, and put
   {{credits}} back into src/partials/footer.html. The obligation disappears
   entirely once these interim images are replaced with photographs of real
   KAPS work. */
const RENDER_CREDITS = false;

let creditsHtml = '';
if (RENDER_CREDITS) {
  const credits = JSON.parse(
    readFileSync(join(here, 'assets/img/photo/credits.json'), 'utf8')
  );
  const seen = new Set();
  const names = credits
    .filter((c) => !seen.has(c.profile) && seen.add(c.profile))
    .sort((a, b) => a.photographer.localeCompare(b.photographer))
    .map(
      (c) =>
        '<a href="' + c.profile + '?utm_source=kaps&utm_medium=referral"' +
        ' target="_blank" rel="noopener">' + c.photographer + '</a>'
    )
    .join(', ');
  creditsHtml =
    '<p class="credits">Photography by ' + names +
    ' on <a href="https://unsplash.com?utm_source=kaps&utm_medium=referral"' +
    ' target="_blank" rel="noopener">Unsplash</a>. Interim imagery, to be' +
    ' replaced by photographs of KAPS work.</p>';
}

const pagesDir = join(src, 'pages');
const files = readdirSync(pagesDir).filter((f) => f.endsWith('.html'));

let built = 0;
for (const file of files) {
  const raw = readFileSync(join(pagesDir, file), 'utf8');

  // Each page opens with a <!--meta { ... } --> block.
  const m = raw.match(/^<!--meta\s*([\s\S]*?)-->/);
  if (!m) {
    console.error(`  skip ${file}: no meta block`);
    continue;
  }
  const meta = JSON.parse(m[1]);
  const body = raw.slice(m[0].length).trim();

  // Mark the active nav item. Matched on data-nav rather than href, because
  // the logo also points at index.html and would otherwise be flagged.
  const nav = meta.nav
    ? header.replace(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" aria-current="page"`)
    : header;

  const out = shell
    .replace(/\{\{title\}\}/g, meta.title)
    .replace(/\{\{description\}\}/g, meta.description)
    .replace('{{header}}', nav)
    .replace('{{body}}', body)
    .replace('{{footer}}', footer.replace('{{credits}}', creditsHtml));

  writeFileSync(join(here, file), out);
  built++;
  console.log(`  built ${file}`);
}
console.log(`\n${built} pages built.`);
