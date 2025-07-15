import { FC } from "react";
import BaseItem from "../baseItem/baseItem";

import "./linkButton.scss";

interface linkButtonProps {
  label?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;
}

const LinkButton: FC<linkButtonProps> = (data) => {
  return (
    <BaseItem
      {...data}
      rightComponent={
        <>
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1H13C14.0609 1 15.0783 1.42143 15.8284 2.17157C16.5786 2.92172 17 3.9391 17 5C17 6.0609 16.5786 7.0783 15.8284 7.8284C15.0783 8.5786 14.0609 9 13 9H12M6 9H5C3.93913 9 2.92172 8.5786 2.17157 7.8284C1.42143 7.0783 1 6.0609 1 5C1 3.9391 1.42143 2.92172 2.17157 2.17157C2.92172 1.42143 3.93913 1 5 1H6M6 5H12"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </>
      }
    />
  );
};

export default LinkButton;
