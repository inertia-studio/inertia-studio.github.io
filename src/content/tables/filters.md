---
title: Filters
order: 3
---

# Filters

Filters let users narrow down table results. They appear in a filter panel above or beside the table.

## Select Filter

Dropdown filter for discrete values:

```php
Filter::select('role')
    ->label('Role')
    ->options([
        'admin' => 'Admin',
        'editor' => 'Editor',
        'user' => 'User',
    ])
    ->placeholder('All Roles')
```

### From Relationship

```php
Filter::select('category_id')
    ->label('Category')
    ->relationship('category', 'name')
    ->searchable()
    ->preload()
```

## Ternary Filter

Yes / No / All toggle for boolean-like values:

```php
Filter::ternary('email_verified_at')
    ->label('Verified')
    ->nullable()                    // the column is nullable (uses whereNull/whereNotNull)
```

With custom labels:

```php
Filter::ternary('is_active')
    ->label('Status')
    ->trueLabel('Active')
    ->falseLabel('Inactive')
    ->placeholder('All')
```

## Boolean Filter

Simple on/off toggle:

```php
Filter::boolean('has_orders')
    ->label('Has Orders')
    ->query(fn ($query, $value) =>
        $value
            ? $query->has('orders')
            : $query->doesntHave('orders')
    )
```

## Date Filter

Date range filter:

```php
Filter::date('created_at')
    ->label('Created')
    ->from()                        // start date
    ->until()                       // end date
```

## Query Filter

Custom query scope filter:

```php
Filter::query('created_this_week')
    ->label('This Week')
    ->query(fn ($query) => $query->where('created_at', '>=', now()->startOfWeek()))
```

## Combining Filters

Filters can be combined — all active filters are applied as AND conditions:

```php
->filters([
    Filter::select('role')->options([...]),
    Filter::ternary('is_active')->label('Active'),
    Filter::date('created_at')->label('Created'),
    Filter::query('high_value')
        ->label('High Value')
        ->query(fn ($query) => $query->where('total', '>', 1000)),
])
```
