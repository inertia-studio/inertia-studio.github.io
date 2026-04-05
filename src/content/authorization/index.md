---
title: Authorization
order: 1
---

# Authorization

Inertia Studio uses standard Laravel Policies for authorization. No custom permission system required.

## Policy Integration

Each CRUD operation maps to a policy method:

| Operation | Policy Method | Called When |
|-----------|--------------|-------------|
| List | `viewAny($user)` | Viewing the module list page |
| View | `view($user, $model)` | Viewing a single record |
| Create | `create($user)` | Accessing create form / storing |
| Update | `update($user, $model)` | Accessing edit form / updating |
| Delete | `delete($user, $model)` | Deleting a single record |
| Bulk Delete | `deleteAny($user)` | Bulk deleting selected records |
| Restore | `restore($user, $model)` | Restoring a soft-deleted record |
| Force Delete | `forceDelete($user, $model)` | Permanently deleting |

## Auto-Discovery

Policies are auto-discovered via Laravel's standard convention. If `App\Policies\UserPolicy` exists, it's used for the `Users` module automatically.

```php
// app/Policies/UserPolicy.php
namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->is_admin;
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('users.create');
    }

    public function update(User $user, User $model): bool
    {
        return $user->is_admin || $user->id === $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return $user->is_admin && $user->id !== $model->id;
    }
}
```

## Automatic UI Enforcement

Actions, navigation items, and buttons are automatically hidden when the user lacks the corresponding permission. No extra configuration needed:

- **Create button** hidden if `create()` returns false
- **Edit action** hidden if `update()` returns false
- **Delete action** hidden if `delete()` returns false
- **Bulk delete** hidden if `deleteAny()` returns false
- **Module navigation item** hidden if `viewAny()` returns false

## Panel-Level Access

The `canAccess()` method on a Panel controls who can access the entire panel:

```php
class Admin extends Panel
{
    public function canAccess($user): bool
    {
        return $user->is_admin;
    }
}
```

Users who fail this check are redirected to the login page or receive a 403 response.

## Module-Level Access

Override `canAccess()` on a module for additional restrictions:

```php
class AuditLogs extends Module
{
    public static function canAccess(): bool
    {
        return auth()->user()->hasRole('super-admin');
    }
}
```

When `canAccess()` returns false, the module is hidden from navigation and its routes return 403.

## Works With Any Permission Package

Studio delegates to Laravel Policies, so it works with any permission system:

```php
// Spatie laravel-permission
public function viewAny(User $user): bool
{
    return $user->hasPermissionTo('view users');
}

// Bouncer
public function create(User $user): bool
{
    return $user->isAn('admin');
}

// Custom
public function update(User $user, User $model): bool
{
    return $user->permissions->contains('users.edit');
}
```
