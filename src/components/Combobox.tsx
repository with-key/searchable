import * as React from "react";
/**
 * context
 */

type ComboboxContextValue = {
  //
};
const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

/**
 * Root
 */
interface ComboboxProps {
  children: React.ReactNode;
}
export const Root = ({ children }: ComboboxProps) => {
  return (
    <ComboboxContext.Provider value={null}>{children}</ComboboxContext.Provider>
  );
};

export const Combobox = { Root };
