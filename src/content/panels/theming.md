---
title: Theming
order: 2
---

# Theming

Customize the visual appearance of your panel with the `Theme` builder.

## Theme Configuration

Define a `theme()` method on your Panel class:

```php
use InertiaStudio\Theme;

public function theme(): Theme
{
    return Theme::make()
        ->primary('#2563eb')
        ->danger('#dc2626')
        ->warning('#d97706')
        ->success('#16a34a')
        ->info('#3b82f6')
        ->gray('#64748b')
        ->fontFamily('Inter')
        ->fontSize('sm')
        ->borderRadius('lg')
        ->density('comfortable');
}
```

## Colors

Set the primary accent and status colors:

```php
Theme::make()
    ->primary('#4F46E5')    // buttons, links, active states
    ->danger('#dc2626')     // delete actions, error states
    ->warning('#d97706')    // warning badges, alerts
    ->success('#16a34a')    // success indicators
    ->info('#3b82f6')       // info badges
    ->gray('#64748b')       // neutral/gray palette base
```

Colors are converted to RGB triplets and exposed as CSS custom properties (`--studio-primary`, etc.) that components reference via the Tailwind preset.

## Typography

```php
Theme::make()
    ->fontFamily('Inter')       // any Google Font or system font
    ->fontSize('sm')            // 'xs' | 'sm' | 'base' | 'lg'
```

## Border Radius

```php
Theme::make()
    ->borderRadius('lg')        // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
```

| Value | CSS | Effect |
|-------|-----|--------|
| `none` | `0` | Square corners |
| `sm` | `0.125rem` | Subtle rounding |
| `md` | `0.375rem` | Moderate rounding |
| `lg` | `0.5rem` | Default rounding |
| `xl` | `0.75rem` | Large rounding |
| `full` | `9999px` | Pill shape |

## Density

Controls vertical and horizontal padding across all components:

```php
Theme::make()
    ->density('comfortable')    // 'compact' | 'comfortable' | 'spacious'
```

| Value | Effect |
|-------|--------|
| `compact` | Tighter spacing, more data visible |
| `comfortable` | Default balanced spacing |
| `spacious` | More breathing room |

## Light and Dark Mode Overrides

Override individual semantic tokens per mode:

```php
Theme::make()
    ->primary('#4F46E5')
    ->lightColors([
        'bg' => '248 250 252',
        'surface' => '255 255 255',
        'text' => '15 23 42',
    ])
    ->darkColors([
        'bg' => '10 10 15',
        'surface' => '18 18 24',
        'accent' => '124 105 255',
    ]);
```

Values can be RGB triplets (`'248 250 252'`) or hex (`'#f8fafc'`).

## Theme Presets

Studio ships with 10 built-in presets:

```php
Theme::make()->preset('zinc');     // cool gray
Theme::make()->preset('slate');    // blue-gray
Theme::make()->preset('stone');    // warm gray
Theme::make()->preset('neutral');  // pure gray
Theme::make()->preset('red');      // red accent
Theme::make()->preset('orange');   // orange accent
Theme::make()->preset('green');    // green accent
Theme::make()->preset('blue');     // blue accent (default)
Theme::make()->preset('violet');   // violet accent
Theme::make()->preset('rose');     // rose accent
```

Presets set the primary color and gray palette. You can override individual settings after applying a preset:

```php
Theme::make()
    ->preset('violet')
    ->density('compact')
    ->borderRadius('xl');
```

## How It Works

Theme values serialize to CSS custom properties scoped to the panel:

```css
[data-studio-panel="admin"] {
    --studio-primary: 37 99 235;
    --studio-danger: 220 38 38;
    --studio-font: 'Inter', system-ui, sans-serif;
    --studio-radius: 0.5rem;
}
```

Components reference these via the Tailwind preset — `bg-studio-primary`, `rounded-studio`, `font-studio` — so theming is zero-JavaScript.
