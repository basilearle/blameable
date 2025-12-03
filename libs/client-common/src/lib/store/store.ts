import { devtools } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { type BlameSlice, createBlameSlice } from "./blame/blame.slice";
import { createThemeSlice, ThemeSlice } from './theme/theme.slice';
import { createTokenSlice, type TokensSlice } from "./tokens/tokens.slice";

export type BaseState = BlameSlice & TokensSlice & ThemeSlice;

export type BaseStore = ReturnType<typeof createBaseStore>

export const createBaseStore = (initProps?: Partial<BaseState>) => {
  return createStore<BaseState>()(
    devtools(
      (...a) => ({
        ...createBlameSlice(...a),
        ...createThemeSlice(...a),
        ...createTokenSlice(...a),
        ...initProps,
      })
    )
  );
};
