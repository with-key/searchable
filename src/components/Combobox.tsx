import * as React from "react";
import styles from "./combobox.module.css";

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

/**
 * Item
 */
interface ItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isSelected: boolean;
  value: string;
}

export function Item({ isSelected, value, ...props }: ItemProps) {
  const id = React.useId();

  return (
    <li
      {...props}
      id={`option${id}`}
      role="option"
      className={styles.item}
      data-state={isSelected ? "selected" : "none"}
    >
      {value}
    </li>
  );
}

/**
 * Input
 */
export function Input() {
  return <></>;
}

export const Combobox = { Root, Item };
