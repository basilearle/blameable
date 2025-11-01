import { render } from '@testing-library/react';

import { ShellProviderFixture } from "@blameable/client-common";

import { App } from './App';


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
