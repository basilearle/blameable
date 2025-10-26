import type { PropsWithChildren } from "react";

import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TokenProvider } from "./TokenProvider";
import type { BaseState } from "../../store";

export type ShellProviderProps = PropsWithChildren & {
  defaultStoreProps?: Partial<BaseState>;
};

export function ShellProvider({
  children,
  defaultStoreProps,
}: ShellProviderProps) {

  return (
    <StoreProvider defaultStoreProps={defaultStoreProps}>
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
