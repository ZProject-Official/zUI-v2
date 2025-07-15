import { FC } from "react";
import BaseItem from "../baseItem/baseItem";

import "./checkbox.scss";

interface checkboxProps {
  label?: string;
  state: boolean;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;

  color?: string;
}

const Checkbox: FC<checkboxProps> = (data) => {
  return (
    <BaseItem
      {...data}
      rightComponent={
        <div
          className="checkbox"
          style={{
            background: `${data.state ? data.color : "rgba(17, 17, 17, 0.5)"}`,
          }}
        >
          <div
            className="box"
            style={{
              left: `${data.state ? "95%" : "5%"}`,
              transform: `translateX(-${data.state ? 100 : 0}%)`,
            }}
          ></div>
        </div>
      }
    />
  );
};

export default Checkbox;
