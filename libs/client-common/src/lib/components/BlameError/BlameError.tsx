import {Box, Button, Card, Flex, Heading, Text} from "@radix-ui/themes";

import { CenteredLayout } from '../../layouts';

export type BlameErrorProps = {
  title?: string;
  description?: string;
  code?: string;
};

export function BlameError({
  title = 'Uh Oh! Blame is not working...',
  description = 'Don\'t worry! Exponential Blame will soon be assigned...',
  code = 'code: generic',
}: BlameErrorProps) {

  const onRetry = () => {
    // probably a crude implementation, but it works for now
    window.location.reload();
  };

  return (
    <CenteredLayout>
      <Box width="460px">
        <Card size="3">
          <Heading mb="4">{title}</Heading>

          <Text as="p">{description}</Text>

          <Flex mt="6" justify="between" align="center">
            <Text as="p" color="gray" style={{ opacity: '.8' }}>{code}</Text>
            <Button variant="ghost" onClick={onRetry}>try again</Button>
          </Flex>
        </Card>
      </Box>
    </CenteredLayout>
  );
}

export default BlameError;
