---
title: Multiple Panels
order: 5
---

# Multiple Panels

Run separate admin interfaces from a single Laravel application — each with its own URL, modules, auth guard, and theme.

## Creating a Panel

```bash
php artisan studio:panel Customer
```

This creates `app/Studio/Customer/Customer.php` and the `Modules/` directory.

## Example: Admin + Customer Portal

```php
// app/Studio/Admin/Admin.php
class Admin extends Panel
{
    protected string $path = '/admin';
    protected string $brandName = 'Admin';

    public function canAccess($user): bool
    {
        return $user->is_admin;
    }

    public function theme(): Theme
    {
        return Theme::make()->primary('#2563eb');
    }
}
```

```php
// app/Studio/Customer/Customer.php
class Customer extends Panel
{
    protected string $path = '/portal';
    protected string $brandName = 'My Account';

    public function canAccess($user): bool
    {
        return true; // all authenticated users
    }

    public function guard(): string
    {
        return 'web';
    }

    public function theme(): Theme
    {
        return Theme::make()->primary('#10b981');
    }
}
```

## Directory Structure

Each panel auto-discovers modules from its own namespace:

```
app/Studio/
├── Admin/
│   ├── Admin.php
│   └── Modules/
│       ├── Users.php
│       ├── Orders.php
│       └── Products.php
├── Customer/
│   ├── Customer.php
│   └── Modules/
│       ├── Orders.php          ← separate class, different behavior
│       └── Tickets.php
└── Partner/
    ├── Partner.php
    └── Modules/
        ├── Commissions.php
        └── Referrals.php
```

## Different Guards

Each panel can use a different authentication guard:

```php
class Partner extends Panel
{
    protected string $path = '/partners';

    public function guard(): string
    {
        return 'partner';
    }
}
```

Routes are automatically scoped:

```
/admin/*      → auth:web, studio.access:admin
/portal/*     → auth:web, studio.access:customer
/partners/*   → auth:partner, studio.access:partner
```

## Sharing Modules Across Panels

Reuse a module from another panel by importing it:

```php
class Customer extends Panel
{
    public function modules(): array
    {
        return [
            \App\Studio\Admin\Modules\Orders::class,  // reuse from Admin
            Tickets::class,                             // own module
        ];
    }
}
```

## Same Module, Different Behavior

Use `static::currentPanel()` to adapt a module per panel:

```php
class Orders extends Module
{
    public static function table(Table $table): Table
    {
        return $table->columns([
            Column::text('order_number')->searchable(),
            Column::badge('status'),
            Column::text('total')->money(),
            // Only show in admin panel
            Column::text('customer.name')
                ->visible(fn () => static::currentPanel() instanceof Admin),
        ]);
    }
}
```

## Cross-Panel Links

Link from one panel to another:

```php
Column::text('customer.name')
    ->url(fn ($record) => Customer::getUrl("modules/orders/{$record->id}"))
```
