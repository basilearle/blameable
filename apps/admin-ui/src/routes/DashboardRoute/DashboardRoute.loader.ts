import { redirect } from 'react-router';

import { getAdminSites } from '@blameable/client-codegen/core-api';

import { authClient } from '../../auth';

export async function dashboardRouteLoader() {
  try {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect('/auth');
    }

    const { data } = await getAdminSites();

    return {
      session: session.data,
      data,
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    throw redirect('/auth');
  }
}

export type DashboardLoaderData = Awaited<ReturnType<typeof dashboardRouteLoader>>;
