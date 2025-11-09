import { render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { adminRouter } from '../router';

describe('<App />', () => {
  it('should render successfully', async () => {
    const testRouter = createMemoryRouter(adminRouter.routes, {
      initialEntries: ['/auth'],
    });

    const { baseElement } = render(
      <RouterProvider router={testRouter} />
    );

    // NOTE: don't like that this wait for is necessary here.
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });
});
