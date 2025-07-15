import { FC } from "react";
import "./text.scss";
import InfoBase from "../infoBase/infoBase";
import type { infoProps } from "../infoBase/infoBase";
import formatString from "../../../../../utils/formatString";

const Text: FC<infoProps & { value: string | number }> = ({ title, value }) => {
  return (
    <InfoBase
      title={title}
      content={<h1 id='text-value'>{formatString(String(value))}</h1>}
    />
  );
};

export default Text;
