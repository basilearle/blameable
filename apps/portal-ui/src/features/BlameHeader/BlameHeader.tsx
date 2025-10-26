import { Flex, Heading, Select } from "@radix-ui/themes";
import { FormattedMessage } from "react-intl";

import {useBaseStore} from "../../store";

export function BlameHeader() {
  const currentLocale = useBaseStore((state) => state.currentLocale);
  const localeOptions = useBaseStore((state) => state.localeOptions);
  const handleLocaleChange = useBaseStore((state) => state.handleLocaleChange);

  const languageSelect = (
    <Select.Root
      value={currentLocale}
      onValueChange={handleLocaleChange}
    >
      <Select.Trigger />
      <Select.Content>
        {localeOptions.map((locale) => (
          <Select.Item key={locale} value={locale}>
            <FormattedMessage id={`global.locale.${locale}`} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );

  return (
    <Flex
      p="3"
      width="100%"
      justify="between"
      align="center"
    >
      <Heading style={{ maxWidth: 120 }}>
        <FormattedMessage id="blame-header.title" />
      </Heading>
      {languageSelect}
    </Flex>
  );
}

export default BlameHeader;
