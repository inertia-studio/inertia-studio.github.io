---
title: Custom Pages
order: 1
---

# Custom Pages

Build pages beyond CRUD — dashboards, settings, analytics — using the `PageSchema` API or custom components.

## Generating a Page

```bash
# Panel-level page (e.g., dashboard)
php artisan studio:page Dashboard --panel=Admin

# Module-level sub-page
php artisan studio:page Analytics --module=Users --panel=Admin
```

## Page Class

```php
namespace App\Studio\Admin\Pages;

use InertiaStudio\Page;
use InertiaStudio\PageSchema;
use InertiaStudio\Widget;

class Dashboard extends Page
{
    protected static string $navigationIcon = 'home';
    protected static string $navigationLabel = 'Dashboard';
    protected static int $navigationSort = -1;

    public function schema(): array
    {
        return [
            Widget::statGroup([
                Widget::stat('Total Users')->value(fn () => User::count()),
                Widget::stat('Revenue')->value(fn () => '$' . number_format(Order::sum('total') / 100, 2)),
                Widget::stat('Pending Orders')->value(fn () => Order::pending()->count()),
            ]),

            PageSchema::table('Recent Orders')
                ->query(fn () => Order::with('customer')->latest()->limit(10))
                ->columns([
                    Column::text('order_number'),
                    Column::text('customer.name'),
                    Column::badge('status'),
                    Column::money('total'),
                ]),
        ];
    }
}
```

## Registering Pages

Panel-level pages are auto-discovered from `app/Studio/{Panel}/Pages/`.

Module-level sub-pages are registered via the module's `pages()` method:

```php
class Users extends Module
{
    public static function pages(): array
    {
        return [
            Page::make('analytics')
                ->label('Analytics')
                ->icon('chart-bar')
                ->navigationPosition('after-list')
                ->component('Studio::UserAnalytics')
                ->props(fn () => [
                    'stats' => UserStatsService::summary(),
                ]),
        ];
    }
}
```

Sub-pages get their own routes automatically:

```
/admin/modules/users/pages/analytics
/admin/modules/users/pages/import
```

## Using Custom Components

For pages that need a fully custom frontend, specify a component:

```php
Page::make('settings')
    ->label('Settings')
    ->component('Studio::Settings')
    ->props(fn () => [
        'settings' => Setting::all()->pluck('value', 'key'),
    ])
```

The component is resolved from your published pages or the package defaults.

## Navigation Position

```php
Page::make('import')
    ->navigationPosition('after-list')  // 'before-list' | 'after-list' | 'hidden'
```

Hidden pages are accessible by URL but don't appear in the sidebar — useful for pages triggered by action buttons.
