import { FC } from "react";
import "./image.scss";
import InfoBase from "../infoBase/infoBase";
import type { infoProps } from "../infoBase/infoBase";
import formatString from "../../../../../utils/formatString";

const Image: FC<infoProps & { value: string | number }> = ({
  title,
  value,
}) => {
  return (
    <div id='img-container'>
      <h1 id='img-title'>{formatString(title)}</h1>
      <img src={String(value)} id='img' />
    </div>
  );
};

export default Image;
