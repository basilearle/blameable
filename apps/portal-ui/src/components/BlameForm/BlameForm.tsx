import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import type {ReactNode} from "react";


export type BlameFormProps = {
  isPending: boolean;
  showDeclineBlameButton: boolean;
  onAssignBlame: () => void;
  title: string | ReactNode;
  description: string | ReactNode;
  assignButtonLabel: string | ReactNode;
  declineButtonLabel: string | ReactNode;
};

export function BlameForm({
  isPending,
  onAssignBlame,
  showDeclineBlameButton,
  title,
  description,
  assignButtonLabel,
  declineButtonLabel,
}: BlameFormProps) {

  return (
    <div>
      <img
        src="/blame-basil-portrait.webp"
        alt=""
        style={{
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <Heading my="2" size="7">{title}</Heading>

      <Text as="p">{description}</Text>

      <Flex mt="4" direction="column" gap="4">
        <Button
          size="3"
          loading={isPending}
          onClick={onAssignBlame}
        >
          {assignButtonLabel}
        </Button>
        {
          showDeclineBlameButton &&
          <Button
            size="3"
            variant="outline"
            loading={isPending}
            onClick={onAssignBlame}
          >
            {declineButtonLabel}
          </Button>
        }
      </Flex>
    </div>
  );
}

export default BlameForm;
