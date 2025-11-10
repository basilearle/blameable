import { useNavigate } from 'react-router';

import { authClient } from '../../auth';
import { LoginForm, LoginFormPayload } from '../../components/LoginForm';

export function LoginRoute() {
  const navigate = useNavigate();

  const handleLoginSubmit = async (payload: LoginFormPayload) => {
    await authClient.signIn.email(payload);

    navigate('/dashboard', { replace: true });
  };

  return (
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
      onFormSubmit={handleLoginSubmit}
    />
  );
}

export default LoginRoute;
