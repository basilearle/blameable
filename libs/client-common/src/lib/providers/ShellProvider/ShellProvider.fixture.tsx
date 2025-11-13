import type { PropsWithChildren } from "react";
import type { StateCreator } from "zustand/vanilla";

import { ShellProvider } from "./ShellProvider";
import type { ExtendedState } from "../../store";

export type ShellProviderFixtureProps<T extends object = object> = PropsWithChildren & {
  defaultStoreProps?: Partial<ExtendedState<T>>;
  slices?: StateCreator<ExtendedState<T>, [], [], T>[];
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

export function ShellProviderFixture<T extends object = object>({
  children,
  defaultStoreProps,
  slices,
}: ShellProviderFixtureProps<T>) {
  const mockStoreProps: Partial<ExtendedState<T>> = {
    currentLocale: 'en-CA',
    localeOptions: ['en-CA', 'fr-CA'],
    tokens: DEFAULT_MOCK_TOKENS,
    handleLocaleChange: async () => {
      console.log('handleLocaleChange: changing locale');
    },
    ...defaultStoreProps,
  } as Partial<ExtendedState<T>>;

  return (
    <ShellProvider defaultStoreProps={mockStoreProps} slices={slices}>
      {children}
    </ShellProvider>
  );
}
