import { Flex } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export function CenteredLayout({ children }: PropsWithChildren) {

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100dvh"
    >
      {children}
    </Flex>
  );
}
