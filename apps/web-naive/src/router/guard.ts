import type { Router } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * Common guard configuration
 * @param router
 */
function setupCommonGuard(router: Router) {
  // Record the loaded pages
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // Page loading progress bar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // Record whether the page is loaded; if it is, subsequent page transitions and animations won’t repeat

    loadedPaths.add(to.path);

    // Stop the page loading progress bar
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * Access permission guard configuration
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // Basic routes that do not require access control
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
          userStore.userInfo?.homePath ||
          preferences.app.defaultHomePath,
        );
      }
      return true;
    }

    // Access token check
    if (!accessStore.accessToken) {
      // If explicitly marked to ignore access control, allow access
      if (to.meta.ignoreAccess) {
        return true;
      }

      // No access permission, redirect to login page
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // If not needed, simply delete query
          query:
            to.fullPath === preferences.app.defaultHomePath
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // Carry the target page; after login, redirect to this page
          replace: true,
        };
      }
      return to;
    }

    // Check if dynamic routes have already been generated
    if (accessStore.isAccessChecked) {
      return true;
    }
    // Generate routes
    // The list of roles that the currently logged-in user has
    const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    const userRoles = userInfo.roles ?? [];

    // Generate menus and routes
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      // These routes will be shown in the menu, but access will be redirected to 403
      routes: accessRoutes,
    });

    // Save menu and route information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ??
      (to.path === preferences.app.defaultHomePath
        ? userInfo.homePath || preferences.app.defaultHomePath
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * Project-level guard configuration
 * @param router
 */
function createRouterGuard(router: Router) {
  /** Common guards */
  setupCommonGuard(router);
  /** Access permission guards */
  setupAccessGuard(router);
}

export { createRouterGuard };
