import "@radix-ui/themes/styles.css";

// ---

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { client } from '@blameable/client-codegen/core-api/client.gen';
import { ShellProvider } from '@blameable/client-common';

import App from './app/App';
import { environment } from './environment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

client.setConfig({
  baseUrl: environment.apiBaseUrl,
  credentials: 'include',
});

root.render(
  <StrictMode>
    <ShellProvider
      defaultStoreProps={{
        currentLocale: 'en-CA',
        localeOptions: [ 'en-CA' ],
        tokens: {},
      }}
    >
      <App />
    </ShellProvider>
  </StrictMode>
);
