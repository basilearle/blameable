import { redirect } from 'react-router';

import { authClient } from '../../auth';

export async function loginRouteLoader() {
  try {
    const session = await authClient.getSession();

    if (session.data) {
      return redirect('/portal');
    }

  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
  }

  return {};
}
