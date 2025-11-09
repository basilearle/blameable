import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import DashboardRoute from './DashboardRoute';

describe('<DashboardRoute />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <DashboardRoute />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
