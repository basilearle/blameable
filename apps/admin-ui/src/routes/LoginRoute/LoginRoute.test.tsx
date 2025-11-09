import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import LoginRoute from './LoginRoute';

describe('<LoginRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <LoginRoute />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
