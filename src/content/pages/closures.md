---
title: Form & Action Handlers
order: 3
---

# Form & Action Handlers

Custom pages can include forms and action buttons with closure-based server-side handlers.

## Page Forms

Embed a form on a custom page with a server-side action handler:

```php
PageSchema::form('Settings')
    ->schema([
        Field::text('site_name')->required()->default(config('app.name')),
        Field::text('support_email')->required(),
        Field::toggle('maintenance_mode'),
    ])
    ->action(function (array $data) {
        Setting::set('site_name', $data['site_name']);
        Setting::set('support_email', $data['support_email']);

        if ($data['maintenance_mode']) {
            Artisan::call('down');
        } else {
            Artisan::call('up');
        }

        return Notification::make()->title('Settings saved')->success();
    })
    ->submitLabel('Save Settings')
```

## Action Buttons

Standalone buttons that trigger server-side closures:

```php
PageSchema::action('Clear Cache')
    ->icon('trash')
    ->color('danger')
    ->requiresConfirmation()
    ->confirmationMessage('This will clear all application caches. Continue?')
    ->action(function () {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');

        return Notification::make()->title('Cache cleared')->success();
    })
```

## Action with Modal Form

Actions can collect input before executing:

```php
PageSchema::action('Send Announcement')
    ->icon('megaphone')
    ->color('primary')
    ->form([
        Field::text('subject')->required(),
        Field::richEditor('body')->required(),
        Field::checkboxList('channels')
            ->options(['email' => 'Email', 'slack' => 'Slack', 'sms' => 'SMS']),
    ])
    ->action(function (array $data) {
        AnnouncementService::send($data);

        return Notification::make()->title('Announcement sent')->success();
    })
```

## Return Values

Action closures can return:

- **`Notification`** — displays a toast notification
- **`Redirect`** — redirects to another page
- **`null`** — no visible feedback (the action completes silently)

```php
// Notification
->action(function () {
    // ...
    return Notification::make()->title('Done')->success();
})

// Redirect
->action(function () {
    // ...
    return redirect('/admin/modules/users');
})
```

## How It Works

Forms and actions on custom pages are serialized as part of the page schema. When the user submits a form or clicks an action button, the frontend sends a POST request to the page's action endpoint. The server executes the registered closure and returns the result via Inertia.
