---
title: Relationships
order: 8
---

# Relationships

Fields for selecting related Eloquent models.

## BelongsTo

Searchable select that queries related models:

```php
Field::belongsTo('category')
    ->relationship('category', 'name')      // relation method, display column
    ->searchable()
    ->preload()                             // preload all options (for small sets)
```

### Searchable

For large datasets, `searchable()` queries the database as the user types:

```php
Field::belongsTo('author')
    ->relationship('author', 'name')
    ->searchable()
    ->placeholder('Search authors...')
```

### Preload

For small option sets, `preload()` loads all options upfront:

```php
Field::belongsTo('category')
    ->relationship('category', 'name')
    ->preload()
```

### Inline Create

Allow creating a related record without leaving the form:

```php
Field::belongsTo('author')
    ->relationship('author', 'name')
    ->searchable()
    ->createForm([
        Field::text('name')->required(),
        Field::email('email')->required(),
    ])
```

This renders a "Create new" button that opens a modal with the specified form fields.

## BelongsToMany (Multiple)

For many-to-many relationships, add `->multiple()`:

```php
Field::belongsTo('tags')
    ->relationship('tags', 'name')
    ->multiple()
    ->searchable()
    ->createForm([
        Field::text('name')->required(),
        Field::slug('slug')->from('name'),
    ])
```

## MorphTo

For polymorphic relationships:

```php
Field::morphTo('commentable')
    ->types([
        Post::class => 'Posts',
        Video::class => 'Videos',
    ])
    ->searchable()
```

This renders a type selector followed by a searchable select for the chosen type.
