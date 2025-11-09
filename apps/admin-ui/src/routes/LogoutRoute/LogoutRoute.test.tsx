import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import LogoutRoute from './LogoutRoute';

describe('<LogoutRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <LogoutRoute />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

});
