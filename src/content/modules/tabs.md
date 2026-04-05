---
title: Tabs
order: 4
---

# Tabs

Organize a module's list page into multiple tabs, each with its own scoped table.

## Defining Tabs

Override the `tabs()` method on your module:

```php
use InertiaStudio\Tab;

class Orders extends Module
{
    protected static string $model = Order::class;

    public static function tabs(): array
    {
        return [
            Tab::make('All')
                ->table(fn (Table $table) => static::table($table)),

            Tab::make('Pending')
                ->icon('clock')
                ->badge(fn () => Order::where('status', 'pending')->count())
                ->table(fn (Table $table) => $table
                    ->query(fn ($query) => $query->where('status', 'pending'))
                    ->columns([
                        Column::text('order_number')->searchable(),
                        Column::text('customer.name'),
                        Column::money('total'),
                        Column::text('created_at')->dateTime()->sortable(),
                    ])
                    ->actions([Action::edit(), Action::custom('approve')->icon('check')])
                ),

            Tab::make('Completed')
                ->icon('check-circle')
                ->table(fn (Table $table) => $table
                    ->query(fn ($query) => $query->where('status', 'completed'))
                    ->columns([
                        Column::text('order_number')->searchable(),
                        Column::text('customer.name'),
                        Column::money('total'),
                        Column::text('completed_at')->dateTime()->sortable(),
                    ])
                ),
        ];
    }
}
```

## Tab Options

```php
Tab::make('Pending')
    ->icon('clock')                                         // tab icon
    ->badge(fn () => Order::pending()->count())              // dynamic badge count
    ->badgeColor('warning')                                  // badge color
    ->table(fn (Table $table) => $table->columns([...]))     // scoped table
```

## How It Works

When `tabs()` is defined, it replaces the single `table()` on the list page. Each tab is its own Inertia partial — switching tabs reloads only the table data, not the full page.

Each tab can have:

- **Different query scopes** — filter to specific records
- **Different columns** — show relevant data for each tab
- **Different filters** — scope-specific filtering
- **Different actions** — context-appropriate actions

## Record-Level Tabs

On the edit/view page, organize content into tabs — form sections, relations, and custom components:

```php
public static function recordTabs(): array
{
    return [
        Tab::make('Details')
            ->icon('user')
            ->schema(fn () => static::form(new Form())),

        Tab::make('Posts')
            ->icon('document-text')
            ->relation(PostsRelation::class),

        Tab::make('Activity')
            ->icon('clock')
            ->component('Studio::ActivityLog')
            ->props(fn ($record) => [
                'activities' => $record->activities()->latest()->limit(50)->get(),
            ]),
    ];
}
```
