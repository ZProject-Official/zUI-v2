import { FC, useEffect, useRef, useState } from "react";
import BaseItem from "../baseItem/baseItem";
import "./list.scss";
import formatString from "../../../../../utils/formatString";
import ScrollingText from "./scrollingText";

interface listProps {
  itemId?: string;
  label?: string;
  index?: number;
  items?: string[];
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
  };
  isSelected?: boolean;
}

const List: FC<listProps> = ({
  items = [],
  index: rawIndex = 1,
  itemId,
  ...data
}) => {
  const index = rawIndex - 1;
  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [displayedItems, setDisplayedItems] = useState<string[]>([]);
  const [externalDirection, setExternalDirection] = useState<
    "left" | "right" | null
  >(null);
  const hasMounted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [shouldScroll, setShouldScroll] = useState(false);

  const getItems = (center: number) => [
    items[(center - 1 + total) % total],
    items[center],
    items[(center + 1) % total],
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
    const timeout = setTimeout(() => {
      const el = refs.current[1];
      if (el) {
        const isOverflowing = el.scrollWidth > el.clientWidth;
        setShouldScroll(isOverflowing);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [displayedItems]);

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
        <div className='list-container'>
          <svg
            style={{ transform: "scaleX(-100%)" }}
            width='7'
            height='9'
            viewBox='0 0 7 9'
          >
            <path
              d='M1.5 1L5 4.5L1.5 8'
              stroke='#969696'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
          <div className='carousel'>
            <div ref={containerRef} className='carousel-track'>
              {displayedItems.map((item, idx) => {
                const isSelected = idx === 1;

                return (
                  <div
                    key={idx}
                    className={`item ${isSelected ? "selected" : ""}`}
                  >
                    <div
                      className='text-measure'
                      ref={(el) => (refs.current[idx] = el)}
                      style={{
                        maxWidth: "3vw",
                        position: "absolute",
                        visibility: "hidden",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {formatString(item)}
                    </div>
                    {shouldScroll && isSelected ? (
                      <ScrollingText charsPerSecond={10}>{item}</ScrollingText>
                    ) : (
                      formatString(item)
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <svg width='7' height='9' viewBox='0 0 7 9'>
            <path
              d='M1.5 1L5 4.5L1.5 8'
              stroke='#969696'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
      }
    />
  );
};

export default List;
