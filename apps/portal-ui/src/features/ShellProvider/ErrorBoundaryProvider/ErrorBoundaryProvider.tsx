import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import BlameError from "../../../components/BlameError/BlameError.tsx";

export type StoreProviderProps = PropsWithChildren & {

};

export function ErrorBoundaryProvider({
  children,
}: StoreProviderProps) {

  const fallbackComponent = <BlameError />;

  return (
    <ErrorBoundary fallback={fallbackComponent}>
      {children}
    </ErrorBoundary>
  );
}
