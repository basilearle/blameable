import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { ShellProviderFixture } from '@blameable/client-common';

import DashboardRoute from './DashboardRoute';

describe('<DashboardRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ShellProviderFixture>
        <BrowserRouter>
          <DashboardRoute />
        </BrowserRouter>
      </ShellProviderFixture>
    );

    expect(baseElement).toBeTruthy();
  });
});
