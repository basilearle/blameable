import { lazy } from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router';

import { CenteredLayout } from '@blameable/client-common';

import { authRouteLoader } from './routes/AuthRoute';
import { dashboardRouteLoader } from './routes/DashboardRoute';
import { loginRouteLoader } from './routes/LoginRoute';
import { logoutLoader } from './routes/LogoutRoute';

export const adminRouter = createBrowserRouter([
  {
    index: true,
    loader: () => redirect('/auth'),
  },
  {
    path: 'dashboard',
    loader: dashboardRouteLoader,
    Component: lazy(() => import('./routes/DashboardRoute/DashboardRoute')),
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
        index: true,
        loader: authRouteLoader,
        Component: lazy(() => import('./routes/AuthRoute/AuthRoute')),
      },
      {
        path: 'login',
        loader: loginRouteLoader,
        Component: lazy(() => import('./routes/LoginRoute/LoginRoute')),
      },
      {
        path: 'logout',
        loader: logoutLoader,
        Component: lazy(() => import('./routes/LogoutRoute/LogoutRoute')),
      },
    ],
  },
]);
