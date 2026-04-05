---
title: Publishing Components
order: 1
---

# Publishing Components

Override any Studio component by publishing it to your application. Published components become your code with full control.

## Three Override Layers

| Layer | How | Scope | Effort |
|-------|-----|-------|--------|
| **1. Package default** | Ships in `@inertia-studio/ui` | Everything | Zero |
| **2. Theme** | PHP `Theme::make()` + CSS vars + hooks | Colors, spacing, slots | Config |
| **3. Published copy** | `php artisan studio:publish --component=X` | Single component, full rewrite | Per-component |

Most specific wins. If a published copy exists, it takes priority over the package default.

## Publishing Commands

```bash
# Single component
php artisan studio:publish --component=TextField
# → resources/js/studio/components/Form/TextField.tsx (or .vue / .svelte)

# Component group
php artisan studio:publish --group=form         # all form fields
php artisan studio:publish --group=table        # all table components
php artisan studio:publish --group=layout       # sidebar, topbar, breadcrumbs
php artisan studio:publish --group=actions      # action buttons, modals
php artisan studio:publish --group=widgets      # stats, chart, table widgets

# All components
php artisan studio:publish --all

# Inertia page templates
php artisan studio:publish --pages
# → resources/js/Pages/Studio/**/*
```

The published file format (`.tsx`, `.vue`, `.svelte`) is determined by the `framework` setting in `config/studio.php`.

## Resolution Order

```
resources/js/studio/components/Form/TextField.tsx exists?
  → YES: use published copy (Layer 3)
  → NO: use @inertia-studio/ui/{framework} TextField
         → styled via CSS variables (Layer 2)
         → with package defaults (Layer 1)
```

## Customizing a Published Component

Published files can still import primitives from the package:

**React:**

```tsx
// resources/js/studio/components/Form/TextField.tsx
import { FieldWrapper, useFormState } from '@inertia-studio/ui/react'

export function TextField({ schema }) {
    const { value, setValue, error } = useFormState(schema.name)
    return (
        <FieldWrapper schema={schema} error={error}>
            <MyCustomInput value={value} onChange={setValue} />
        </FieldWrapper>
    )
}
```

**Vue:**

```vue
<!-- resources/js/studio/components/Form/TextField.vue -->
<script setup>
import { FieldWrapper, useFormState } from '@inertia-studio/ui/vue'
const props = defineProps(['schema'])
const { value, setValue, error } = useFormState(props.schema.name)
</script>
<template>
    <FieldWrapper :schema="schema" :error="error">
        <MyCustomInput :value="value" @update="setValue" />
    </FieldWrapper>
</template>
```

**Svelte:**

```svelte
<!-- resources/js/studio/components/Form/TextField.svelte -->
<script>
import { FieldWrapper, useFormState } from '@inertia-studio/ui/svelte'
export let schema
const { value, setValue, error } = useFormState(schema.name)
</script>
<FieldWrapper {schema} {error}>
    <MyCustomInput value={$value} on:change={setValue} />
</FieldWrapper>
```

## Re-syncing with Updates

When the package updates, re-publish a component to get the latest version:

```bash
php artisan studio:publish --component=TextField --force
```

This overwrites your published copy. Use version control to merge your changes with the updated version.
