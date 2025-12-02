import type { StateCreator } from "zustand/vanilla";

import type { BaseState } from "../store";

export type ThemeSlice = {
  theme: Record<string, string>;
};

export const createThemeSlice: StateCreator<
  BaseState,
  [],
  [],
  ThemeSlice
> = () => ({
  theme: {},
});
