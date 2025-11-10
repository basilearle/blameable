import { render } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('<LoginForm />', () => {

  it('should renders successfully', () => {
    const { baseElement, getByText } = render(

      <LoginForm
        formTitle="Blameable Login"
        emailLabel="email"
        emailPlaceholder="cool@blameable.me"
        emailError="please enter a valid email."
        passwordLabel="password"
        passwordPlaceholder="p@55w0rd"
        passwordError="please enter a valid password."
        submitButtonLabel="log me in."
        forgotPasswordLabel="forgot your password?"
        onFormSubmit={vi.fn()}
      />
    );

    expect(baseElement).toBeInTheDocument();

    expect(getByText(/Blameable Login/i)).toBeInTheDocument();
  });
});
