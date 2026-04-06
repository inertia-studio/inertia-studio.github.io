---
title: Installation
order: 2
---

# Installation

Two commands. Works on any Laravel project — with or without Inertia already installed.

## Quick Start

```bash
composer require inertia-studio/laravel-adapter
php artisan studio:install
```

That's it. The installer handles everything:

1. **Detects your frontend framework** — or asks you to choose (React, Vue, or Svelte)
2. **Installs missing dependencies** — Inertia, React/Vue/Svelte, Vite plugins, `@inertia-studio/ui`
3. **Configures Vite** — adds `react()` and `studio()` plugins
4. **Creates the app entry** — `resources/js/app.tsx` with the Studio page resolver
5. **Sets up Tailwind** — adds Studio source paths and design tokens
6. **Scaffolds the Admin panel** — `app/Studio/Admin/Admin.php`
7. **Publishes assets** — config file and Studio logo

Then build and visit `/admin`:

```bash
npm run build
php artisan serve
```

## Starting Points

The installer works with three scenarios:

### Bare Laravel (no Inertia, no React)

```bash
laravel new myapp
cd myapp
composer require inertia-studio/laravel-adapter
php artisan studio:install
```

The installer will ask which framework you want, then install Inertia + React/Vue/Svelte + all Vite plugins automatically.

### Laravel + React Starter Kit

```bash
laravel new myapp --react
cd myapp
composer require inertia-studio/laravel-adapter
php artisan studio:install
```

The installer detects React is already installed, adds Studio on top — patches `app.tsx` and `vite.config.ts`.

### Explicit Framework Choice

```bash
php artisan studio:install --framework=vue
php artisan studio:install --framework=svelte
```

## What Gets Configured

### Vite (`vite.config.ts`)

The installer adds the framework plugin and Studio plugin:

```typescript
import react from '@vitejs/plugin-react';
import studio from '@inertia-studio/ui/vite';

export default defineConfig({
    plugins: [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.tsx'] }),
        react(),
        studio(),
        tailwindcss(),
    ],
});
```

### App Entry (`resources/js/app.tsx`)

The page resolver handles both Studio pages and your app pages:

```tsx
import { resolveStudioPage } from '@inertia-studio/ui/vite';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createInertiaApp } from '@inertiajs/react';

const appPages = import.meta.glob('./pages/**/*.tsx');

createInertiaApp({
    resolve: (name) => resolveStudioPage(name)
        ?? resolvePageComponent(`./pages/${name}.tsx`, appPages),
});
```

### Tailwind CSS (`resources/css/app.css`)

Studio's design tokens and source paths are added:

```css
@import 'tailwindcss';
@import '@inertia-studio/ui/studio.css';

@source '../../vendor/inertia-studio/laravel-adapter';
@source '../../node_modules/@inertia-studio/ui';
```

### Panel (`app/Studio/Admin/Admin.php`)

A default panel with the Studio logo:

```php
class Admin extends Panel
{
    protected string $path = '/admin';
    protected ?string $brandIcon = '/vendor/studio/logo.svg';
}
```

## Requirements

- PHP 8.4+
- Laravel 12 or 13
- Node.js 20+
- Tailwind CSS 4

Inertia.js, React/Vue/Svelte, and `@inertia-studio/ui` are installed automatically by the installer if missing.

## Next Steps

- [Getting Started](/guide/getting-started) — Create your first module
- [Panel Configuration](/panels/configuration) — Customize your panel
