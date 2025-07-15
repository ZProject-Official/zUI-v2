import { FC } from "react";
import BaseItem from "../baseItem/baseItem";
import { AnimatedNumberSlot } from "./animatedNumberSlot/animatedNumberSlot";

import "./slider.scss";
import { color } from "framer-motion";

interface sliderProps {
  label?: string;
  percentage?: number;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
    ShowPercentage?: boolean;
  };
  isSelected?: boolean;

  color?: string;
}

const Slider: FC<sliderProps> = (data) => {
  return (
    <BaseItem
      {...data}
      rightComponent={
        <div className="slider-container">
          {data.styles?.ShowPercentage && (
            <AnimatedNumberSlot value={data.percentage ?? 0} />
          )}
          <div className="percentage-bar">
            <div
              style={{
                background: `${data.color ?? "white"}`,
                height: "100%",
                borderRadius: "100em",
                width: `${data.percentage}%`,
                transition: "0.5s",
              }}
            ></div>
          </div>
        </div>
      }
    />
  );
};

export default Slider;
