/**
 * SSG Prerender Script
 *
 * After `vite build` creates the SPA bundle in dist/,
 * this script:
 * 1. Scans content/ for all markdown files
 * 2. Generates a static HTML file for each route
 * 3. Copies index.html as the template for each route
 *
 * The SPA hydrates on load, so the static HTML provides
 * SEO and instant first paint, then React takes over.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, copyFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const CONTENT = join(__dirname, '..', 'src', 'content');

function getRoutes(dir, base = '') {
    const routes = [];
    const entries = readdirSync(dir);

    for (const entry of entries) {
        const full = join(dir, entry);
        const stat = statSync(full);

        if (stat.isDirectory()) {
            routes.push(...getRoutes(full, base ? `${base}/${entry}` : entry));
        } else if (entry.endsWith('.md')) {
            const slug = entry === 'index.md'
                ? (base || 'guide')
                : (base ? `${base}/${entry.replace('.md', '')}` : entry.replace('.md', ''));
            routes.push(slug);
        }
    }

    return routes;
}

function prerender() {
    const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
    const routes = getRoutes(CONTENT);

    console.log(`Prerendering ${routes.length} routes...`);

    for (const route of routes) {
        const dir = join(DIST, route);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        // Write index.html for this route (SPA fallback)
        writeFileSync(join(dir, 'index.html'), indexHtml);
        console.log(`  /${route}/index.html`);
    }

    // Also write a 404.html for GitHub Pages SPA fallback
    writeFileSync(join(DIST, '404.html'), indexHtml);

    console.log(`\nDone! ${routes.length} pages generated.`);
}

prerender();
