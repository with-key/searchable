import { useEffect, useRef, useState } from "react";
import { Combobox } from "./components/Combobox";

const options = ["사과", "감자", "딸기", "배", "감", "블루베리", "돼지감자"];

function App() {
  const [open, setOpen] = useState(false);

  const [cursorIndex, setCursorIndex] = useState(0);

  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const activedescendantId = useRef<string>();

  const handleKeydownInput: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!open) {
      if (event.key === "ArrowDown") {
        return setOpen(true);
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (listRef.current) {
        if (cursorIndex + 1 === listRef.current.childElementCount) {
          return setCursorIndex(0);
        }
      }
      setCursorIndex((prev) => prev + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      if (listRef.current) {
        if (cursorIndex === 0) {
          return setCursorIndex(listRef.current.childElementCount - 1);
        }
      }
      setCursorIndex((prev) => prev - 1);
    } else if (event.key === "Enter") {
      if (listRef.current) {
        const arr = [...listRef.current.children];

        // listRef.current.childElementCount = item의 갯수

        const text = arr[cursorIndex].textContent;
        console.log(text);

        // console.log("cursorIndex", cursorIndex);
        // console.log("text", text);

        if (text) {
          setInputValue(text); // 선택
          setOpen(false); // 선택 후 닫기
        }
      }
    }
  };

  const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log(event);
    setOpen((prev) => !prev);
  };

  const filterList = (options: string[]) => {
    return options.filter((option) => option.includes(inputValue));
  };

  useEffect(() => {
    if (listRef.current) {
      const childArr = [...listRef.current.children];
      childArr.map((child, index, me) => {
        if (cursorIndex === -1) {
          // child.className = `data-state=none`;
        } else if (index === cursorIndex % me.length) {
          // child.className = `data-state=selected`;
          activedescendantId.current = child.id;
        } else {
          // child.className = `data-state=none`;
        }
      });
    }
  }, [cursorIndex]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeydownInput}
        onFocus={(e) => {
          setOpen(true);
        }}
        role="combobox"
        aria-activedescendant={activedescendantId.current || ""}
        value={inputValue}
        onChange={(event) => {
          const { value } = event.target;
          setInputValue(value);

          if (!open) {
            setOpen(true);
          }
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
          {filterList(options).map((el, index, me) => {
            return (
              <Combobox.Item
                key={el}
                value={el}
                isSelected={index === cursorIndex % me.length}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default App;
