import type { PropsWithChildren } from "react";

import { ShellProvider } from "./ShellProvider";
import type { BaseState } from "../../store";


export type ShellProviderFixtureProps = PropsWithChildren & {
  defaultStoreProps?: Partial<BaseState>;
};

const DEFAULT_MOCK_TOKENS: Record<string, string> = {
  "blame-form.title": "Test Blame Title",
  "blame-form.description": "Test Blame Description",
  "blame-form.assign-button-label": "Assign Blame",
  "blame-form.decline-button-label": "Decline Blame",
  "blame-header.title": "By Popular Demand.",
  "global.locale.en-CA": "English",
  "global.locale.fr-CA": "French",
  "global.locale.es-MX": "Spanish",
};

export function ShellProviderFixture({
  children,
  defaultStoreProps,
}: ShellProviderFixtureProps) {
  const mockStoreProps: Partial<BaseState> = {
    blameCount: 0,
    isBlamePending: false,
    currentLocale: 'en-CA',
    localeOptions: ['en-CA', 'fr-CA'],
    tokens: DEFAULT_MOCK_TOKENS,
    onAssignBlame: async () => {},
    handleLocaleChange: async () => {},
    ...defaultStoreProps,
  };

  return (
    <ShellProvider defaultStoreProps={mockStoreProps}>
      {children}
    </ShellProvider>
  );
}
