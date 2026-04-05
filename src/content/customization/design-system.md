---
title: Design System
order: 3
---

# Design System

Studio uses semantic CSS custom properties and a Tailwind preset. All components reference tokens that adapt to light/dark mode and theme configuration.

## Semantic Tokens

Components use `s-*` prefixed Tailwind utilities that map to CSS custom properties:

| Token | Usage | Tailwind Class |
|-------|-------|---------------|
| `s-bg` | Page background | `bg-s-bg` |
| `s-surface` | Cards, modals, dropdowns | `bg-s-surface` |
| `s-surface-alt` | Table headers, subtle backgrounds | `bg-s-surface-alt` |
| `s-border` | Default borders, dividers | `border-s-border` |
| `s-border-strong` | Input borders | `border-s-border-strong` |
| `s-text` | Primary headings | `text-s-text` |
| `s-text-secondary` | Body text, labels | `text-s-text-secondary` |
| `s-text-muted` | Descriptions, hints | `text-s-text-muted` |
| `s-text-faint` | Placeholders, disabled text | `text-s-text-faint` |
| `s-input` | Input field backgrounds | `bg-s-input` |
| `s-hover` | Hover state backgrounds | `hover:bg-s-hover` |
| `s-accent` | Primary accent | `bg-s-accent`, `text-s-accent` |
| `s-accent-fg` | Text on accent backgrounds | `text-s-accent-fg` |
| `s-sidebar` | Sidebar background | `bg-s-sidebar` |
| `s-sidebar-text` | Sidebar text | `text-s-sidebar-text` |

## Tailwind Preset

The preset extends Tailwind with Studio's semantic tokens:

```js
// @inertia-studio/ui/src/shared/theme/preset.ts
export default {
    theme: {
        extend: {
            colors: {
                studio: {
                    primary: 'rgb(var(--studio-primary) / <alpha-value>)',
                    danger: 'rgb(var(--studio-danger) / <alpha-value>)',
                    // ...
                    sidebar: {
                        bg: 'rgb(var(--studio-sidebar-bg) / <alpha-value>)',
                        fg: 'rgb(var(--studio-sidebar-fg) / <alpha-value>)',
                    },
                },
            },
            borderRadius: {
                studio: 'var(--studio-radius)',
            },
            fontFamily: {
                studio: 'var(--studio-font)',
            },
        },
    },
}
```

Usage in components:

```html
<button class="bg-studio-primary text-studio-primary-foreground rounded-studio px-4 py-2">
    Save
</button>
```

## CSS Custom Properties

Theme values serialize to scoped CSS variables:

```css
[data-studio-panel="admin"] {
    --studio-primary: 37 99 235;
    --studio-primary-foreground: 255 255 255;
    --studio-danger: 220 38 38;
    --studio-font: 'Inter', system-ui, sans-serif;
    --studio-font-size: 0.875rem;
    --studio-radius: 0.5rem;
    --studio-density-y: 0.625rem;
    --studio-density-x: 1rem;
    --studio-sidebar-width: 280px;
    --studio-topbar-height: 64px;
}
```

## Dark Mode

Dark mode is automatic. Semantic tokens (`s-bg`, `s-surface`, `s-text`, etc.) have separate light and dark values. Override per-mode via `lightColors()` and `darkColors()` on the Theme:

```php
Theme::make()
    ->lightColors([
        'bg' => '248 250 252',
        'surface' => '255 255 255',
    ])
    ->darkColors([
        'bg' => '10 10 15',
        'surface' => '18 18 24',
    ]);
```

## Status Colors

Used for badges, indicators, and alerts. Fixed across both modes:

| Status | Light | Dark |
|--------|-------|------|
| Info | `bg-accent/10 text-accent` | `bg-accent/15 text-accent` |
| Success | `bg-emerald-500/10 text-emerald-600` | `bg-emerald-400/15 text-emerald-300` |
| Warning | `bg-amber-500/10 text-amber-600` | `bg-amber-400/15 text-amber-300` |
| Danger | `bg-red-500/10 text-red-600` | `bg-red-400/15 text-red-300` |

## Using Tokens in Published Components

When publishing components, use semantic tokens instead of hardcoded colors for consistency:

```html
<!-- Do this -->
<div class="bg-s-surface border border-s-border rounded-xl p-5">
    <h2 class="text-s-text font-semibold">Title</h2>
    <p class="text-s-text-muted text-sm">Description</p>
</div>

<!-- Not this -->
<div class="bg-white border border-gray-200 rounded-xl p-5 dark:bg-gray-800">
    <h2 class="text-gray-900 font-semibold dark:text-white">Title</h2>
</div>
```
