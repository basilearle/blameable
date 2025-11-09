import { redirect } from 'react-router';

import { authClient } from '../../auth';

export async function dashboardRouteLoader() {
  try {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect('/auth');
    }

    return session.data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    throw redirect('/auth');
  }
}
