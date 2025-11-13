import type { PropsWithChildren } from "react";
import type { StateCreator } from "zustand/vanilla";

import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TokenProvider } from "./TokenProvider";
import type { ExtendedState } from "../../store";

export type ShellProviderProps<T extends object = object> = PropsWithChildren & {
  defaultStoreProps?: Partial<ExtendedState<T>>;
  slices?: StateCreator<ExtendedState<T>, [], [], T>[];
};

export function ShellProvider<T extends object = object>({
  children,
  defaultStoreProps,
  slices,
}: ShellProviderProps<T>) {

  return (
    <StoreProvider defaultStoreProps={defaultStoreProps} slices={slices}>
      <ThemeProvider>
        <TokenProvider>
          <ErrorBoundaryProvider>
            {children}
          </ErrorBoundaryProvider>
        </TokenProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
