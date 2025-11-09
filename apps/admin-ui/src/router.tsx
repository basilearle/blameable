import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';

import { CenteredLayout } from '@blameable/client-common';

export const adminRouter = createBrowserRouter([
  {
    index: true,
    element: <div>Hello World</div>,
  },
  {
    path: 'auth',
    element: (
      <CenteredLayout>
        <Outlet />
      </CenteredLayout>
    ),
    children: [
      {
        path: 'login',
        Component: lazy(() => import('./routes/LoginRoute/LoginRoute')),
      },
    ],
  },
]);
