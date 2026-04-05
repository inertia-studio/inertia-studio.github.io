---
title: Selection
order: 3
---

# Selection

Fields for choosing from a set of options.

## Select

Dropdown select with optional search and multiple selection:

```php
Field::select('role')
    ->options([
        'admin' => 'Administrator',
        'editor' => 'Editor',
        'viewer' => 'Viewer',
    ])
    ->required()
    ->default('viewer')
    ->placeholder('Choose a role')
```

### Searchable Select

```php
Field::select('country')
    ->options(Country::pluck('name', 'id'))
    ->searchable()
```

### Multiple Select

```php
Field::select('permissions')
    ->options(Permission::pluck('name', 'id'))
    ->multiple()
    ->searchable()
```

## Toggle

Boolean on/off switch:

```php
Field::toggle('is_active')
    ->label('Active')
    ->default(true)
    ->onLabel('Enabled')
    ->offLabel('Disabled')
```

## Checkbox

Single checkbox for boolean values:

```php
Field::checkbox('accept_terms')
    ->label('I accept the terms and conditions')
    ->required()
```

## Checkbox List

Multiple checkboxes from a set of options:

```php
Field::checkboxList('permissions')
    ->options([
        'read' => 'Read',
        'write' => 'Write',
        'delete' => 'Delete',
        'admin' => 'Admin',
    ])
    ->columns(2)
```

## Radio

Radio button group for single selection:

```php
Field::radio('priority')
    ->options([
        'low' => 'Low',
        'medium' => 'Medium',
        'high' => 'High',
    ])
    ->default('medium')
    ->inline()                  // horizontal layout
```

## Toggle Buttons

Segmented button group — a visual alternative to radio/select:

```php
Field::toggleButtons('status')
    ->options([
        'draft' => 'Draft',
        'review' => 'In Review',
        'published' => 'Published',
    ])
    ->colors([
        'draft' => 'gray',
        'review' => 'warning',
        'published' => 'success',
    ])
    ->icons([
        'draft' => 'pencil',
        'review' => 'eye',
        'published' => 'check',
    ])
```

For multi-select toggle buttons:

```php
Field::toggleButtons('tags')
    ->options([...])
    ->multiple()
```
