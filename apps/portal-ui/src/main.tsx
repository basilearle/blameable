import "@radix-ui/themes/styles.css";

// ---

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { getBootstrap } from '@blameable/client-codegen/core-api';
import { client } from '@blameable/client-codegen/core-api/client.gen';
import { ShellProvider } from '@blameable/client-common';

import App from './app/App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.querySelector('#root')!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const spinner = document.querySelector('#spinner-root')!;

const queryParameters = new URLSearchParams(window.location.search);
const locale = queryParameters.get('locale') ?? undefined;

(async () => {
  client.setConfig({
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  });

  const { data, error } = await getBootstrap({
    query: {
      locale,
    },
  });

  if (!data) {
    throw error;
  }

  // remove global spinner
  spinner.remove();

  createRoot(root).render(
    <StrictMode>
      <ShellProvider
        defaultStoreProps={{
          currentLocale: data.defaultLocale,
          localeOptions: data.availableLocales,
          tokens: data.tokens,
        }}
      >
        <App />
      </ShellProvider>
    </StrictMode>
  );
})();
