import {render} from "@testing-library/react";

import BlameError from "./BlameError";

describe('<BlameError />', () => {

  it('should renders successfully', () => {
    const { baseElement } = render(
      <BlameError />
    );

    expect(baseElement).toBeInTheDocument();
  });

});
