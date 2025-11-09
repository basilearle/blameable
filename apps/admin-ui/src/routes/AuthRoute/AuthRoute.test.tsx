import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { ShellProviderFixture } from '@blameable/client-common';

import AuthRoute from './AuthRoute';

describe('<AuthRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ShellProviderFixture>
        <BrowserRouter>
          <AuthRoute />
        </BrowserRouter>
      </ShellProviderFixture>
    );

    expect(baseElement).toBeTruthy();
  });

});
