import { FC, useState, useEffect, useRef } from "react";
import BaseItem from "../baseItem/baseItem";

import "./colorsList.scss";

interface listColorProps {
  label?: string;
  itemId?: string;
  index?: number;
  colors?: string[];
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;
}

const ColorsList: FC<listColorProps> = ({
  colors = [],
  index: rawIndex = 1,
  itemId,
  ...data
}) => {
  const index = rawIndex - 1;
  const total = colors.length;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [displayedItems, setDisplayedItems] = useState<string[]>([]);
  const [externalDirection, setExternalDirection] = useState<
    "left" | "right" | null
  >(null);
  const hasMounted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getItems = (center: number) => [
    colors[(center - 1 + total) % total],
    colors[center],
    colors[(center + 1) % total],
  ];

  const getDirection = (from: number, to: number) =>
    (to - from + total) % total <= total / 2 ? "right" : "left";

  useEffect(() => {
    if (!hasMounted.current && total > 0) {
      setCurrentIndex(index);
      setDisplayedItems(getItems(index));
      hasMounted.current = true;
    }
  }, [total]);

  useEffect(() => {
    if (!hasMounted.current || total === 0 || index === currentIndex) return;

    const dir = externalDirection ?? getDirection(currentIndex, index);
    const track = containerRef.current;
    if (!track) return;

    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    void track.offsetWidth;
    track.style.transition = "transform 0.2s ease";
    track.style.transform =
      dir === "right" ? "translateX(-3vw)" : "translateX(3vw)";

    setTimeout(() => {
      setDisplayedItems(getItems(index));
      setCurrentIndex(index);
      setExternalDirection(null);
      if (track) {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
      }
    }, 200);
  }, [index, externalDirection]);

  return (
    <BaseItem
      {...data}
      rightComponent={
        <div className="color-list-container">
          <svg
            style={{ transform: "scaleX(-100%)" }}
            width="7"
            height="9"
            viewBox="0 0 7 9"
          >
            <path
              d="M1.5 1L5 4.5L1.5 8"
              stroke="#969696"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="carousel">
            <div ref={containerRef} className="carousel-track">
              {displayedItems.map((item, idx) => (
                <div key={idx} className="item">
                  <div
                    className={`circle ${idx === 1 ? "selected" : ""}`}
                    style={{
                      background: `${item}`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <svg width="7" height="9" viewBox="0 0 7 9">
            <path
              d="M1.5 1L5 4.5L1.5 8"
              stroke="#969696"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      }
    />
  );
};

export default ColorsList;
