---
title: Date & Time
order: 4
---

# Date & Time

Fields for date and time selection.

## Date

Date picker with optional time selection:

```php
Field::date('published_at')
    ->label('Publish Date')
    ->required()
```

### With Time

```php
Field::date('event_starts_at')
    ->withTime()
    ->timezone('America/New_York')
```

### Date Constraints

```php
Field::date('birthday')
    ->maxDate(now())                            // no future dates
    ->minDate(now()->subYears(120))             // reasonable minimum

Field::date('deadline')
    ->minDate(now())                            // no past dates
    ->format('Y-m-d')                           // storage format
    ->displayFormat('M d, Y')                   // display format
```

## Time

Time-only picker:

```php
Field::time('starts_at')
    ->label('Start Time')
    ->format('H:i')                             // 24-hour format
    ->minuteStep(15)                            // 15-minute intervals
```

## Date Range

Start/end date range picker stored as two columns:

```php
Field::dateRange('period')
    ->startColumn('start_date')
    ->endColumn('end_date')
    ->label('Date Range')
    ->minDate(now())
```

The date range field renders a single picker that selects both start and end dates, storing each in its respective database column.
