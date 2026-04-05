---
title: Layout
order: 3
---

# Layout

Configure the structural layout of your panel — sidebar, topbar, content area, and footer.

## Layout Configuration

Define a `layout()` method on your Panel class:

```php
use InertiaStudio\LayoutConfig;

public function layout(): LayoutConfig
{
    return LayoutConfig::make()
        ->maxWidth('7xl')
        ->contentWidth('full')
        ->gutter('md')
        ->sidebar(
            style: 'dark',
            width: '280px',
            collapsible: true,
        )
        ->topbar(
            sticky: true,
            showBreadcrumbs: true,
            showSearch: true,
        );
}
```

## Overall Layout

```php
LayoutConfig::make()
    ->maxWidth('7xl')           // 'full' | '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl'
    ->contentWidth('full')      // max width of the main content area
    ->gutter('md')              // 'none' | 'sm' | 'md' | 'lg' | 'xl'
```

## Sidebar

```php
LayoutConfig::make()
    ->sidebar(
        style: 'dark',              // 'dark' | 'light' | 'transparent' | 'branded'
        width: '280px',             // sidebar width
        collapsible: true,          // allow collapse to icons-only
        collapsedWidth: '64px',     // width when collapsed
        defaultCollapsed: false,    // start collapsed
        mobileBreakpoint: 'lg',     // when sidebar becomes a drawer
    )
```

| Style | Description |
|-------|-------------|
| `dark` | Dark background with light text |
| `light` | White/surface background with standard text |
| `transparent` | No background, blends with content area |
| `branded` | Uses the primary color as sidebar background |

## Topbar

```php
LayoutConfig::make()
    ->topbar(
        sticky: true,              // stick to top on scroll
        height: '64px',            // topbar height
        showBreadcrumbs: true,     // breadcrumb trail
        showSearch: true,          // global search in topbar
        showUserMenu: true,        // user avatar and menu
    )
```

## Navigation Style

Control where and how navigation renders:

```php
LayoutConfig::make()
    ->navigation(
        style: 'sidebar',          // 'sidebar' | 'topbar' | 'both'
        groupStyle: 'collapsible', // 'collapsible' | 'flat' | 'separated'
        iconSize: 'md',            // 'sm' | 'md' | 'lg'
        activeStyle: 'highlight',  // 'highlight' | 'border-left' | 'pill'
    )
```

## Footer

```php
LayoutConfig::make()
    ->footer(
        enabled: true,
        text: '© 2026 Acme Corp',
        sticky: false,
    )
```

## Shell Structure

```
┌──────────────────────────────────────────────────┐
│  Sidebar (280px)  │  Topbar (64px)               │
│                   │──────────────────────────────│
│   Brand           │                              │
│   Nav groups       │  Content (padded by gutter)  │
│   Nav items        │                              │
│   ...              │                              │
│   User (bottom)    │  Footer (optional)           │
└──────────────────────────────────────────────────┘
```

On mobile (below `mobileBreakpoint`), the sidebar collapses into a slide-out drawer triggered by a hamburger menu in the topbar.
