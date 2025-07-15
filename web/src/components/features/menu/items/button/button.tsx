import { FC } from "react";
import BaseItem from "../baseItem/baseItem";
import isUrl from "../../../../../utils/isUrl";

import "./button.scss";
import formatString from "../../../../../utils/formatString";

interface buttonProps {
  label?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
    RightLabel?: string;
    RightBadge?: string;
  };
  isSelected?: boolean;
}

const Button: FC<buttonProps> = (data) => {
  return (
    <BaseItem
      {...data}
      label={data.label || ""}
      rightComponent={
        <>
          {data.styles?.RightLabel && data.styles.RightLabel.length > 0 && (
            <h1 className="right-label">
              {formatString(data.styles.RightLabel)}
            </h1>
          )}{" "}
          {data.styles?.RightBadge && isUrl(data.styles.RightBadge) && (
            <img
              className="badge"
              src={data.styles.RightBadge}
              alt="right-badge"
            />
          )}
        </>
      }
    />
  );
};

export default Button;
