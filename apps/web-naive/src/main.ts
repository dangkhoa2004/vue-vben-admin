import { initPreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences } from './preferences';

/**
 * Render the page and load it only after the application has been initialized
 */
async function initApplication() {
  // name is used to specify the unique identifier for the project
  // It’s used to distinguish different project preferences and as a prefix for stored data keys,
  // as well as other isolated data
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // Initialize app preferences
  await initPreferences({
    namespace,
    overrides: overridesPreferences,
  });

  // Start the application and mount it
  // The main logic and views of the Vue app
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  // Remove and destroy the loading indicator
  unmountGlobalLoading();
}

initApplication();
