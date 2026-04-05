---
title: Widgets
order: 1
---

# Widgets

Widgets are data display components for dashboards and module list page headers.

## Where Widgets Appear

### Panel Dashboard

```php
class Admin extends Panel
{
    public function dashboard(): array
    {
        return [
            Widget::statGroup([...]),
            Widget::line('Registrations')->query(fn () => [...])->xKey('date')->yKey('count'),
        ];
    }
}
```

### Module List Page Header

```php
class Orders extends Module
{
    public static function widgets(): array
    {
        return [
            Widget::statGroup([
                Widget::stat('Total')->value(fn () => Order::count()),
                Widget::stat('Pending')->value(fn () => Order::pending()->count())->color('warning'),
                Widget::stat('Revenue')->value(fn () => '$' . number_format(Order::sum('total') / 100, 2))->color('success'),
            ]),
        ];
    }
}
```

## Stat Widgets

### Single Stat

```php
Widget::stat('Total Users')
    ->value(fn () => User::count())
    ->icon('users')
    ->color('primary')
    ->trend(fn () => User::where('created_at', '>=', now()->subDays(7))->count())
    ->change('+12%')
```

### Stat Group

Row of stat cards:

```php
Widget::statGroup([
    Widget::stat('Users')->value(fn () => User::count())->icon('users'),
    Widget::stat('Revenue')->value(fn () => '$12,345')->icon('currency-dollar')->color('success'),
    Widget::stat('Orders')->value(fn () => Order::count())->icon('shopping-cart')->color('warning'),
])
```

## Chart Widgets

### Line Chart

```php
Widget::line('Registrations')
    ->query(fn () => User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
        ->groupByRaw('DATE(created_at)')
        ->where('created_at', '>=', now()->subDays(30))
        ->orderBy('date')
        ->get())
    ->xKey('date')
    ->yKey('count')
```

### Bar Chart

```php
Widget::bar('Revenue by Product')
    ->query(fn () => Product::withSum('orders', 'total')
        ->orderByDesc('orders_sum_total')
        ->limit(10)
        ->get())
    ->xKey('name')
    ->yKey('orders_sum_total')
```

### Area and Pie Charts

```php
Widget::area('Traffic')->query(fn () => [...])->xKey('date')->yKey('visits')
Widget::pie('Distribution')->query(fn () => [...])->xKey('category')->yKey('count')
```

## Data Widgets

### Table Widget

Mini data table:

```php
Widget::table('Recent Orders')
    ->query(fn () => Order::with('customer')->latest()->limit(5))
    ->columns([
        Column::text('order_number'),
        Column::text('customer.name'),
        Column::badge('status'),
        Column::money('total'),
    ])
```

### List Widget

Simple list with icon/label/value rows:

```php
Widget::list('System Info')
    ->items([
        ['label' => 'PHP Version', 'value' => phpversion()],
        ['label' => 'Laravel', 'value' => app()->version()],
        ['label' => 'Environment', 'value' => app()->environment()],
    ])
```

### Timeline Widget

Activity or event timeline:

```php
Widget::timeline('Recent Activity')
    ->query(fn () => Activity::latest()->limit(10)->get())
    ->titleKey('description')
    ->dateKey('created_at')
    ->iconKey('icon')
```

## Widget Grid

Widgets render in a responsive 3-column grid. Control span with `->columns()`:

```php
Widget::line('Trend')->columns(2),      // 2/3 width
Widget::table('Recent')->columns(1),    // 1/3 width
Widget::bar('Chart')->columns(3),       // full width
```

## Custom Widgets

Render a custom frontend component as a widget:

```php
Widget::custom('Studio::CustomChart')
    ->props(['data' => $chartData])
    ->columns(2)
```
