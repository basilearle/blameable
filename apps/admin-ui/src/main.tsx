import "@radix-ui/themes/styles.css";

// ---

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ShellProvider } from '@blameable/client-common';

import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
