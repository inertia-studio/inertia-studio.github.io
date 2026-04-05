---
title: CLI Reference
order: 1
---

# CLI Reference

All Artisan commands provided by Inertia Studio.

## studio:install

Scaffold Studio in your Laravel application.

```bash
php artisan studio:install [--framework=react|vue|svelte]
```

**What it does:**

1. Publishes `config/studio.php`
2. Creates `app/Studio/` directory
3. Generates a default Admin panel
4. Adds the Tailwind preset to your CSS
5. Registers the Inertia page resolver

**Options:**

| Flag | Description |
|------|-------------|
| `--framework` | Frontend framework (`react`, `vue`, `svelte`). Auto-detected from `package.json` if not specified. |

## studio:panel

Generate a new panel.

```bash
php artisan studio:panel {name}
```

**Example:**

```bash
php artisan studio:panel Customer
# → app/Studio/Customer/Customer.php
# → app/Studio/Customer/Modules/
```

## studio:module

Generate a new module for a panel.

```bash
php artisan studio:module {name} --panel={panel} [--generate] [--simple]
```

**Examples:**

```bash
# Basic module
php artisan studio:module Users --panel=Admin

# Auto-generate from database schema
php artisan studio:module Users --panel=Admin --generate

# Simple module (modal CRUD)
php artisan studio:module Tags --panel=Admin --simple
```

**Options:**

| Flag | Description |
|------|-------------|
| `--panel` | Target panel name (required) |
| `--generate` | Introspect the model's database table to auto-build form fields and table columns |
| `--simple` | Generate a simple module with `$simple = true` for modal-based CRUD |

## studio:relation

Generate a relation manager for a module.

```bash
php artisan studio:relation {name} --module={module} --panel={panel}
```

**Example:**

```bash
php artisan studio:relation PostsRelation --module=Users --panel=Admin
# → app/Studio/Admin/Modules/Users/Relations/PostsRelation.php
```

**Options:**

| Flag | Description |
|------|-------------|
| `--module` | Parent module name (required) |
| `--panel` | Target panel name (required) |

## studio:page

Generate a custom page.

```bash
php artisan studio:page {name} --panel={panel} [--module={module}]
```

**Examples:**

```bash
# Panel-level page
php artisan studio:page Dashboard --panel=Admin
# → app/Studio/Admin/Pages/Dashboard.php

# Module sub-page
php artisan studio:page Analytics --module=Users --panel=Admin
# → app/Studio/Admin/Modules/Users/Pages/Analytics.php
```

**Options:**

| Flag | Description |
|------|-------------|
| `--panel` | Target panel name (required) |
| `--module` | Parent module name (optional, creates a module sub-page) |

## studio:widget

Generate a widget.

```bash
php artisan studio:widget {name} --panel={panel}
```

**Example:**

```bash
php artisan studio:widget StatsOverview --panel=Admin
# → app/Studio/Admin/Widgets/StatsOverview.php
```

## studio:publish

Publish frontend components for customization.

```bash
php artisan studio:publish [--component=] [--group=] [--pages] [--all] [--config] [--force]
```

**Examples:**

```bash
# Single component
php artisan studio:publish --component=TextField

# Component group
php artisan studio:publish --group=form
php artisan studio:publish --group=table
php artisan studio:publish --group=layout
php artisan studio:publish --group=actions
php artisan studio:publish --group=widgets

# All components
php artisan studio:publish --all

# Inertia page templates
php artisan studio:publish --pages

# Config file
php artisan studio:publish --config

# Force overwrite existing published files
php artisan studio:publish --component=TextField --force
```

**Options:**

| Flag | Description |
|------|-------------|
| `--component` | Publish a single component by name |
| `--group` | Publish a component group (`form`, `table`, `layout`, `actions`, `widgets`) |
| `--pages` | Publish Inertia page templates |
| `--all` | Publish all components |
| `--config` | Publish the config file |
| `--force` | Overwrite existing published files |

Published files are placed in `resources/js/studio/` using the format (`.tsx`, `.vue`, `.svelte`) configured in `config/studio.php`.
