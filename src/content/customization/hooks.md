---
title: Hooks
order: 2
---

# Hooks

Hooks let you customize behavior and UI at every level without publishing or forking components.

## StudioProvider

Register hooks via the provider component at the root of your app:

**React:**

```tsx
import { StudioProvider } from '@inertia-studio/ui/react'

function App({ children }) {
    return (
        <StudioProvider
            hooks={{
                'layout:sidebar-footer': () => <AppVersion />,
                'layout:user-menu': (user) => <CustomUserMenu user={user} />,
                'table:empty-state': () => <EmptyIllustration />,
                'table:row-class': (record) => record.is_archived ? 'opacity-50' : '',
                'form:before-submit': (data) => ({ ...data, _submitted_at: Date.now() }),
            }}
        >
            {children}
        </StudioProvider>
    )
}
```

**Vue:**

```vue
<script setup>
import { provideStudioHooks } from '@inertia-studio/ui/vue'

provideStudioHooks({
    'layout:sidebar-footer': () => h(AppVersion),
    'table:empty-state': () => h(EmptyIllustration),
})
</script>
```

**Svelte:**

```svelte
<script>
import { setStudioHooks } from '@inertia-studio/ui/svelte'

setStudioHooks({
    'layout:sidebar-footer': AppVersion,
    'table:empty-state': EmptyIllustration,
})
</script>
```

## Available Hooks

### Layout Hooks

| Hook | Arguments | Description |
|------|-----------|-------------|
| `layout:sidebar-header` | none | Content above navigation |
| `layout:sidebar-footer` | none | Content below navigation |
| `layout:topbar-start` | none | Left side of topbar |
| `layout:topbar-end` | none | Right side of topbar |
| `layout:user-menu` | `(user)` | Custom user dropdown |
| `layout:mobile-menu` | none | Custom mobile nav |
| `layout:tenant-switcher` | `(current, available, onSwitch)` | Custom tenant switcher |

### Page Hooks

| Hook | Arguments | Description |
|------|-----------|-------------|
| `page:before-content` | `(context)` | Content before main area |
| `page:after-content` | `(context)` | Content after main area |
| `page:header-actions` | `(context)` | Extra buttons in page header |

### Form Hooks

| Hook | Arguments | Description |
|------|-----------|-------------|
| `form:field-wrapper` | `(field, children)` | Wrap every field |
| `form:before-submit` | `(data, operation)` | Modify data before submit |
| `form:after-submit` | `(result)` | Run after form submission |
| `form:render-field` | `(field)` | Replace a field's rendering (return null for default) |

### Table Hooks

| Hook | Arguments | Description |
|------|-----------|-------------|
| `table:row-class` | `(record, index)` | CSS class for table rows |
| `table:cell` | `(column, value, record)` | Replace a cell's rendering |
| `table:empty-state` | none | Custom empty state |
| `table:header-actions` | none | Extra header buttons |

### Theme Hooks

| Hook | Arguments | Description |
|------|-----------|-------------|
| `theme:resolved` | `(theme)` | Modify resolved theme |
| `theme:css-vars` | `(vars)` | Modify CSS variables |

## Hooks for Data

### usePanel

Access the current panel configuration:

```tsx
import { usePanel } from '@inertia-studio/ui/react'

function MyComponent() {
    const panel = usePanel()
    // panel.brandName, panel.theme, panel.navigation, etc.
}
```

### useFormState

Access and modify form field state:

```tsx
import { useFormState } from '@inertia-studio/ui/react'

function CustomField({ name }) {
    const { value, setValue, error, touched } = useFormState(name)
    // ...
}
```

### useTheme

Access the resolved theme:

```tsx
import { useTheme } from '@inertia-studio/ui/react'

function ThemedComponent() {
    const theme = useTheme()
    // theme.primary, theme.borderRadius, theme.density, etc.
}
```
