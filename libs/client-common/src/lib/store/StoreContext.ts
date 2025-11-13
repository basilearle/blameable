import { createContext, useContext } from "react";
import { useStore } from "zustand/react";

import type { ExtendedState, BaseStore } from "./store";

export const BaseStoreContext = createContext<BaseStore | null>(null);

export function useBaseStore<T>(
  selector: (state: ExtendedState) => T
): T {
  const store = useContext(BaseStoreContext);

  if (!store) {
    throw new Error('Missing BaseStoreContext.Provider in the tree');
  }

  return useStore(store, selector);
}
