import { render } from '@testing-library/react';

import { App } from './App';
import { ShellProviderFixture } from "../features/ShellProvider/ShellProvider.fixture";


describe('<App />', () => {

  it('renders successfully', () => {
    const { baseElement } = render(
      <ShellProviderFixture>
        <App />
      </ShellProviderFixture>
    );

    expect(baseElement).toBeInTheDocument();
  });

});
