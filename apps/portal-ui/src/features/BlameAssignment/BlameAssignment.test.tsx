import { ShellProviderFixture, type BaseState } from "@blameable/client-common";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { BlameAssignment } from "./BlameAssignment";

const renderBlameAssignment = (defaultStoreProps?: Partial<BaseState>) => {
  return render(
    <ShellProviderFixture defaultStoreProps={defaultStoreProps}>
      <BlameAssignment />
    </ShellProviderFixture>
  );
};

describe("<BlameAssignment />", () => {
  it("renders successfully", () => {
    const { baseElement } = renderBlameAssignment();

    expect(baseElement).toBeInTheDocument();
  });

  it("shows decline button when blameCount is 0", () => {
    const { getByText } = renderBlameAssignment({ blameCount: 0 });

    expect(getByText("Decline Blame")).toBeInTheDocument();
  });

  it("hides decline button when blameCount is greater than 0", () => {
    const { queryByText } = renderBlameAssignment({ blameCount: 1 });

    expect(queryByText("Decline Blame")).not.toBeInTheDocument();
  });

  it("passes isPending prop to BlameForm", () => {
    const { getByRole } = renderBlameAssignment({ isBlamePending: true });

    const assignButton = getByRole("button", { name: /Assign Blame/i });
    expect(assignButton).toBeDisabled();
  });

  it("calls onAssignBlame when assign button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnAssignBlame = vitest.fn();

    const { getByText } = renderBlameAssignment({
      blameCount: 0,
      onAssignBlame: mockOnAssignBlame,
    });

    await user.click(getByText("Assign Blame", { selector: "button" }));

    expect(mockOnAssignBlame).toHaveBeenCalledOnce();
  });

  it("calls onAssignBlame when decline button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnAssignBlame = vitest.fn();

    const { getByText } = renderBlameAssignment({
      blameCount: 0,
      onAssignBlame: mockOnAssignBlame,
    });

    await user.click(getByText("Decline Blame", { selector: "button" }));

    expect(mockOnAssignBlame).toHaveBeenCalledOnce();
  });
});
