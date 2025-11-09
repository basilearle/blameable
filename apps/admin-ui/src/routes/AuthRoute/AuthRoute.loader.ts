import { redirect } from 'react-router';

import { authClient } from '../../auth';

export async function authRouteLoader() {
  try {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect('/auth/login');
    }

    return redirect('/dashboard');
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    throw redirect('/auth/login');
  }
}
