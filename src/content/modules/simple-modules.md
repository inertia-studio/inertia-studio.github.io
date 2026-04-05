---
title: Simple Modules
order: 2
---

# Simple Modules

For lightweight models that don't need full pages — tags, categories, statuses — use simple modules for modal-based CRUD.

## Generating a Simple Module

```bash
php artisan studio:module Tags --panel=Admin --simple
```

## Defining a Simple Module

Set `$simple = true` on your module class:

```php
class Tags extends Module
{
    protected static string $model = Tag::class;
    protected static bool $simple = true;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Field::text('name')->required(),
            Field::slug('slug')->from('name'),
            Field::colorPicker('color'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Column::text('name')->searchable()->sortable(),
            Column::color('color'),
            Column::text('slug'),
        ]);
    }
}
```

## How It Works

When `$simple = true`:

- **No separate create/edit/view pages** — all CRUD happens in modals on the list page
- **Create** opens a modal with the form
- **Edit** opens a modal with the form pre-filled
- **No detail view** — clicking a record opens edit
- Navigation shows the module normally, but it only has one page (the list)

This is ideal for small reference models like tags, categories, statuses, and settings that don't warrant full-page navigation.

## When to Use Simple Modules

| Use Case | Simple? |
|----------|---------|
| Tags, categories, labels | Yes |
| Application settings | Yes |
| Feature flags | Yes |
| Users with complex forms | No |
| Orders with relations | No |
| Content with rich editing | No |

As a rule of thumb, if the form has more than 5-6 fields or the model has relations, use a standard module instead.
