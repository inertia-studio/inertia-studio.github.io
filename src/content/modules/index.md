---
title: Creating Modules
order: 1
---

# Creating Modules

A Module is a CRUD unit for a single Eloquent model. It defines the form, table, detail view, relations, and actions for that model.

## Generating a Module

```bash
php artisan studio:module Users --panel=Admin
```

This creates `app/Studio/Admin/Modules/Users.php`.

Use `--generate` to introspect the database and auto-build fields and columns:

```bash
php artisan studio:module Users --panel=Admin --generate
```

## Module Structure

```php
namespace App\Studio\Admin\Modules;

use InertiaStudio\Module;
use InertiaStudio\{Field, Column, Filter, Layout, Detail, Action};
use InertiaStudio\Form;
use InertiaStudio\Table;
use App\Models\User;

class Users extends Module
{
    protected static string $model = User::class;
    protected static string $navigationIcon = 'users';
    protected static string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Layout::section('User Information')->columns(2)->schema([
                Field::text('name')->required()->max(255),
                Field::email('email')->required()->unique(ignoreRecord: true),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::text('name')->searchable()->sortable(),
                Column::text('email')->searchable(),
                Column::text('created_at')->dateTime()->sortable(),
            ])
            ->actions([Action::view(), Action::edit(), Action::delete()])
            ->defaultSort('created_at', 'desc');
    }

    public static function detail(): array
    {
        return [
            Layout::section('User Information')->columns(2)->schema([
                Detail::text('name'),
                Detail::text('email')->copyable(),
                Detail::text('created_at')->dateTime(),
            ]),
        ];
    }
}
```

## Key Properties

| Property | Description |
|----------|-------------|
| `$model` | The Eloquent model class |
| `$navigationIcon` | Heroicon name for the sidebar |
| `$navigationLabel` | Override the auto-generated label |
| `$navigationSort` | Sort order in sidebar (lower = higher) |
| `$recordTitleAttribute` | Column used for record titles and global search display |

## Auto-Discovery

Modules are auto-discovered from `app/Studio/{Panel}/Modules/`. Any class extending `Module` in that directory is automatically registered in the panel.

To register modules explicitly instead, override `modules()` on your Panel:

```php
public function modules(): array
{
    return [Users::class, Orders::class];
}
```

## Three Core Methods

Every module has three methods that define its UI:

- **`form()`** — Fields and layout for create/edit pages
- **`table()`** — Columns, filters, and actions for the list page
- **`detail()`** — Read-only entries for the view page

If `detail()` is not defined, Studio generates a detail view from the form schema automatically.

## Relations

Associate related models with a module:

```php
public static function relations(): array
{
    return [PostsRelation::class];
}
```

See [Relations](/modules/relations) for details.

## Global Search

Opt a module into the topbar's global search:

```php
public static function globalSearch(): array
{
    return ['name', 'email'];
}
```

Results display the `$recordTitleAttribute` as the title. Modules without `globalSearch()` are excluded.

## Lifecycle Hooks

```php
protected static function beforeCreate(array $data): array
{
    // modify data before creating
    return $data;
}

protected static function afterCreate(Model $record): void
{
    // run after record is created
}

protected static function beforeUpdate(Model $record, array $data): array
{
    return $data;
}

protected static function afterUpdate(Model $record): void {}

protected static function beforeDelete(Model $record): void {}
```
