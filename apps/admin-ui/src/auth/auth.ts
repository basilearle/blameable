import { createAuthClient } from 'better-auth/react';

import { environment } from '../environment';

const baseURL = environment.apiBaseUrl !== '/api'
  ? `${environment.apiBaseUrl}/auth`
  : undefined;

// NOTE: for some reason the type inference of the createAuthClient is not working correctly
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL,
});
