import { useState } from 'react';
import type { FC, CSSProperties } from 'react';

interface IButton {
  svg: any;
  viewBox: string;
  width?: number;
  height?: number;
  label?: string;
  onClick: () => void;
}

export const Button: FC<IButton> = ({ svg, viewBox, width, height, label, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const Svg = svg;

  const svgStyle: CSSProperties = {
    width: width ?? 40,
    height: height ?? 40,
    opacity: isPressed ? 0.6 : 1,
    cursor: 'pointer',
  };

  const onSvgClick = (): void => {
    isPressed ? setIsPressed(false) : setIsPressed(true);
    onClick();
  };

  const buttonStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  };

  const labelStyle: CSSProperties = {
    fontSize: 16,
    pointerEvents: 'none',
  };

  return (
    <div style={buttonStyle}>
      <Svg viewBox={viewBox} style={svgStyle} onClick={onSvgClick} />
      <span style={labelStyle}>{label}</span>
    </div>
  );
};
