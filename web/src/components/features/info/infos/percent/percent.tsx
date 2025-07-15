import { FC } from "react";
import "./percent.scss";
import InfoBase from "../infoBase/infoBase";
import type { infoProps } from "../infoBase/infoBase";
import { themeProps } from "../../../../app";

const Percent: FC<
  infoProps & { value: number; theme: themeProps; color?: string }
> = ({ title, value, color, theme }) => {
  return (
    <InfoBase
      title={title}
      content={
        <div id='percent-container'>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                className={`percent-box ${
                  i >= Math.round(value / 10) ? "blurred" : ""
                }`}
                style={{
                  background: `${color ?? theme.info.colors.primary}`,
                }}
                key={i}
              ></div>
            );
          })}
        </div>
      }
    />
  );
};

export default Percent;
