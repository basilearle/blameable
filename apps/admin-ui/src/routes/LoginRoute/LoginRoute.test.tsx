import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { ShellProviderFixture } from '@blameable/client-common';

import LoginRoute from './LoginRoute';

describe('<LoginRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ShellProviderFixture>
        <BrowserRouter>
          <LoginRoute />
        </BrowserRouter>
      </ShellProviderFixture>
    );

    expect(baseElement).toBeTruthy();
  });
});
