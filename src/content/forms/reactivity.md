---
title: Reactivity
order: 11
---

# Reactivity

Make form fields respond to changes in other fields — dependent dropdowns, conditional visibility, and dynamic options.

## How It Works

1. Mark a field as `->reactive()` to trigger updates when it changes
2. The frontend sends the current form state to the server via `POST /admin/modules/{module}/form-state`
3. The backend re-evaluates all field schemas (options, visibility, disabled state)
4. Changed schemas are returned via Inertia partial reload
5. The frontend patches only the affected fields

No WebSocket required — it uses Inertia's built-in partial reload mechanism.

## Reactive Fields

Mark a field to trigger updates when its value changes:

```php
Field::select('country')
    ->options(Country::pluck('name', 'id'))
    ->reactive()
```

## Dependent Dropdowns

A classic example: country -> state cascade:

```php
Field::select('country')
    ->options(Country::pluck('name', 'id'))
    ->reactive()
    ->afterStateUpdated(fn ($state, callable $set) =>
        $set('state', null)     // reset dependent field
    ),

Field::select('state')
    ->options(fn (callable $get) =>
        State::where('country_id', $get('country'))->pluck('name', 'id')
    )
    ->visible(fn (callable $get) => filled($get('country'))),
```

## afterStateUpdated

Run logic when a reactive field changes:

```php
Field::select('plan')
    ->options(['basic' => 'Basic', 'pro' => 'Pro', 'enterprise' => 'Enterprise'])
    ->reactive()
    ->afterStateUpdated(function ($state, callable $set, callable $get) {
        // Set price based on plan
        $prices = ['basic' => 9, 'pro' => 29, 'enterprise' => 99];
        $set('price', $prices[$state] ?? 0);
    }),
```

## Conditional Visibility

Show/hide fields based on other field values:

```php
Field::toggle('has_discount')
    ->reactive(),

Field::number('discount_percentage')
    ->min(0)
    ->max(100)
    ->visible(fn (callable $get) => $get('has_discount')),
```

## Conditional Disabled State

```php
Field::select('role')
    ->options([...])
    ->reactive(),

Field::checkboxList('permissions')
    ->options(Permission::pluck('name', 'id'))
    ->disabled(fn (callable $get) => $get('role') === 'admin'), // admins get all permissions
```

## Dynamic Options

Compute field options from the current form state:

```php
Field::select('subcategory')
    ->options(fn (callable $get) =>
        Subcategory::where('category_id', $get('category'))->pluck('name', 'id')
    )
```

The `$get` callable reads any field's current value. The `$set` callable writes to any field. Both are available in closures on any field — not just reactive ones.
