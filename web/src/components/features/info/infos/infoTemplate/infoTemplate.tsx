import { FC } from "react";
import "./infoTemplate.scss";
import InfoBase from "../infoBase/infoBase";
import type { infoProps } from "../infoBase/infoBase";

const InfoTemplate: FC<infoProps & {}> = ({ title }) => {
  return <InfoBase title={title} content={<></>} />;
};

export default InfoTemplate;
