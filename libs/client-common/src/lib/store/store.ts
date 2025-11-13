import { devtools } from "zustand/middleware";
import { createStore, type StateCreator } from "zustand/vanilla";

import { createTokenSlice, type TokensSlice } from "./tokens/tokens.slice";

export type BaseState = TokensSlice;
export type BaseStore<T extends object = object> = ReturnType<typeof createBaseStore<T>>;
export type ExtendedState<T extends object = object> = BaseState & T;

export const createBaseStore = <T extends object = object>(
  initProps?: Partial<ExtendedState<T>>,
  additionalSlices?: StateCreator<ExtendedState<T>, [], [], T>[]
) => {
  return createStore<ExtendedState<T>>()(
    devtools(
      (...a) => ({
        ...createTokenSlice(...a),
        ...(additionalSlices?.reduce(
          (acc, slice) => ({
            ...acc,
            ...slice(...a),
          }),
          {},
        )),
        ...initProps,
      })
    )
  );
};
