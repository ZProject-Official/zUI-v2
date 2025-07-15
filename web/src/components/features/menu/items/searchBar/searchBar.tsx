import { FC, useState, useEffect, useRef } from "react";
import { fetchNui } from "../../../../../utils/fetchNui";

import "./searchBar.scss";

interface searchBarProps {
  value?: string;
  placeholder?: string;
  isSelected?: boolean;
  itemId?: string;
}

const SearchBar: FC<searchBarProps> = (data) => {
  const [value, setValue] = useState<string>(data.value || "");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const areaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMessage = (e: any) => {
      let event = e.data;
      if (
        event.type === "searchBar:focus" &&
        event.data.itemId === data.itemId
      ) {
        let newState = !isFocused;
        setIsFocused(newState);
        fetchNui("menu:searchBar:manageFocus", { state: newState });
        if (newState) {
          areaRef.current?.focus();
        } else {
          areaRef.current?.blur();
          fetchNui("menu:useItem", {
            type: "searchbar",
            itemId: data.itemId,
            value: value,
          });
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [data.itemId, isFocused, value]);

  return (
    <div className={`search-bar-container ${data.isSelected && "selected"}`}>
      <input
        type='text'
        ref={areaRef}
        className='search-bar'
        onMouseDown={(e) => e.preventDefault()}
        onChange={(e) => setValue(e.target.value)}
        placeholder={data.placeholder}
        value={value}
      />
      <svg
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M13.5 13.5L21 21M15.5 8.5C15.5 12.366 12.366 15.5 8.5 15.5C4.63401 15.5 1.5 12.366 1.5 8.5C1.5 4.63401 4.63401 1.5 8.5 1.5C12.366 1.5 15.5 4.63401 15.5 8.5Z'
          stroke='white'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </div>
  );
};

export default SearchBar;
