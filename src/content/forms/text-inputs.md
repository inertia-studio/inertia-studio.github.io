---
title: Text Inputs
order: 2
---

# Text Inputs

Text-based field types for strings, numbers, and formatted values.

## Text

Basic single-line text input:

```php
Field::text('name')
    ->label('Full Name')
    ->required()
    ->min(2)
    ->max(255)
    ->placeholder('John Doe')
```

## Email

Email input with built-in format validation:

```php
Field::email('email')
    ->required()
    ->unique(ignoreRecord: true)
```

## Password

Password input with optional visibility toggle:

```php
Field::password('password')
    ->required()
    ->min(8)
    ->hiddenOn('edit')
    ->dehydrateStateUsing(fn ($state) => bcrypt($state))
    ->dehydrated(fn ($state) => filled($state))
```

## URL

URL input with format validation:

```php
Field::url('website')
    ->label('Website URL')
    ->placeholder('https://example.com')
```

## Telephone

Phone number input:

```php
Field::tel('phone')
    ->label('Phone Number')
    ->placeholder('+1 (555) 123-4567')
```

## Number

Numeric input with min, max, and step:

```php
Field::number('quantity')
    ->min(1)
    ->max(100)
    ->step(1)
    ->default(1)
```

## Stepper

Increment/decrement number input with +/- buttons:

```php
Field::stepper('quantity')
    ->min(0)
    ->max(99)
    ->step(1)
```

## Textarea

Multi-line text input:

```php
Field::textarea('description')
    ->rows(4)
    ->maxLength(1000)
    ->placeholder('Enter a description...')
```

## Slug

Auto-generated slug from another field:

```php
Field::slug('slug')
    ->from('name')              // source field
    ->separator('-')            // slug separator (default: '-')
    ->unique(ignoreRecord: true)
```

The slug auto-updates as the source field changes (on create only by default).

## Money

Currency input with locale-aware formatting:

```php
Field::money('price')
    ->currency('USD')           // ISO 4217 currency code
    ->locale('en_US')           // formatting locale
    ->min(0)
```

Stores the value in cents (integer) by default. Override with `->storedInCents(false)`.

## Percent

Percentage input (0-100) with `%` display:

```php
Field::percent('discount')
    ->min(0)
    ->max(100)
    ->step(0.5)
```
