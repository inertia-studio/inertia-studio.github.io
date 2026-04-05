---
title: Relations
order: 3
---

# Relations

Display and manage related models on a module's edit/view page using relation managers.

## Generating a Relation

```bash
php artisan studio:relation PostsRelation --module=Users --panel=Admin
```

This creates `app/Studio/Admin/Modules/Users/Relations/PostsRelation.php`.

## Defining a Relation

```php
namespace App\Studio\Admin\Modules\Users\Relations;

use InertiaStudio\Relation;
use InertiaStudio\{Field, Column};
use InertiaStudio\Form;
use InertiaStudio\Table;

class PostsRelation extends Relation
{
    protected static string $relationship = 'posts';

    public function form(Form $form): Form
    {
        return $form->schema([
            Field::text('title')->required(),
            Field::richEditor('body'),
            Field::select('status')
                ->options(['draft' => 'Draft', 'published' => 'Published']),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::text('title')->searchable(),
                Column::badge('status'),
                Column::text('created_at')->dateTime(),
            ]);
    }
}
```

## Registering Relations

Add the relation to your module's `relations()` method:

```php
class Users extends Module
{
    public static function relations(): array
    {
        return [
            PostsRelation::class,
            CommentsRelation::class,
        ];
    }
}
```

Relations appear as tabs or sections on the record's edit/view page, each with their own data table and create/edit modals.

## Relation Properties

| Property | Description |
|----------|-------------|
| `$relationship` | The Eloquent relationship method name on the parent model |
| `$title` | Display label (auto-generated from relationship name if not set) |
| `$icon` | Icon for the relation tab |

## Supported Relationship Types

Relations work with any Eloquent relationship that returns multiple records:

- `HasMany`
- `BelongsToMany`
- `MorphMany`
- `HasManyThrough`

For single-record relationships (`BelongsTo`, `HasOne`, `MorphOne`), use [`Field::belongsTo()`](/forms/relationships) on the form instead.
