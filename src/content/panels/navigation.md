---
title: Navigation
order: 4
---

# Navigation

Organize your panel's sidebar with navigation groups, badges, and custom links.

## Navigation Groups

Define `navigationGroups()` on your Panel to organize modules into groups:

```php
use InertiaStudio\NavigationGroup;

public function navigationGroups(): array
{
    return [
        NavigationGroup::make('Shop')
            ->icon('shopping-bag')
            ->items([
                Orders::class,
                Products::class,
            ]),

        NavigationGroup::make('People')
            ->icon('users')
            ->items([
                Users::class,
                Customers::class,
            ]),

        NavigationGroup::make('Finance')
            ->icon('dollar-sign')
            ->collapsible()
            ->items([
                Commissions::class,
                Payouts::class,
            ]),
    ];
}
```

Without `navigationGroups()`, all modules appear as a flat list sorted alphabetically.

## Group Options

```php
NavigationGroup::make('Settings')
    ->icon('cog')
    ->collapsible()                 // can be collapsed/expanded
    ->collapsed()                   // start collapsed
    ->sort(10)                      // sort order (lower = higher)
```

## Module Navigation Properties

Each module can customize its navigation appearance:

```php
class Users extends Module
{
    protected static string $navigationIcon = 'users';
    protected static string $navigationLabel = 'Team Members';
    protected static int $navigationSort = 1;
    protected static ?string $navigationGroup = 'People';
    protected static ?string $navigationBadge = null;

    public static function getNavigationBadge(): ?string
    {
        return User::where('created_at', '>=', now()->subDay())->count() ?: null;
    }

    public static function getNavigationBadgeColor(): string
    {
        return 'warning'; // 'primary' | 'danger' | 'warning' | 'success' | 'info'
    }
}
```

## Badges

Dynamic badges show counts or status indicators on navigation items:

```php
public static function getNavigationBadge(): ?string
{
    return Order::where('status', 'pending')->count() ?: null;
}
```

Returning `null` hides the badge.

## Custom Page Links

Add links to custom pages or external URLs:

```php
public function navigationGroups(): array
{
    return [
        NavigationGroup::make('Reports')
            ->icon('chart-bar')
            ->items([
                NavigationItem::make('Analytics Dashboard')
                    ->url('/admin/pages/analytics')
                    ->icon('presentation-chart-line'),

                NavigationItem::make('Documentation')
                    ->url('https://docs.example.com')
                    ->icon('book-open')
                    ->external(),
            ]),
    ];
}
```

## Sort Order

Items within a group are sorted by their `$navigationSort` property. Groups are sorted by their `->sort()` value. Lower numbers appear first.

```php
// Panel level
NavigationGroup::make('Shop')->sort(1);
NavigationGroup::make('People')->sort(2);
NavigationGroup::make('Settings')->sort(99);

// Module level
protected static int $navigationSort = 1;
```
