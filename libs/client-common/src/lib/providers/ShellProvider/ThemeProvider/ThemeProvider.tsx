import { Theme } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

  // enums reflect the acceptable values of the Radix Theme appearance prop
export type ThemeProviderAppearance = 'dark' | 'inherit' | 'light';

export type ThemeProviderProps = PropsWithChildren & {
  defaultAppearance?: ThemeProviderAppearance;
};

export function ThemeProvider({
  children,
  defaultAppearance = 'dark',
}: ThemeProviderProps) {

  return (
    <Theme appearance={defaultAppearance}>
      {children}
    </Theme>
  );
}

export default ThemeProvider;
