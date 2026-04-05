---
title: Form Layout
order: 9
---

# Form Layout

Organize form fields into sections, tabs, columns, and grids.

## Sections

Group related fields into visual sections:

```php
Layout::section('User Information')
    ->columns(2)
    ->schema([
        Field::text('name')->required(),
        Field::email('email')->required(),
    ])
```

### Collapsible Sections

```php
Layout::section('Advanced Settings')
    ->collapsible()
    ->collapsed()               // start collapsed
    ->schema([
        Field::toggle('notifications'),
        Field::select('timezone')->options([...]),
    ])
```

### Section Description

```php
Layout::section('Permissions')
    ->description('Configure what this user can access.')
    ->schema([...])
```

## Tabs

Organize fields into tabbed panels:

```php
Layout::tabs([
    Layout::tab('General')->schema([
        Field::text('name'),
        Field::email('email'),
    ]),

    Layout::tab('Profile')->schema([
        Field::textarea('bio'),
        Field::imageUpload('avatar'),
    ]),

    Layout::tab('SEO')->schema([
        Field::text('meta_title'),
        Field::textarea('meta_description'),
    ]),
])
```

### Tab Icons

```php
Layout::tab('General')
    ->icon('cog')
    ->schema([...])
```

## Columns

Control the number of columns in a section or form:

```php
// 2-column layout
Layout::section('Contact')->columns(2)->schema([
    Field::text('first_name'),
    Field::text('last_name'),
    Field::email('email'),
    Field::tel('phone'),
])

// 3-column layout
Layout::section('Address')->columns(3)->schema([
    Field::text('city'),
    Field::text('state'),
    Field::text('zip'),
])
```

## Column Span

Make a field span multiple columns:

```php
Layout::section('Details')->columns(2)->schema([
    Field::text('title')->columnSpan(2),    // full width
    Field::text('slug'),                     // half width
    Field::select('category'),               // half width
    Field::textarea('description')
        ->columnSpan(2),                     // full width
])
```

Use `columnSpan('full')` to always span the full width regardless of column count.

## Nesting Layouts

Layouts can be nested for complex forms:

```php
$form->schema([
    Layout::section('Basic Info')->columns(2)->schema([
        Field::text('name'),
        Field::email('email'),
    ]),

    Layout::tabs([
        Layout::tab('Content')->schema([
            Layout::section('Body')->schema([
                Field::richEditor('content'),
            ]),
        ]),

        Layout::tab('Media')->schema([
            Layout::section('Images')->columns(2)->schema([
                Field::imageUpload('cover'),
                Field::imageUpload('thumbnail'),
            ]),
        ]),
    ]),
])
```
