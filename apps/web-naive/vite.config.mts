import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    // Application configuration (currently empty)
    application: {},

    // Vite-specific configuration
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // Rewrite the path by removing '/api' at the start
            rewrite: (path) => path.replace(/^\/api/, ''),
            // Proxy target for mock API
            target: 'http://localhost:5320/api',
            ws: true, // Enable websocket support
          },
        },
      },
    },
  };
});
