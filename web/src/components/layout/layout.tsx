import { ReactNode, FC, useState, useEffect, useRef } from "react";
import "./layout.scss";

interface LayoutProps {
  children: (editMod: boolean) => ReactNode;
  defaultPos: { x: number; y: number };
  editMod: boolean;
  selected: boolean;
  onSelected: () => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  index: number;
}

const Layout: FC<LayoutProps> = ({
  children,
  defaultPos,
  editMod,
  selected,
  onSelected,
  onPositionChange,
  index,
}) => {
  const [position, setPosition] = useState(defaultPos);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setPosition(defaultPos);
  }, [defaultPos]);

  const updateSize = () => {
    if (contentRef.current) {
      const { offsetWidth, offsetHeight } = contentRef.current;
      return { width: offsetWidth, height: offsetHeight };
    }
    return { width: 0, height: 0 };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !selected) return;

      const { width, height } = updateSize();
      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - height;

      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), maxX);
      const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), maxY);

      const newPosition = { x: newX, y: newY };
      setPosition(newPosition);
      onPositionChange?.(newPosition);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragOffset, selected, position, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selected) return;
    isDraggingRef.current = true;
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  return (
    <div
      className={`layout ${selected && editMod ? "selected" : ""}`}
      style={{
        zIndex: index,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
        cursor: editMod ? (selected ? "move" : "pointer") : "default",
      }}
      onClick={onSelected}
      onMouseDown={handleMouseDown}
      ref={contentRef}
    >
      {children(editMod)}
    </div>
  );
};

export default Layout;
