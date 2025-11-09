import { createBrowserRouter } from 'react-router';

import { LoginRoute } from './routes/LoginRoute';

export const adminRouter = createBrowserRouter([
  {
    index: true,
    element: <div>Hello World</div>,
  },
  {
    path: '/login',
    Component: LoginRoute,
  }
]);
