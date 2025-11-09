import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { ShellProviderFixture } from '@blameable/client-common';

import LogoutRoute from './LogoutRoute';

describe('<LogoutRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ShellProviderFixture>
        <BrowserRouter>
          <LogoutRoute />
        </BrowserRouter>
      </ShellProviderFixture>
    );

    expect(baseElement).toBeTruthy();
  });

});
