import { FC } from "react";
import BaseItem from "../baseItem/baseItem";

import "./template.scss";

interface templateProps {
  label?: string;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;
}

const Template: FC<templateProps> = (data) => {
  return <BaseItem {...data} rightComponent={<></>} />;
};

export default Template;
