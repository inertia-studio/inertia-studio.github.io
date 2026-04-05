---
title: Detail Views
order: 1
---

# Detail Views

Detail views display read-only record information on the view page. Defined via the `detail()` method on your Module.

## The Detail Method

```php
use InertiaStudio\Detail;
use InertiaStudio\Layout;

public static function detail(): array
{
    return [
        Layout::section('User Information')->columns(2)->schema([
            Detail::text('name'),
            Detail::text('email')->copyable(),
            Detail::badge('role'),
            Detail::boolean('email_verified_at')->label('Verified'),
            Detail::text('created_at')->dateTime(),
        ]),
    ];
}
```

If `detail()` is not defined, Studio auto-generates a detail view from the form schema.

## Entry Types

### Text

```php
Detail::text('name')
    ->label('Full Name')
    ->copyable()                    // click to copy
    ->limit(100)                    // truncate long text
    ->url(fn ($record) => "/profile/{$record->id}")
```

### Badge

```php
Detail::badge('status')
    ->colors([
        'primary' => 'active',
        'warning' => 'pending',
        'danger' => 'cancelled',
    ])
```

### Boolean

```php
Detail::boolean('is_active')
    ->label('Active')
    ->trueIcon('check-circle')
    ->falseIcon('x-circle')
    ->trueColor('success')
    ->falseColor('danger')
```

### Image

```php
Detail::image('avatar')
    ->circular()
    ->size(80)
    ->defaultImageUrl('/placeholder.png')
```

### Date

```php
Detail::text('created_at')
    ->dateTime()                    // full date and time
    ->since()                       // relative time

Detail::text('published_at')
    ->date()                        // date only
    ->format('F j, Y')             // custom format
```

### Money

```php
Detail::text('price')
    ->money('USD')
```

## Layout

Detail entries support the same layout components as forms:

```php
return [
    Layout::section('Overview')->columns(2)->schema([
        Detail::text('name'),
        Detail::text('email')->copyable(),
    ]),

    Layout::section('Settings')->collapsible()->schema([
        Detail::badge('role'),
        Detail::boolean('is_active'),
    ]),

    Layout::tabs([
        Layout::tab('Details')->schema([
            Detail::text('bio'),
        ]),
        Layout::tab('Metadata')->schema([
            Detail::text('created_at')->dateTime(),
            Detail::text('updated_at')->dateTime(),
        ]),
    ]),
];
```

## Computed Values

Display values that don't map directly to a column:

```php
Detail::text('full_address')
    ->getStateUsing(fn ($record) =>
        "{$record->street}, {$record->city}, {$record->state} {$record->zip}"
    )
```
