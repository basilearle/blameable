import { render } from "@testing-library/react";

import { ShellProviderFixture } from "@blameable/client-common";

import { BlameHeader } from "./BlameHeader";

const renderBlameHeader = () => {
  return render(
    <ShellProviderFixture>
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
