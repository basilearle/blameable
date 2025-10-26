import { useBaseStore } from "@blameable/client-common";
import { Box, Card } from "@radix-ui/themes";
import { FormattedMessage } from "react-intl";

import { BlameForm } from "../../components/BlameForm";

export function BlameAssignment() {
  const blameCount = useBaseStore((state) => state.blameCount);
  const isBlamePending = useBaseStore((state) => state.isBlamePending);
  const onAssignBlame = useBaseStore((state) => state.onAssignBlame);

  const showDeclineBlameButton = blameCount === 0;

  const onAssignBlameHandler = async () => {
    await onAssignBlame();
  };

  return (
    <Box m="4" maxWidth="420px">
      <Card size="2">
        <BlameForm
          onAssignBlame={onAssignBlameHandler}
          isPending={isBlamePending}
          showDeclineBlameButton={showDeclineBlameButton}
          title={<FormattedMessage id="blame-form.title" />}
          description={<FormattedMessage id="blame-form.description" />}
          assignButtonLabel={<FormattedMessage id="blame-form.assign-button-label" />}
          declineButtonLabel={<FormattedMessage id="blame-form.decline-button-label" />}
        />
      </Card>
    </Box>
  );
}

export default BlameAssignment;
