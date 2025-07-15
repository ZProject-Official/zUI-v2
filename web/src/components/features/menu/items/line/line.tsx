import { FC } from 'react';

import './line.scss';

interface lineProps {
  defaultColor?: string;
  colors?: string[];
}

const Line: FC<lineProps> = ({ defaultColor, colors }) => {
  return (
    <div className='line-container'>
      <div
        className='line'
        style={{
          background: `${colors && colors.length > 0 && colors.length > 1 ? `linear-gradient(to right, ${colors.join(', ')})` : defaultColor}`,
        }}
      ></div>
    </div>
  );
};

export default Line;
