import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import AuthRoute from './AuthRoute';

describe('<AuthRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AuthRoute />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

});
