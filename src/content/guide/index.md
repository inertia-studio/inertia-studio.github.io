---
title: Introduction
order: 1
---

# Introduction

Inertia Studio is a server-driven admin panel framework for Laravel + Inertia.js. Define your admin panels in PHP — forms, tables, filters, actions, pages — and the framework renders them as a modern SPA using React, Vue, or Svelte.

**Think Filament, but for Inertia apps.**

## Why Inertia Studio?

If you're building with Laravel + Inertia, you have two options for admin panels:

1. **Filament** — excellent, but requires Livewire. You end up running two frontend stacks.
2. **Build from scratch** — full control, but you're writing the same CRUD scaffolding for every project.

Inertia Studio gives you Filament's DX while staying inside your existing Inertia stack. One frontend, one set of components, one deployment.

## Architecture

```
PHP (define) → JSON Schema → Frontend (render)
```

Everything flows through a JSON schema protocol:

- **PHP builders** define your admin panel declaratively — `Field::text('name')`, `Column::badge('status')`, `Filter::select('role')`
- **Laravel adapter** handles routing, Eloquent queries, auth, file uploads, and serializes the schema to JSON
- **Frontend components** receive the schema via Inertia props and render the full admin UI

You write PHP. The framework handles everything else.

## Frontend Framework Support

The frontend package `@inertia-studio/ui` ships components for all three Inertia frameworks via subpath exports:

```bash
# Same npm package, different imports
import { DataTable, PanelLayout } from '@inertia-studio/ui/react'
import { DataTable, PanelLayout } from '@inertia-studio/ui/vue'
import { DataTable, PanelLayout } from '@inertia-studio/ui/svelte'
```

All three render identical UI using the same Tailwind classes and the same JSON schema. The PHP side is completely framework-agnostic — your module definitions work with any frontend.

## Key Concepts

### Panels

A Panel is a self-contained admin area with its own URL prefix, auth guard, theme, and navigation. Most apps have one panel (`/admin`), but you can create multiple — `/admin`, `/portal`, `/partner`.

```php
class Admin extends Panel
{
    protected string $path = '/admin';
    protected string $brandName = 'My App';
}
```

### Modules

A Module is a CRUD unit — one Eloquent model, one set of forms/tables/actions. Think of it as a "resource" in Nova or Filament.

```php
class Users extends Module
{
    protected static string $model = User::class;

    public static function form(Form $form): Form { /* ... */ }
    public static function table(Table $table): Table { /* ... */ }
}
```

### PageSchema

For pages that aren't CRUD — dashboards, settings, analytics — use `PageSchema` to compose layouts from 24 primitives, entirely in PHP:

```php
public function schema(): array
{
    return [
        Widget::row([
            Widget::stat('Users')->value(User::count()),
            Widget::stat('Posts')->value(Post::count()),
        ]),
        PageSchema::table('Recent Posts')
            ->columns([...])
            ->query(fn () => Post::latest()->limit(10)),
    ];
}
```

## Quick Links

- [Installation](/guide/installation) — Get up and running
- [Getting Started](/guide/getting-started) — Build your first module
- [Panels](/panels/configuration) — Configure your admin panel
- [Fields Reference](/forms/text-inputs) — All 30+ field types
