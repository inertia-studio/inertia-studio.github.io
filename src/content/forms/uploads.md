---
title: File Uploads
order: 5
---

# File Uploads

Fields for uploading files and images to Laravel filesystem disks.

## File Upload

General-purpose file upload:

```php
Field::fileUpload('attachment')
    ->disk('s3')                                // Laravel filesystem disk (default: 'public')
    ->directory('attachments')                  // storage directory
    ->maxSize(10240)                            // max file size in KB
    ->acceptedFileTypes(['application/pdf', 'image/*'])
```

### Multiple Files

```php
Field::fileUpload('documents')
    ->multiple()
    ->maxFiles(5)
    ->disk('s3')
    ->directory('documents/{record_id}')        // dynamic directory with record ID
```

## Image Upload

Image-specific upload with crop and resize options:

```php
Field::imageUpload('avatar')
    ->disk('public')
    ->directory('avatars')
    ->image()
    ->imageResizeMode('cover')
    ->imageCropAspectRatio('1:1')
    ->imageResizeTargetWidth(300)
    ->imageResizeTargetHeight(300)
```

## Configuration

Default disk and directory can be set globally in `config/studio.php`:

```php
'uploads' => [
    'disk' => 'public',
    'directory' => 'studio-uploads',
],
```

## Common Options

```php
Field::fileUpload('document')
    ->disk('public')                            // storage disk
    ->directory('uploads')                      // storage path
    ->maxSize(5120)                             // max size in KB
    ->acceptedFileTypes(['image/*', '.pdf'])     // MIME types or extensions
    ->multiple()                                // allow multiple files
    ->maxFiles(10)                              // max files (when multiple)
    ->downloadable()                            // show download link
    ->previewable()                             // show file preview
```
