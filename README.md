# Inertia Studio — Documentation

Documentation site for [Inertia Studio](https://github.com/inertia-studio), built with Vite + React and deployed to GitHub Pages.

**Live:** [inertia-studio.github.io](https://inertia-studio.github.io)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Generates static HTML for all 37 pages in `dist/`.

## Deployment

Automatic via GitHub Actions — push to `main` triggers build and deploy to GitHub Pages.

## Adding Pages

Add a markdown file in `src/content/{section}/`:

```markdown
---
title: Page Title
order: 1
---

# Page Title

Content here.
```

The sidebar and routing are auto-generated from the file structure.

## License

MIT
