import { FC, useEffect, useRef, useState } from 'react';
import './scrollingText.scss';

interface ScrollingTextProps {
  children: string;
  charsPerSecond?: number;
}

const ScrollingText: FC<ScrollingTextProps> = ({ children, charsPerSecond = 10 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [ready, setReady] = useState(false);
  const [animationData, setAnimationData] = useState<{ width: number; duration: number }>({ width: 0, duration: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const firstSpan = container.querySelector('span') as HTMLElement;
    if (!firstSpan) return;

    const overflow = firstSpan.scrollWidth > container.clientWidth;
    setShouldScroll(overflow);

    if (overflow) {
      const textWidth = firstSpan.scrollWidth;
      const totalChars = children.length;
      const duration = totalChars / charsPerSecond;

      setAnimationData({ width: textWidth, duration });

      setTimeout(() => {
        setReady(true);
      }, 30);
    }
  }, [children, charsPerSecond]);

  return (
    <div className='scrolling-text-container' ref={containerRef}>
      {shouldScroll ? (
        <div
          className={`scrolling-text-content ${ready ? 'scrolling' : ''}`}
          style={{
            animationDuration: `${animationData.duration}s`,
            '--scroll-distance': `${animationData.width + 16}px`,
          } as React.CSSProperties}
        >
          <span>{children}</span>
          <span aria-hidden='true'>{children}</span>
        </div>
      ) : (
        <div className='scrolling-text-content'>
          <span>{children}</span>
        </div>
      )}
    </div>
  );
};

export default ScrollingText;
