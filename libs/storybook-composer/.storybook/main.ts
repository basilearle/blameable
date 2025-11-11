import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  refs: {
    '@blameable/portal-ui': {
      title: 'Portal UI',
      url: 'http://localhost:4400',
    },
    '@blameable/admin-ui': {
      title: 'Admin UI',
      url: 'http://localhost:4401',
    },
    '@blameable/client-common': {
      title: 'Client Common',
      url: 'http://localhost:4402',
    },
  },
  viteFinal: async (config) => (
    mergeConfig(config, {
      plugins: [react(), nxViteTsPaths()],
    })
  ),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
