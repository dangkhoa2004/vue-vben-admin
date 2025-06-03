import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description Project configuration file
 * Only override parts of the project configuration as needed;
 * if no override is provided, the default configuration will be used automatically.
 * !!! After changing the configuration, please clear the cache, or it may not take effect
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
});
