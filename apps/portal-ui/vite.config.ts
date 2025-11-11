/// <reference types='vitest' />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const proxyConfig = {
    '/api/client': {
      target: env.VITE_API_BASE_DOMAIN,
      changeOrigin: true,
      headers: {
        'X-Site-ID': env.VITE_API_SITE_ID,
      },
    },
  };

  return {
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/portal-ui',
  server: {
    port: 4200,
    host: 'localhost',
    proxy: proxyConfig,
  },
  preview: {
    port: 4300,
    host: 'localhost',
    proxy: proxyConfig,
  },
  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@blameable/portal-ui',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
  };
});
