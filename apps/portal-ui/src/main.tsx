import "@radix-ui/themes/styles.css";

// ---

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import { ShellProvider } from "./features/ShellProvider";
import { worker } from './mocks/browser';

const root = document.querySelector('#root')!;
const spinner = document.querySelector('#spinner-root')!;

const queryParameters = new URLSearchParams(window.location.search);
const locale = queryParameters.get('locale');
const bootstrapDataUrl = new URL('/api/bootstrap', window.location.href);

if (locale) {
  bootstrapDataUrl.searchParams.set('locale', locale);
}

// Start MSW
worker.start().then(() => {
  fetch(bootstrapDataUrl)
    .then(res => res.json())
    .then((body) => {
      // remove global spinner
      spinner.remove();

      const config = body.data;

      createRoot(root).render(
        <StrictMode>
          <ShellProvider
            defaultStoreProps={{
              currentLocale: config.defaultLocale,
              localeOptions: config.availableLocales,
              tokens: config.tokens,
            }}
          >
            <App />
          </ShellProvider>
        </StrictMode>
      );
    });
});
