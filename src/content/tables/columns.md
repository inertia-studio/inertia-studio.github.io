---
title: Columns
order: 2
---

# Columns

Column types for displaying data in tables.

## Text

Basic text display:

```php
Column::text('name')
    ->label('Full Name')
    ->searchable()
    ->sortable()
    ->copyable()                    // click to copy
    ->limit(50)                     // truncate long text
    ->wrap()                        // allow text wrapping
```

### Computed Values

```php
Column::text('full_name')
    ->getStateUsing(fn ($record) => $record->first_name . ' ' . $record->last_name)
```

## Badge

Colored badge for status/category values:

```php
Column::badge('status')
    ->colors([
        'primary' => 'active',
        'warning' => 'pending',
        'danger' => 'cancelled',
        'success' => 'completed',
    ])
```

## Boolean

True/false display with check/cross icons:

```php
Column::boolean('is_active')
    ->label('Active')

Column::boolean('email_verified_at')
    ->label('Verified')
    ->getStateUsing(fn ($record) => $record->email_verified_at !== null)
```

## Image

Thumbnail image display:

```php
Column::image('avatar')
    ->circular()                    // round image
    ->size(40)                      // width and height in px
    ->defaultImageUrl('/placeholder.png')
```

## Icon

Icon display based on value:

```php
Column::icon('priority')
    ->icons([
        'arrow-up' => 'high',
        'minus' => 'medium',
        'arrow-down' => 'low',
    ])
    ->colors([
        'danger' => 'high',
        'warning' => 'medium',
        'success' => 'low',
    ])
```

## Color

Color swatch display:

```php
Column::color('theme_color')
```

## Date

Formatted date/time display:

```php
Column::date('created_at')
    ->dateTime()                    // show date and time
    ->sortable()
    ->since()                       // relative time (e.g. "2 hours ago")

Column::date('published_at')
    ->date()                        // date only
    ->format('M d, Y')             // custom format
```

## Money

Currency-formatted display:

```php
Column::money('price')
    ->currency('USD')
    ->locale('en_US')
```

## Common Options

All column types support:

```php
Column::text('email')
    ->label('Email Address')        // custom header label
    ->sortable()                    // sortable column
    ->searchable()                  // included in search
    ->toggleable()                  // user can show/hide
    ->hidden()                      // hidden by default
    ->alignment('center')           // 'left' | 'center' | 'right'
    ->tooltip('Click to copy')      // hover tooltip
    ->url(fn ($record) => "/users/{$record->id}")  // make clickable
```
