import { createApp, watchEffect } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { registerLoadingDirective } from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/naive';

import { useTitle } from '@vueuse/core';

import { $t, setupI18n } from '#/locales';

import { initComponentAdapter } from './adapter/component';
import { initSetupVbenForm } from './adapter/form';
import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  // Initialize the component adapter
  await initComponentAdapter();

  // Initialize form components
  await initSetupVbenForm();

  // // Set default configuration for modal dialogs
  // setDefaultModalProps({
  //   fullscreenButton: false,
  // });
  // // Set default configuration for drawers
  // setDefaultDrawerProps({
  //   // zIndex: 2000,
  // });

  const app = createApp(App);

  // Register the v-loading directive
  registerLoadingDirective(app, {
    loading: 'loading', // You can customize the directive name here, or explicitly provide false to skip registering it
    spinning: 'spinning',
  });

  // Internationalization (i18n) configuration
  await setupI18n(app);

  // Configure Pinia store
  await initStores(app, { namespace });

  // Install access control directive
  registerAccessDirective(app);

  // Initialize tippy
  const { initTippy } = await import('@vben/common-ui/es/tippy');
  initTippy(app);

  // Configure router and router guards
  app.use(router);

  // Configure Motion plugin
  const { MotionPlugin } = await import('@vben/plugins/motion');
  app.use(MotionPlugin);

  // Dynamically update the page title
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
