import { FC } from "react";
import "./percent.scss";
import InfoBase from "../infoBase/infoBase";
import type { infoProps } from "../infoBase/infoBase";
import { themeProps } from "../../../../app";

const percent: FC<infoProps & { percent: number; theme: themeProps }> = ({
  title,
  percent,
  theme,
}) => {
  return (
    <InfoBase
      title={title}
      content={
        <div id='percent-container'>
          {Object(10).map((i: number) => {
            return (
              <div
                className={`percent-box ${
                  i > Math.round(percent / 10) && "blurred"
                }`}
                style={{
                  background: `${theme.info.colors.primary}`,
                }}
              ></div>
            );
          })}
        </div>
      }
    />
  );
};

export default percent;
