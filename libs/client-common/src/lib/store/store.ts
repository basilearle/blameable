import { devtools } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { type BlameSlice, createBlameSlice } from "./blame/blame.slice";
import { createTokenSlice, type TokensSlice } from "./tokens/tokens.slice";

export type BaseState = BlameSlice & TokensSlice;

export type BaseStore = ReturnType<typeof createBaseStore>

export const createBaseStore = (initProps?: Partial<BaseState>) => {
  return createStore<BaseState>()(
    devtools(
      (...a) => ({
        ...createBlameSlice(...a),
        ...createTokenSlice(...a),
        ...initProps,
      })
    )
  );
};
