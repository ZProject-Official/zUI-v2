import { FC, useState, useEffect, useRef } from "react";
import BaseItem from "../baseItem/baseItem";

import "./textArea.scss";
import { fetchNui } from "../../../../../utils/fetchNui";

interface textAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  itemId?: string;
  isSelected?: boolean;
}

const TextArea: FC<textAreaProps> = (data) => {
  const [value, setValue] = useState<string>(data.value || "");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const areaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMessage = (e: any) => {
      let event = e.data;
      if (
        event.type === "textArea:focus" &&
        event.data.itemId === data.itemId
      ) {
        let newState = !isFocused;
        setIsFocused(newState);
        fetchNui("menu:textArea:manageFocus", { state: newState });
        if (newState) {
          areaRef.current?.focus();
        } else {
          areaRef.current?.blur();
          fetchNui("menu:useItem", {
            type: "textarea",
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
    <BaseItem
      {...data}
      rightComponent={
        <div className='text-area'>
          <input
            type='text'
            className='content'
            ref={areaRef}
            style={{
              opacity: `${value.length > 0 ? 1 : 0.5}`,
            }}
            value={value}
            placeholder={data.placeholder}
            onChange={(e) => setValue(e.target.value)}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      }
    />
  );
};

export default TextArea;
