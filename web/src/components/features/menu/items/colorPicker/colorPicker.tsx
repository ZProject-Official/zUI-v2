import { FC, useState, useEffect, useRef } from "react";
import BaseItem from "../baseItem/baseItem";

import { fetchNui } from "../../../../../utils/fetchNui";
import "./colorpicker.scss";

interface colorpickerProps {
  label?: string;
  itemId?: string;
  value?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;
}

const colorpicker: FC<colorpickerProps> = (data) => {
  const [value, setValue] = useState<string>(data.value ?? "grey");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const pickerRef = useRef<HTMLInputElement>(null);

  const hasAppliedRef = useRef(false);

  useEffect(() => {
    const handleMessage = (e: any) => {
      const event = e.data;
      if (event.type === "colorpicker:focus" && event.data.itemId === data.itemId) {
        const nextState = !isFocused;
        fetchNui("menu:colorpicker:manageFocus", { state: nextState });

        if (!isFocused) {
          hasAppliedRef.current = false;
          pickerRef.current?.click();
        } else {
          if (!hasAppliedRef.current) {
            hasAppliedRef.current = true;
            fetchNui("menu:useItem", {
              type: "colorpicker",
              itemId: data.itemId,
              value: value,
            });
          }
        }

        setIsFocused(nextState);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [data.itemId, isFocused, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFocused && pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        fetchNui("menu:colorpicker:manageFocus", { state: false });
        if (!hasAppliedRef.current) {
          hasAppliedRef.current = true;
          fetchNui("menu:useItem", {
            type: "colorpicker",
            itemId: data.itemId,
            value: value,
          });
        }
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFocused, data.itemId, value]);

  useEffect(() => {
    const input = pickerRef.current;
    if (!input) return;

    const onChange = (e: Event) => {
      const newVal = (e.target as HTMLInputElement).value;
      setValue(newVal);
      if (!hasAppliedRef.current) {
        pickerRef.current?.blur();
        hasAppliedRef.current = true;
        fetchNui("menu:useItem", {
          type: "colorpicker",
          itemId: data.itemId,
          value: newVal,
        });
        fetchNui("menu:colorpicker:manageFocus", { state: false });
        setIsFocused(false);
      }
    };

    const onBlur = () => {
      setTimeout(() => {
        if (!hasAppliedRef.current) {
          const currentVal = input.value;
          hasAppliedRef.current = true;
          fetchNui("menu:useItem", {
            type: "colorpicker",
            itemId: data.itemId,
            value: currentVal,
          });
          fetchNui("menu:colorpicker:manageFocus", { state: false });
          setIsFocused(false);
        }
      }, 0);
    };

    input.addEventListener("change", onChange);
    input.addEventListener("blur", onBlur);

    return () => {
      input.removeEventListener("change", onChange);
      input.removeEventListener("blur", onBlur);
    };
  }, [data.itemId]);

  return (
    <BaseItem
      {...data}
      rightComponent={
        <div className="color-container">
          <input ref={pickerRef} className="color" value={value} onChange={(e) => setValue(e.target.value)} type="color" />
        </div>
      }
    />
  );
};

export default colorpicker;
