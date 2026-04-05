---
title: Getting Started
order: 3
---

# Getting Started

Build a complete Users admin module in 5 minutes. All code is PHP — the frontend framework doesn't matter.

## Generate the module

```bash
php artisan studio:module Users --panel=Admin
```

This creates `app/Studio/Admin/Modules/Users.php`.

## Define the form

```php
use InertiaStudio\Field;
use InertiaStudio\Layout;

public static function form(Form $form): Form
{
    return $form->schema([
        Layout::section('User Information')->columns(2)->schema([
            Field::text('name')
                ->label('Full Name')
                ->required()
                ->placeholder('John Doe'),

            Field::email('email')
                ->label('Email Address')
                ->required()
                ->unique(),

            Field::password('password')
                ->label('Password')
                ->required()
                ->hiddenOn('edit'),

            Field::select('role')
                ->label('Role')
                ->options([
                    'admin' => 'Administrator',
                    'editor' => 'Editor',
                    'viewer' => 'Viewer',
                ])
                ->default('viewer'),
        ]),
    ]);
}
```

## Define the table

```php
use InertiaStudio\Column;
use InertiaStudio\Filter;
use InertiaStudio\Action;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Column::text('name')->searchable()->sortable(),
            Column::text('email')->searchable(),
            Column::badge('role')
                ->colors([
                    'admin' => 'danger',
                    'editor' => 'warning',
                    'viewer' => 'info',
                ]),
            Column::date('created_at')->label('Joined')->sortable(),
        ])
        ->filters([
            Filter::select('role')->options([
                'admin' => 'Admin',
                'editor' => 'Editor',
                'viewer' => 'Viewer',
            ]),
        ])
        ->actions([
            Action::view(),
            Action::edit(),
            Action::delete(),
        ])
        ->defaultSort('created_at', 'desc');
}
```

## Visit your module

Start the dev server and navigate to `/admin/users`:

```bash
composer run dev
```

You now have a fully functional admin page with:

- Searchable, sortable data table
- Create / Edit forms with validation
- View page with detail display
- Delete with confirmation
- Role filter
- Pagination

All rendered by your Inertia frontend (React, Vue, or Svelte) from the same PHP definition.

## What's next?

- [Forms Overview](/forms) — Layout, validation, reactivity
- [Tables Overview](/tables) — Columns, filters, actions
- [Panels](/panels/configuration) — Theming, navigation, multiple panels
