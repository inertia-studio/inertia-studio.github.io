---
title: Overview
order: 1
---

# Overview

Tables display paginated, searchable, sortable lists of records. Defined in PHP via the `table()` method on your Module.

## The Table Method

```php
use InertiaStudio\Table;
use InertiaStudio\{Column, Filter, Action};

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Column::text('name')->searchable()->sortable(),
            Column::text('email')->searchable()->copyable(),
            Column::badge('role')
                ->colors(['primary' => 'admin', 'warning' => 'editor', 'secondary' => 'user']),
            Column::boolean('email_verified_at')
                ->label('Verified')
                ->getStateUsing(fn ($record) => $record->email_verified_at !== null),
            Column::text('created_at')->dateTime()->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            Filter::select('role')
                ->options(['admin' => 'Admin', 'editor' => 'Editor', 'user' => 'User']),
        ])
        ->actions([Action::view(), Action::edit(), Action::delete()])
        ->bulkActions([Action::bulkDelete(), Action::export()])
        ->defaultSort('created_at', 'desc');
}
```

## Table Options

```php
$table
    ->defaultSort('created_at', 'desc')     // default sort column and direction
    ->paginated()                            // enable pagination (default: true)
    ->perPage(15)                            // records per page
    ->searchable()                           // enable global search (default: true)
    ->striped()                              // striped row backgrounds
    ->compact()                              // reduced cell padding
```

## Toggleable Columns

Let users show/hide columns:

```php
Column::text('created_at')
    ->dateTime()
    ->toggleable()                                  // can be toggled
    ->toggleable(isToggledHiddenByDefault: true)     // hidden by default
```

## Soft Deletes

If your model uses `SoftDeletes`, the table automatically gets:

- A "Trashed" filter tab (All / Active / Trashed)
- Visual indicators for trashed records
- "Restore" and "Force Delete" actions on trashed records
- Bulk restore and force delete

No configuration needed.
