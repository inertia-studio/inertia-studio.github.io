---
title: Rich Content
order: 6
---

# Rich Content

Fields for rich text editing and color selection.

## Rich Editor

Rich text editor powered by Tiptap:

```php
Field::richEditor('body')
    ->label('Content')
    ->required()
    ->toolbarButtons([
        'heading',
        'bold',
        'italic',
        'link',
        'bulletList',
        'orderedList',
        'blockquote',
        'codeBlock',
        'image',
    ])
```

### Disable Specific Buttons

```php
Field::richEditor('description')
    ->disableToolbarButtons(['codeBlock', 'image'])
```

### File Attachments

Enable image uploads within the editor:

```php
Field::richEditor('body')
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsDirectory('content-images')
```

## Color Picker

Color selection with swatches and hex/rgb input:

```php
Field::colorPicker('color')
    ->label('Brand Color')
```

### With Predefined Swatches

```php
Field::colorPicker('theme_color')
    ->swatches([
        '#dc2626', '#d97706', '#16a34a',
        '#2563eb', '#7c3aed', '#db2777',
    ])
```

### Format Options

```php
Field::colorPicker('color')
    ->format('hex')             // 'hex' | 'rgb' | 'hsl'
```
