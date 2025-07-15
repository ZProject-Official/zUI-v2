import { FC, ReactNode } from "react";
import isUrl from "../../../../../utils/isUrl";
import formatString from "../../../../../utils/formatString";

import "./baseItem.scss";

interface BaseItemProps {
  label?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  rightComponent: ReactNode;
  isSelected?: boolean;
}

const BaseItem: FC<BaseItemProps> = ({
  label,
  styles,
  isSelected,
  rightComponent,
}) => {
  return (
    <div
      className={`base-item ${isSelected && !styles?.IsDisabled && "selected"}`}
    >
      <div className="left">
        {styles?.LeftBadge && isUrl(styles.LeftBadge) && (
          <img className="badge" src={styles.LeftBadge} alt="left-badge" />
        )}
        <div className="label">{formatString(label || "")}</div>
      </div>
      <div className="right">
        {rightComponent}
        {styles?.IsDisabled && (
          <svg
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.681818 15H9.77272C10.1493 15 10.4545 14.6947 10.4545 14.3182V6.59091C10.4545 6.21437 10.1493 5.9091 9.77272 5.9091H9.09092V3.86364C9.09092 1.73323 7.35769 0 5.22727 0C3.09686 0 1.36364 1.73323 1.36364 3.86364V5.9091H0.681818C0.305273 5.9091 0 6.21437 0 6.59091V14.3182C0 14.6947 0.305273 15 0.681818 15ZM5.9091 10.6812V11.5909C5.9091 11.9675 5.60381 12.2727 5.22727 12.2727C4.85073 12.2727 4.54545 11.9675 4.54545 11.5909V10.6812C4.26963 10.4737 4.09091 10.1437 4.09091 9.77273C4.09091 9.14614 4.60068 8.63636 5.22727 8.63636C5.85386 8.63636 6.36363 9.14614 6.36363 9.77273C6.36363 10.1437 6.18491 10.4737 5.9091 10.6812ZM2.72728 3.86364C2.72728 2.48514 3.84877 1.36364 5.22727 1.36364C6.60577 1.36364 7.72727 2.48514 7.72727 3.86364V5.9091H2.72728V3.86364Z"
              fill="white"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default BaseItem;
