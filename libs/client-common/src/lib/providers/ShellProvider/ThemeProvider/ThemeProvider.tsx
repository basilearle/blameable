import { Theme, ThemeProps } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

import { useBaseStore } from '../../../store';

export type ThemeProviderProps = PropsWithChildren & {
  defaultAppearance?: ThemeProps['appearance'];
};

export function ThemeProvider({
  children,
  defaultAppearance = 'dark',
}: ThemeProviderProps) {
  const theme = useBaseStore((state) => state.theme) satisfies ThemeProps;

  if (!theme.appearance) {
    theme.appearance = defaultAppearance;
  }

  return (
    <Theme {...theme}>
      {children}
    </Theme>
  );
}

export default ThemeProvider;
