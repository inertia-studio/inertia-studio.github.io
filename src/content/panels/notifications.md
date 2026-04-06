---
title: Notifications
order: 6
---

# Notifications

Display notifications in the topbar bell icon. The framework provides the UI — you provide the data from any source.

## Basic Usage

Override the `notifications()` method on your Panel class. It receives the authenticated user and returns an array of `StudioNotification` objects:

```php
use InertiaStudio\StudioNotification;

class Admin extends Panel
{
    public function notifications(mixed $user): array
    {
        return [
            StudioNotification::make('New order received')
                ->body('Order #1042 — $129.00')
                ->color('success')
                ->url($this->path . '/orders/1042')
                ->time('2 minutes ago'),
        ];
    }
}
```

## StudioNotification API

```php
StudioNotification::make('Title')       // Required — notification heading
    ->body('Description text')          // Optional — secondary text
    ->icon('bell')                      // Optional — icon name
    ->color('info')                     // info (default), success, warning, danger
    ->url('/admin/orders/42')           // Optional — navigate on click
    ->time('5 minutes ago');            // Optional — timestamp display
```

## Using Laravel Notifications

The most common real-world pattern is to pull from Laravel's built-in database notification system.

### Setup

Make sure your User model uses the `Notifiable` trait and you have the notifications table:

```bash
php artisan notifications:table
php artisan migrate
```

### Sending Notifications

Create a standard Laravel notification:

```php
use Illuminate\Notifications\Notification;

class OrderReceived extends Notification
{
    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'title' => 'New order received',
            'body' => "Order #{$this->order->id} — " . Number::currency($this->order->total),
            'color' => 'success',
            'url' => "/admin/orders/{$this->order->id}",
        ];
    }
}
```

Send it as usual:

```php
$user->notify(new OrderReceived($order));
```

### Reading Notifications in the Panel

```php
public function notifications(mixed $user): array
{
    return $user->unreadNotifications
        ->take(10)
        ->map(fn ($notification) => StudioNotification::make(
                $notification->data['title'] ?? 'Notification'
            )
            ->body($notification->data['body'] ?? null)
            ->color($notification->data['color'] ?? 'info')
            ->url($notification->data['url'] ?? null)
            ->time($notification->created_at->diffForHumans())
        )
        ->all();
}
```

The bell icon badge shows the count of returned notifications. An empty array hides the badge.

## Using a Custom Source

You're not limited to Laravel notifications. Pull from any source:

### From a Custom Table

```php
public function notifications(mixed $user): array
{
    return Alert::where('user_id', $user->id)
        ->where('dismissed', false)
        ->latest()
        ->take(10)
        ->get()
        ->map(fn ($alert) => StudioNotification::make($alert->title)
            ->body($alert->message)
            ->color($alert->severity)
            ->time($alert->created_at->diffForHumans())
        )
        ->all();
}
```

### From Cache or an External API

```php
public function notifications(mixed $user): array
{
    $alerts = Cache::remember("alerts:{$user->id}", 60, function () use ($user) {
        return Http::get("https://api.example.com/alerts/{$user->id}")->json();
    });

    return collect($alerts)->map(fn ($a) =>
        StudioNotification::make($a['title'])
            ->body($a['message'])
            ->color($a['level'])
    )->all();
}
```

### System-Wide Notifications

Notifications don't have to be per-user. You can show system alerts to all panel users:

```php
public function notifications(mixed $user): array
{
    $notifications = [];

    // System alerts for admins
    if ($user->is_admin) {
        $diskUsage = disk_free_space('/') / disk_total_space('/') * 100;
        if ($diskUsage > 90) {
            $notifications[] = StudioNotification::make('Storage almost full')
                ->body(round(100 - $diskUsage) . '% remaining')
                ->color('danger');
        }

        $pendingJobs = DB::table('jobs')->count();
        if ($pendingJobs > 100) {
            $notifications[] = StudioNotification::make('Queue backlog')
                ->body("{$pendingJobs} jobs pending")
                ->color('warning');
        }
    }

    // Per-user notifications from database
    return array_merge(
        $notifications,
        $user->unreadNotifications->take(5)->map(fn ($n) =>
            StudioNotification::make($n->data['title'] ?? 'Notification')
                ->body($n->data['body'] ?? null)
                ->color($n->data['color'] ?? 'info')
                ->url($n->data['url'] ?? null)
                ->time($n->created_at->diffForHumans())
        )->all(),
    );
}
```

## UI Behavior

- The bell icon appears in the topbar between the theme toggle and the user menu
- A red badge shows the count of notifications (99+ for large numbers)
- Clicking the bell opens a dropdown with all notifications
- Clicking a notification with a `url` navigates to that page
- Empty state shows "No notifications" when the array is empty
- Notifications are loaded as a lazy Inertia prop — no performance impact on initial page load
