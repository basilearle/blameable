import { createAuthClient } from 'better-auth/react';

import { environment } from '../environment';

// NOTE: for some reason the type inference of the createAuthClient is not working correctly
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL: `${environment.apiBaseUrl}/auth`,
});
