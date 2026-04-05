---
title: PageSchema Reference
order: 2
---

# PageSchema Reference

PageSchema provides 24 primitives for composing custom page layouts entirely in PHP. Each primitive serializes to JSON and renders on the frontend.

## Layout Primitives

### Row

Horizontal flex container:

```php
PageSchema::row([
    Widget::stat('Users')->value(User::count()),
    Widget::stat('Posts')->value(Post::count()),
])
```

### Grid

CSS grid container with configurable columns:

```php
PageSchema::grid(columns: 3, [
    Widget::stat('Users')->value(User::count()),
    Widget::stat('Posts')->value(Post::count()),
    Widget::stat('Comments')->value(Comment::count()),
])
```

### Card

Bordered card wrapper:

```php
PageSchema::card('Settings')
    ->description('Configure application settings.')
    ->schema([...])
```

### Section

Headed section with optional collapsibility:

```php
PageSchema::section('Overview')
    ->collapsible()
    ->schema([...])
```

### Tabs

Tabbed content:

```php
PageSchema::tabs([
    PageSchema::tab('Analytics')->schema([...]),
    PageSchema::tab('Logs')->schema([...]),
])
```

## Data Primitives

### Table

Mini data table:

```php
PageSchema::table('Recent Orders')
    ->query(fn () => Order::with('customer')->latest()->limit(10))
    ->columns([
        Column::text('order_number'),
        Column::text('customer.name'),
        Column::badge('status'),
        Column::money('total'),
    ])
```

### List

Simple key-value list:

```php
PageSchema::list('System Info')
    ->items([
        'PHP Version' => phpversion(),
        'Laravel Version' => app()->version(),
        'Environment' => app()->environment(),
    ])
```

### Stat / StatGroup

Stat cards:

```php
PageSchema::stat('Total Users')
    ->value(fn () => User::count())
    ->icon('users')
    ->trend(fn () => User::where('created_at', '>=', now()->subDays(7))->count())
    ->change('+12%')
```

### Chart Primitives

```php
PageSchema::lineChart('Registrations')
    ->query(fn () => User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
        ->groupByRaw('DATE(created_at)')
        ->where('created_at', '>=', now()->subDays(30))
        ->get())
    ->xKey('date')
    ->yKey('count')

PageSchema::barChart('Revenue by Product')
    ->query(fn () => Product::withSum('orders', 'total')->get())
    ->xKey('name')
    ->yKey('orders_sum_total')

PageSchema::areaChart('Traffic')->query(fn () => [...])
PageSchema::pieChart('Distribution')->query(fn () => [...])
```

## Form Primitives

### Form

Embedded form with closure-based action handler:

```php
PageSchema::form('Contact Form')
    ->schema([
        Field::text('name')->required(),
        Field::email('email')->required(),
        Field::textarea('message')->required(),
    ])
    ->action(function (array $data) {
        Mail::to('admin@example.com')->send(new ContactMail($data));
        return Notification::make()->title('Message sent')->success();
    })
```

### Action Button

Standalone action button:

```php
PageSchema::action('Clear Cache')
    ->icon('trash')
    ->color('danger')
    ->requiresConfirmation()
    ->action(fn () => Artisan::call('cache:clear'))
```

## Content Primitives

### Text

Static text or HTML:

```php
PageSchema::text('Welcome to the admin panel. Use the sidebar to navigate.')
```

### Heading

Section heading:

```php
PageSchema::heading('Dashboard')
    ->level(2)
    ->description('Overview of your application.')
```

### Separator

Horizontal divider:

```php
PageSchema::separator()
```

### Custom

Render a custom frontend component:

```php
PageSchema::custom('Studio::MyCustomWidget')
    ->props(['data' => $data])
```

## Nesting

All layout primitives accept nested schemas, allowing complex compositions:

```php
public function schema(): array
{
    return [
        PageSchema::grid(columns: 3, [
            PageSchema::stat('Users')->value(User::count()),
            PageSchema::stat('Revenue')->value('$12,345'),
            PageSchema::stat('Orders')->value(Order::count()),
        ]),

        PageSchema::row([
            PageSchema::card('Recent Activity')
                ->columns(2)
                ->schema([
                    PageSchema::table('Orders')->query(fn () => Order::latest()->limit(5))->columns([...]),
                ]),
            PageSchema::card('Quick Stats')
                ->columns(1)
                ->schema([
                    PageSchema::lineChart('Trend')->query(fn () => [...])->xKey('date')->yKey('count'),
                ]),
        ]),
    ];
}
```
