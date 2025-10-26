import { render } from "@testing-library/react";

import { BlameHeader } from "./BlameHeader";
import type { BaseState } from "../../store";
import { ShellProviderFixture } from "../ShellProvider/ShellProvider.fixture";

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
