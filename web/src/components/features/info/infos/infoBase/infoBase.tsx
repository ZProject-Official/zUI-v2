import { FC, ReactNode } from "react";
import formatString from "../../../../../utils/formatString";

import "./infoBase.scss";

export interface infoProps {
  title: string;
  content?: ReactNode;
}

const InfoBase: FC<infoProps> = ({ title, content }) => {
  return (
    <div id='info-base'>
      <h1 id='info-title'>{formatString(title)}</h1>
      <div id='info-content'>{content}</div>
    </div>
  );
};

export default InfoBase;
