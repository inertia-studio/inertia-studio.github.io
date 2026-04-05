---
title: Validation
order: 10
---

# Validation

Add validation rules to form fields using fluent methods or raw Laravel rules.

## Built-in Validation Methods

```php
Field::text('name')
    ->required()                    // field is required
    ->min(2)                        // minimum length/value
    ->max(255)                      // maximum length/value
    ->unique()                      // must be unique in the table
    ->unique(ignoreRecord: true)    // unique except current record (for edit)
```

## Unique Validation

```php
// Basic unique
Field::email('email')->unique()

// Unique ignoring current record (for edit forms)
Field::email('email')->unique(ignoreRecord: true)

// Unique on a specific table and column
Field::text('code')->unique(table: 'products', column: 'sku')
```

## String Rules

```php
Field::text('username')
    ->required()
    ->min(3)
    ->max(30)
    ->alphanumeric()                // only letters and numbers
```

## Numeric Rules

```php
Field::number('quantity')
    ->required()
    ->min(1)
    ->max(100)
    ->integer()
```

## Custom Laravel Rules

Pass any Laravel validation rule using `rules()`:

```php
Field::text('domain')
    ->rules(['required', 'url', 'starts_with:https://'])

Field::text('ip_address')
    ->rules(['required', 'ip'])

Field::text('username')
    ->rules(['required', 'alpha_dash', 'min:3', Rule::unique('users')->ignore($recordId)])
```

## Conditional Validation

```php
Field::text('company_name')
    ->requiredIf('type', 'business')    // required when type is 'business'

Field::text('vat_number')
    ->requiredWith('company_name')       // required when company_name is filled
```

## Validation Messages

```php
Field::email('email')
    ->required()
    ->unique()
    ->validationMessages([
        'required' => 'We need your email address.',
        'unique' => 'This email is already registered.',
    ])
```

## Server-Side Only

All validation runs server-side via standard Laravel validation. The frontend displays errors returned by the server — no duplicate client-side validation logic needed. Validation errors are automatically mapped to the correct fields via Inertia's shared error bag.
