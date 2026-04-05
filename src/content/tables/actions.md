---
title: Actions
order: 4
---

# Actions

Actions are buttons that perform operations on one or more records.

## Built-in Actions

### Row Actions

Actions that appear on each row:

```php
->actions([
    Action::view(),             // navigate to detail page
    Action::edit(),             // navigate to edit page
    Action::delete(),           // delete with confirmation modal
])
```

### Bulk Actions

Actions that operate on selected records:

```php
->bulkActions([
    Action::bulkDelete(),       // delete all selected
    Action::export(),           // export selected to CSV
])
```

## Custom Actions

Create actions with custom behavior:

```php
Action::custom('approve')
    ->label('Approve')
    ->icon('check')
    ->color('success')
    ->requiresConfirmation()
    ->confirmationMessage('Are you sure you want to approve this record?')
    ->action(fn ($record) => $record->update(['status' => 'approved']))
```

### With Modal Form

Actions can open a form modal before executing:

```php
Action::custom('change-role')
    ->label('Change Role')
    ->icon('users')
    ->form([
        Field::select('role')
            ->options(['admin' => 'Admin', 'editor' => 'Editor', 'user' => 'User'])
            ->required(),
        Field::textarea('reason')
            ->label('Reason for change'),
    ])
    ->action(function ($record, array $data) {
        $record->update(['role' => $data['role']]);
        ActivityLog::create([
            'user_id' => $record->id,
            'action' => 'role_changed',
            'reason' => $data['reason'],
        ]);
    })
```

## Action Options

```php
Action::custom('archive')
    ->label('Archive')
    ->icon('archive-box')
    ->color('warning')                  // 'primary' | 'danger' | 'warning' | 'success' | 'info'
    ->requiresConfirmation()            // show confirmation dialog
    ->confirmationMessage('Archive this record?')
    ->successMessage('Record archived.')
    ->hidden(fn ($record) => $record->is_archived)
    ->disabled(fn ($record) => $record->status === 'processing')
    ->action(fn ($record) => $record->update(['is_archived' => true]))
```

## Visibility

Control when actions appear:

```php
Action::edit()
    ->hidden(fn ($record) => $record->is_locked)

Action::delete()
    ->visible(fn ($record) => auth()->user()->is_admin)
```

Actions are also automatically hidden when the user lacks the corresponding policy permission (e.g., `delete` action is hidden if `UserPolicy::delete()` returns false).

## Header Actions

Actions above the table (not per-row):

```php
$table->headerActions([
    Action::create(),               // "Create" button
    Action::custom('import')
        ->label('Import')
        ->icon('arrow-up-tray'),
])
```
