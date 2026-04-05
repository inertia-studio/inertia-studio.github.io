---
title: Configuration
order: 1
---

# Configuration

A Panel is a self-contained admin interface with its own URL prefix, authentication, theme, and navigation.

## Panel Class

Panels live in `app/Studio/{Name}/{Name}.php` and are auto-discovered by the framework:

```php
namespace App\Studio\Admin;

use InertiaStudio\Panel;
use InertiaStudio\Theme;
use InertiaStudio\LayoutConfig;

class Admin extends Panel
{
    protected string $path = '/admin';
    protected string $brandName = 'Admin';
    protected ?string $brandLogo = null;
    protected ?string $brandLogoCollapsed = null;
    protected ?string $favicon = null;
}
```

## URL Prefix

The `$path` property defines the URL prefix for all routes in this panel:

```php
protected string $path = '/admin';
// Routes: /admin, /admin/modules/users, /admin/modules/users/create, etc.
```

## Branding

```php
protected string $brandName = 'My Application';
protected ?string $brandLogo = '/images/logo.svg';
protected ?string $brandLogoCollapsed = '/images/logo-icon.svg';
protected ?string $favicon = '/favicon.ico';
```

## Authentication

### Access Control

The `canAccess()` method determines which authenticated users can access the panel:

```php
public function canAccess($user): bool
{
    return $user->is_admin;
}
```

### Auth Guard

Override the default guard for the panel:

```php
public function guard(): string
{
    return 'admin';
}
```

### Middleware

Add additional middleware to all panel routes:

```php
public function middleware(): array
{
    return [
        'verified',
        'track-activity',
    ];
}
```

The panel automatically applies `web`, `auth:{guard}`, and `studio.access:{panel}` middleware. Your custom middleware is added on top.

## Module Registration

By default, modules are auto-discovered from `app/Studio/{Panel}/Modules/`. Override to register explicitly:

```php
public function modules(): array
{
    return [
        Users::class,
        Orders::class,
        Products::class,
    ];
}
```

## Dashboard

Define widgets for the panel's dashboard page:

```php
public function dashboard(): array
{
    return [
        Widget::statGroup([
            Widget::stat('Total Users')->value(fn () => User::count()),
            Widget::stat('Revenue')->value(fn () => '$' . number_format(Order::sum('total') / 100, 2)),
        ]),
    ];
}
```

## Login Page

Customize the login URL:

```php
public function loginUrl(): string
{
    return '/admin/login';
}
```

## Next Steps

- [Theming](/panels/theming) — Colors, fonts, density
- [Layout](/panels/layout) — Sidebar, topbar, content area
- [Navigation](/panels/navigation) — Groups, badges, custom links
