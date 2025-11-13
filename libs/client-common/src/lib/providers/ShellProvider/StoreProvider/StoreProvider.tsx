import { type PropsWithChildren, useRef} from "react";
import type { StateCreator } from "zustand/vanilla";

import {
  type ExtendedState,
  type BaseStore,
  BaseStoreContext,
  createBaseStore
} from "../../../store";

export type StoreProviderProps<T extends object = object> = PropsWithChildren & {
  defaultStoreProps?: Partial<ExtendedState<T>>;
  slices?: StateCreator<ExtendedState<T>, [], [], T>[];
};

export function StoreProvider<T extends object = object>({
  children,
  defaultStoreProps,
  slices,
}: StoreProviderProps<T>) {
  const storeRef = useRef<BaseStore<T>>(null);

  if (!storeRef.current) {
    storeRef.current = createBaseStore<T>(defaultStoreProps, slices);
  }

  return (
    <BaseStoreContext.Provider value={storeRef.current}>
      {children}
    </BaseStoreContext.Provider>
  );
}

export default StoreProvider;
