---
title: Structured Data
order: 7
---

# Structured Data

Fields for complex data structures — arrays, key-value pairs, and repeatable groups.

## Tags

Tag input with optional suggestions:

```php
Field::tags('tags')
    ->label('Tags')
    ->suggestions(['laravel', 'php', 'javascript', 'react', 'vue', 'svelte'])
    ->separator(',')
```

Tags are stored as a JSON array by default. Ensure the column is cast to `array` on your model.

## Key-Value

Editable key-value pair list:

```php
Field::keyValue('metadata')
    ->label('Metadata')
    ->keyLabel('Key')
    ->valueLabel('Value')
    ->addButtonLabel('Add Entry')
```

Stored as a JSON object. Ensure the column is cast to `array` or `object` on your model.

## Repeater

Repeatable group of fields — for structured arrays like addresses, line items, or nested data:

```php
Field::repeater('addresses')
    ->schema([
        Field::text('street')->required(),
        Field::text('city')->required(),
        Field::text('state'),
        Field::text('zip')->required(),
        Field::select('country')
            ->options(Country::pluck('name', 'code'))
            ->searchable(),
    ])
    ->columns(2)
    ->minItems(1)
    ->maxItems(5)
    ->addButtonLabel('Add Address')
    ->collapsible()
    ->itemLabel(fn (array $state) => $state['city'] ?? 'New Address')
```

### Repeater Options

```php
Field::repeater('items')
    ->schema([...])
    ->columns(3)                // columns within each repeater item
    ->minItems(1)               // minimum number of items
    ->maxItems(10)              // maximum number of items
    ->collapsible()             // items can be collapsed
    ->collapsed()               // start collapsed
    ->reorderable()             // drag to reorder
    ->addButtonLabel('Add Item')
    ->itemLabel(fn (array $state) => $state['name'] ?? 'Item')
```

Stored as a JSON array. Ensure the column is cast to `array` on your model.
