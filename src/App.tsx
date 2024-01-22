import { LiHTMLAttributes, useEffect, useId, useRef, useState } from "react";
import "./item.css";

interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {}
function Item(props: ItemProps) {
  const id = useId();
  return (
    <li {...props} id={`option${id}`} role="option" className="SelectItem">
      옵션 {id}
    </li>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState("");

  const activedescendantId = useRef<string>();

  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setCursorIndex((prev) => prev + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursorIndex((prev) => prev - 1);
    } else if (event.key === "Enter") {
      if (listRef.current) {
        const arr = [...listRef.current.children];
        const text =
          arr[cursorIndex % listRef.current.childElementCount].textContent;

        setValue(text || "");
      }
    }
  };

  const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log(event);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (listRef.current) {
      const childArr = [...listRef.current.children];
      childArr.map((child, index, me) => {
        if (cursorIndex === -1) {
          child.className = `li data-state=none`;
        } else if (index === cursorIndex % me.length) {
          child.className = `li data-state=selected`;
          activedescendantId.current = child.id;
        } else {
          child.className = `li data-state=none`;
        }
      });
    }
  }, [cursorIndex]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeydown}
        role="combobox"
        aria-activedescendant={activedescendantId.current || ""}
        value={value}
        onChange={(event) => {
          const { value } = event.target;
          setValue(value);
        }}
      />
      <button
        onClick={(e) => {
          handleClickButton(e);
          inputRef.current?.focus();
        }}
      >
        open
      </button>
      {open ? (
        <ul ref={listRef}>
          {[1, 2, 3, 4].map((option) => {
            return <Item key={option} />;
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default App;
