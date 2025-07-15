import { FC } from "react";

import "./separator.scss";
import formatString from "../../../../../utils/formatString";

interface separatorProps {
  label?: string;
  position?: "left" | "center" | "right";
}

const positions = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const Separator: FC<separatorProps> = ({ label, position }) => {
  return (
    <div
      className="separator-container"
      style={{
        alignItems: `${position ? positions[position] : "center"}`,
      }}
    >
      {formatString(label || "")}
    </div>
  );
};

export default Separator;
