---
title: Overview
order: 1
---

# Overview

Forms are defined in PHP using the `form()` method on your Module. The schema is serialized to JSON and rendered by your frontend framework.

## The Form Method

```php
use InertiaStudio\Form;
use InertiaStudio\Field;
use InertiaStudio\Layout;

public static function form(Form $form): Form
{
    return $form->schema([
        Layout::section('Basic Information')->columns(2)->schema([
            Field::text('name')->required(),
            Field::email('email')->required()->unique(ignoreRecord: true),
        ]),

        Layout::section('Settings')->collapsible()->schema([
            Field::select('role')->options([
                'admin' => 'Admin',
                'editor' => 'Editor',
                'user' => 'User',
            ]),
            Field::toggle('is_active')->default(true),
        ]),
    ]);
}
```

## Form Layout

Wrap fields in layout components to organize them:

```php
// Sections with columns
Layout::section('Contact')->columns(2)->schema([...])

// Collapsible sections
Layout::section('Advanced')->collapsible()->collapsed()->schema([...])

// Tabs
Layout::tabs([
    Layout::tab('General')->schema([...]),
    Layout::tab('SEO')->schema([...]),
    Layout::tab('Media')->schema([...]),
])
```

See [Form Layout](/forms/layout) for the full layout reference.

## Field Types

Studio provides 30+ field types across several categories:

| Category | Fields |
|----------|--------|
| [Text Inputs](/forms/text-inputs) | text, email, password, url, tel, number, stepper, textarea, slug, money, percent |
| [Selection](/forms/selection) | select, toggle, checkbox, checkboxList, radio, toggleButtons |
| [Date & Time](/forms/dates) | date, time, dateRange |
| [File Uploads](/forms/uploads) | fileUpload, imageUpload |
| [Rich Content](/forms/rich-content) | richEditor, colorPicker |
| [Structured Data](/forms/structured) | tags, keyValue, repeater |
| [Relationships](/forms/relationships) | belongsTo (searchable, preload, inline create) |

## Common Field Methods

Every field type supports these methods:

```php
Field::text('name')
    ->label('Full Name')           // custom label
    ->placeholder('Enter name')    // placeholder text
    ->helperText('Your legal name') // help text below field
    ->default('John')              // default value
    ->disabled()                   // read-only
    ->hidden()                     // hidden from view
    ->hiddenOn('create')           // hidden on create form only
    ->hiddenOn('edit')             // hidden on edit form only
    ->columnSpan(2)                // span multiple columns
```

## Operation Context

Show or hide fields based on whether the user is creating or editing:

```php
Field::password('password')
    ->required()
    ->hiddenOn('edit');          // only show on create

Field::text('slug')
    ->disabled()
    ->visibleOn('edit');         // only show on edit
```
