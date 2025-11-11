import type { StateCreator } from "zustand/vanilla";

import { getClientTokensByLocale } from '@blameable/client-codegen/core-api';

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
    const { data, error } = await getClientTokensByLocale({
      path: {
        locale,
      },
    });

    if (!data || error) return;

    set((state) => ({
      ...state,
      currentLocale: locale,
      tokens: data.tokens,
    }));
  },
});
