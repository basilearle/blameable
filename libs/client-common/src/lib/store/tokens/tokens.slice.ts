import type { StateCreator } from "zustand/vanilla";

import type { BaseState } from "../store";

export type TokensSlice = {
  currentLocale: string;
  localeOptions: string[];
  tokens: Record<string, string>;
  handleLocaleChange: (locale: string) => Promise<void>;
};

export const createTokenSlice: StateCreator<
  BaseState,
  [],
  [],
  TokensSlice
> = (set) => ({
  currentLocale: 'en-CA',
  localeOptions: [],
  tokens: {},
  handleLocaleChange: async (locale) => {
    const body = await fetch(`/api/locale/${locale}`)
      .then((res) => res.json())
      .catch(() => null);

    if (!body?.data?.tokens) return;

    set((state) => ({
      ...state,
      currentLocale: locale,
      tokens: body.data.tokens,
    }));
  },
});
