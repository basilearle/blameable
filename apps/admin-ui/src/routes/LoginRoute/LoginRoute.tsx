import {
  Box,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { authClient } from '../../auth';

export type LoginRouteForm = {
  email: string;
  password: string;
};

export function LoginRoute() {
  const { register, handleSubmit, formState } = useForm<LoginRouteForm>();

  const handleLoginSubmit = async (payload: LoginRouteForm) => {
    await authClient.signIn.email(payload);
  };

  return (
    <Box m="4" minWidth="368px" maxWidth="420px">
      <Card size="2">
        <Heading as="h2" my="2" size="6">Blameable Login</Heading>

        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Box pt="3">
            <Text as="label">email</Text>
            <TextField.Root
              my="2"
              size="3"
              placeholder="cooldude@blameable.me"
              {...register('email', {
                required: true,
                pattern: /^[^@]+@[^@]+\.[^@]+$/i
              })}
            />

            {formState.errors.email && (
              <Text color="red">BAD EMAIl.</Text>
            )}
          </Box>

          <Box pt="3">
            <Text as="label">password</Text>
            <TextField.Root
              my="2"
              size="3"
              placeholder="password"
              type="password"
              {...register('password', {
                minLength: 8,
              })}
            />

            {formState.errors.password && (
              <Text color="red">BAD PASSWORD.</Text>
            )}
          </Box>

          <Flex pt="4" pb="2" direction="column" gap="4">
            <Button size="3">login</Button>
            <Link to="/forgot-password">forgot your password?</Link>
          </Flex>
        </form>
      </Card>
    </Box>
  );
}

export default LoginRoute;
