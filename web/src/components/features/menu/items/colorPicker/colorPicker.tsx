import { FC, useState, useEffect, useRef } from "react";
import BaseItem from "../baseItem/baseItem";

import { fetchNui } from "../../../../../utils/fetchNui";
import "./colorPicker.scss";

interface colorPickerProps {
  label?: string;
  itemId?: string;
  value?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;
}

const ColorPicker: FC<colorPickerProps> = (data) => {
  const [value, setValue] = useState<string>(data.value ?? "grey");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const pickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMessage = (e: any) => {
      let event = e.data;
      if (
        event.type === "colorPicker:focus" &&
        event.data.itemId === data.itemId
      ) {
        fetchNui("menu:colorPicker:manageFocus", { state: !isFocused });
        if (!isFocused) {
          pickerRef.current?.click();
        } else {
          fetchNui("menu:useItem", {
            type: "colorPicker",
            itemId: data.itemId,
            value: value,
          });
        }
        setIsFocused(!isFocused);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [data.itemId, isFocused, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFocused &&
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        fetchNui("menu:colorPicker:manageFocus", { state: false });
        fetchNui("menu:useItem", {
          type: "colorpicker",
          itemId: data.itemId,
          value: value,
        });
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFocused, data.itemId, value]);

  return (
    <BaseItem
      {...data}
      rightComponent={
        <div className="color-container">
          <input
            ref={pickerRef}
            className="color"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="color"
          />
        </div>
      }
    />
  );
};

export default ColorPicker;
