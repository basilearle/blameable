import { render } from "@testing-library/react";

import { ShellProviderFixture, type BaseState } from "@blameable/client-common";

import { BlameHeader } from "./BlameHeader";

const renderBlameHeader = (defaultStoreProps?: Partial<BaseState>) => {
  return render(
    <ShellProviderFixture defaultStoreProps={defaultStoreProps}>
      <BlameHeader />
    </ShellProviderFixture>
  );
};

describe('<BlameHeader />', () => {
  it("renders successfully", () => {
    const { baseElement } = renderBlameHeader();

    expect(baseElement).toBeInTheDocument();
  });
});
