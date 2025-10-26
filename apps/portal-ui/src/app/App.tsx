import { Flex } from "@radix-ui/themes";

import { BlameAssignment } from "../features/BlameAssignment";
import { BlameHeader } from "../features/BlameHeader";

export function App() {

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
    >
      <BlameHeader />
      <BlameAssignment />
    </Flex>
  );
}

export default App;

