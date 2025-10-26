import { type PropsWithChildren, useRef} from "react";

import {
  type BaseState,
  type BaseStore,
  BaseStoreContext,
  createBaseStore
} from "../../../store";

export type StoreProviderProps = PropsWithChildren & {
  defaultStoreProps?: Partial<BaseState>;
};

export function StoreProvider({
  children,
  defaultStoreProps,
}: StoreProviderProps) {
  const storeRef = useRef<BaseStore>(null);

  if (!storeRef.current) {
    storeRef.current = createBaseStore(defaultStoreProps);
  }

  return (
    <BaseStoreContext.Provider value={storeRef.current}>
      {children}
    </BaseStoreContext.Provider>
  );
}

export default StoreProvider;
