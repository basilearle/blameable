import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import BlameForm from "./BlameForm";

describe('<BlameForm />', () => {

  it('should renders successfully', () => {
    const { baseElement, getByText } = render(
      <BlameForm
        onAssignBlame={vitest.fn()}
        isPending={false}
        showDeclineBlameButton={true}
        title="blame them"
        description="do it"
        assignButtonLabel="blame"
        declineButtonLabel="no blame"
      />
    );

    expect(baseElement).toBeInTheDocument();

    expect(getByText(/no blame/i)).toBeInTheDocument();
  });

  it('should not display the decline blame button when `showDeclineBlameButton` is false', () => {

    const { queryByText } = render(
      <BlameForm
        onAssignBlame={vitest.fn()}
        isPending={false}
        showDeclineBlameButton={false}
        title="blame them"
        description="do it"
        assignButtonLabel="blame me"
        declineButtonLabel="no blame"
      />
    );

    expect(queryByText(/no blame/i)).not.toBeInTheDocument();
  });

  it('should call `onAssignBlame` when button is clicked', async () => {
    const user = userEvent.setup();
    const handleBlameFn = vitest.fn();

    const { getByText } = render(
      <BlameForm
        onAssignBlame={handleBlameFn}
        isPending={false}
        showDeclineBlameButton={true}
        title="blame them"
        description="do it"
        assignButtonLabel="blame me"
        declineButtonLabel="no blame"
      />
    );

    await user.click(getByText(/no blame/i, { selector: 'button' }));

    expect(handleBlameFn).toHaveBeenCalledOnce();

    await user.click(getByText(/blame me/i, { selector: 'button' }));

    expect(handleBlameFn).toHaveBeenCalledTimes(2);
  });

});
