---
title: Installation
order: 2
---

# Installation

Get Inertia Studio running in your Laravel + Inertia application.

## Requirements

- PHP 8.4+
- Laravel 12 or 13
- Inertia.js v3 (React, Vue, or Svelte)
- Node.js 20+
- Tailwind CSS 4

## Install the packages

```bash
composer require inertia-studio/laravel
```

Install the frontend package — the same `@inertia-studio/ui` package works with all three frameworks:

```bash
npm install @inertia-studio/ui
```

## Run the installer

```bash
php artisan studio:install
```

The installer auto-detects your frontend framework from `package.json` (`@inertiajs/react`, `@inertiajs/vue3`, or `@inertiajs/svelte`) and configures accordingly. To specify explicitly:

```bash
php artisan studio:install --framework=react
php artisan studio:install --framework=vue
php artisan studio:install --framework=svelte
```

This will:

1. Publish the config file (`config/studio.php`)
2. Create the `app/Studio/` directory
3. Generate a default Admin panel at `app/Studio/Admin/Admin.php`
4. Add the Tailwind preset to your CSS
5. Register the Inertia page resolver

## Tailwind Configuration

Add the Studio source paths to your `resources/css/app.css`:

```css
@import 'tailwindcss';
@source '../../vendor/inertia-studio/laravel';
@source '../../node_modules/@inertia-studio/ui';
```

## Vite Configuration

Register the Studio Inertia page resolver in your Vite config:

```typescript
import studio from '@inertia-studio/ui/vite';

export default defineConfig({
    plugins: [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.tsx'] }),
        // your framework plugin (react(), vue(), svelte())
        studio(),
    ],
});
```

## Framework Configuration

The detected framework is stored in `config/studio.php`:

```php
'framework' => 'react', // 'react' | 'vue' | 'svelte'
```

This determines which component format is used when publishing components via `studio:publish`.

## Verify

Start the dev server and visit `/admin`:

```bash
composer run dev
```

You should see the Studio dashboard with a sidebar and welcome message.

## Next Steps

- [Getting Started](/guide/getting-started) — Create your first module
- [Panel Configuration](/panels/configuration) — Customize your panel
