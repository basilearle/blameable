import type { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";

import { useBaseStore } from "../../../store";

export type TokenProviderProps = PropsWithChildren & {
  defaultLocale?: string;
  defaultTokens?: Record<string, string>;
};

export function TokenProvider({
  children,
  defaultLocale = 'en-CA',
  defaultTokens = {},
}: TokenProviderProps) {
  const currentLocale = useBaseStore((state) => state.currentLocale ?? defaultLocale);
  const currentTokens = useBaseStore((state) => state.tokens ?? defaultTokens);

  return (
    <IntlProvider
      locale={currentLocale}
      messages={currentTokens}
    >
      {children}
    </IntlProvider>
  );
}

export default TokenProvider;
