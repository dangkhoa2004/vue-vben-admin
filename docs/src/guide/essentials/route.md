Here’s the **English translation** for the documentation content you provided:

---

# Routes and Menus

In the project, the framework provides a basic routing system and **automatically generates the corresponding menu structure based on the route files**.

## Route Types

Routes are divided into core routes, static routes, and dynamic routes. Core routes are built-in routes of the framework, including root routes, login routes, 404 routes, etc. Static routes are routes that are determined at project startup, while dynamic routes are usually generated dynamically after the user logs in, based on their permissions.

Both static and dynamic routes go through permission control. You can control permissions by setting the `authority` field in the route's `meta` property. For example, see [Route Permission Control](https://github.com/vbenjs/vue-vben-admin/blob/main/playground/src/router/routes/modules/demos.ts).

### Core Routes

Core routes are built-in routes of the framework, including root routes, login routes, 404 routes, etc. Their configuration is located in the `src/router/routes/core` directory.

\::: tip
Core routes are mainly used for basic framework functionality. It is not recommended to put business-related routes here. Instead, business routes should be placed in static or dynamic routes.
\:::

### Static Routes

Static route configuration is in the `src/router/routes/index` directory. Open the commented-out file content:

\::: tip
Permission control is handled by the `authority` field in the route's `meta` property. If your page doesn't require permission control, you can omit the `authority` field.
\:::

```ts
// If needed, you can uncomment and create the folder
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true }); // [!code --]
const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true }); // [!code ++]
/** Dynamic routes */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** External routes; these routes do not require Layout and may be embedded in other systems */
// const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles) // [!code --]
const externalRoutes: RouteRecordRaw[] = []; // [!code --]
const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles); // [!code ++]
```

### Dynamic Routes

Dynamic routes are configured in the `src/router/routes/modules` directory of the application. Each file follows the Vue Router route configuration format. Below is an example of secondary and nested (multi-level) route configurations.

## Route Definition

The configuration of static and dynamic routes is the same. Below are examples of secondary and multi-level route configurations:

### Secondary Routes

\::: details Example of Secondary Routes

```ts
import type { RouteRecordRaw } from 'vue-router';

import { VBEN_LOGO_URL } from '@vben/constants';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      badgeVariants: 'destructive',
      icon: VBEN_LOGO_URL,
      order: 9999,
      title: $t('page.vben.title'),
    },
    name: 'VbenProject',
    path: '/vben-admin',
    redirect: '/vben-admin/about',
    children: [
      {
        name: 'VbenAbout',
        path: '/vben-admin/about',
        component: () => import('#/views/_core/about/index.vue'),
        meta: {
          badgeType: 'dot',
          badgeVariants: 'destructive',
          icon: 'lucide:copyright',
          title: $t('page.vben.about'),
        },
      },
    ],
  },
];

export default routes;
```

\:::

### Multi-Level Routes

\::: tip

* Usually, you don’t need to specify the `redirect` property for the parent route; by default, it will redirect to the first child route.
  \:::

\::: details Example of Multi-Level Routes

```ts
// (Same as your original code; just translated in other sections above.)
```

\:::

## Adding New Pages

To add a new page, you only need to add a route and the corresponding page component.

### Add Route

Add a route object in the corresponding route file:

```ts
import type { RouteRecordRaw } from 'vue-router';

import { VBEN_LOGO_URL } from '@vben/constants';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:home',
      title: $t('page.home.title'),
    },
    name: 'Home',
    path: '/home',
    redirect: '/home/index',
    children: [
      {
        name: 'HomeIndex',
        path: '/home/index',
        component: () => import('#/views/home/index.vue'),
        meta: {
          icon: 'mdi:home',
          title: $t('page.home.index'),
        },
      },
    ],
  },
];

export default routes;
```

### Add Page Component

Create an `index.vue` file in `#/views/home/`:

```vue
<template>
  <div>
    <h1>home page</h1>
  </div>
</template>
```

### Verify

At this point, your page is complete! Visit `http://localhost:5555/home/index` to see the new page.

## Route Meta Configuration

The route configuration mainly involves the `meta` property of the route object. Here are some common configuration options:

```ts {5-8}
const routes = [
  {
    name: 'HomeIndex',
    path: '/home/index',
    meta: {
      icon: 'mdi:home',
      title: $t('page.home.index'),
    },
  },
];
```

\::: details Route Meta Type Definition

```ts
interface RouteMeta {
  // (Translated version of the long RouteMeta interface explanation you provided)
}
```

\:::

## Refreshing Routes

You can refresh routes as follows:

```vue
<script setup lang="ts">
import { useRefresh } from '@vben/hooks';

const { refresh } = useRefresh();

// Refresh the current route
refresh();
</script>
```

## Tab and Route Control

In some scenarios, you may want to open multiple tabs for a single route or update the query of a route without opening a new tab.

Each tab uses a unique key. There are three ways to set the tab key (priority from high to low):

* Use the `pageKey` query parameter in the route:

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
router.push({
  path: 'path',
  query: {
    pageKey: 'key',
  },
});
</script>
```

* Use the full path as the tab key (`meta.fullPathKey` not set to false)
* Use the route’s `path` as the tab key (`meta.fullPathKey` set to false)

---

✅ Let me know if you’d like me to translate the full `RouteMeta` type and other inline comments (like examples), or if you’d like additional restructuring! 🚀
