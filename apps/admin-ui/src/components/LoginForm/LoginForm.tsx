import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useForm } from 'react-hook-form';

export type LoginFormProps = {
  formTitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailError: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordError: string;
  submitButtonLabel: string;
  forgotPasswordLabel: string;
  initialValues?: Partial<LoginFormPayload>;
  onFormSubmit: (payload: LoginFormPayload) => void;
};

export type LoginFormPayload = {
  email: string;
  password: string;
};

export function LoginForm({
  formTitle,
  emailLabel,
  emailPlaceholder,
  emailError,
  passwordLabel,
  passwordPlaceholder,
  passwordError,
  submitButtonLabel,
  forgotPasswordLabel,
  onFormSubmit,
  initialValues = {},
}: LoginFormProps) {
  const { register, handleSubmit, formState } = useForm<LoginFormPayload>({
    defaultValues: initialValues,
  });

  return (
    <Box m="4" minWidth="368px" maxWidth="420px">
      <Card size="2">
        <Heading as="h2" my="2" size="6">
          {formTitle}
        </Heading>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box pt="3">
            <Text as="label">{emailLabel}</Text>
            <TextField.Root
              my="2"
              size="3"
              type="email"
              placeholder={emailPlaceholder}
              {...register('email', {
                required: true,
                pattern: /^[^@]+@[^@]+\.[^@]+$/i,
              })}
            />

            {formState.errors.email && <Text color="red">{emailError}</Text>}
          </Box>

          <Box pt="3">
            <Text as="label">{passwordLabel}</Text>
            <TextField.Root
              my="2"
              size="3"
              placeholder={passwordPlaceholder}
              type="password"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />

            {formState.errors.password && (
              <Text color="red">{passwordError}</Text>
            )}
          </Box>

          <Flex pt="4" pb="2" direction="column" gap="4">
            <Button size="3">{submitButtonLabel}</Button>
            <Link href="/forgot-password">{forgotPasswordLabel}</Link>
          </Flex>
        </form>
      </Card>
    </Box>
  );
}

export default LoginForm;
