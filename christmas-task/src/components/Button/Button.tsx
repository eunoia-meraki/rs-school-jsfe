import type { FC, CSSProperties } from 'react';

interface IButton {
  svg: any;
  viewBox: string;
  width?: number;
  height?: number;
  label?: string;
  isPressed: boolean;
  onClick: () => void;
}

export const Button: FC<IButton> = ({ svg, viewBox, width, height, label, isPressed, onClick }) => {
  const Svg = svg;

  const svgStyle: CSSProperties = {
    width: width ?? 40,
    height: height ?? 40,
    opacity: isPressed ? 0.6 : 1,
    cursor: 'pointer',
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
      <Svg viewBox={viewBox} style={svgStyle} onClick={onClick} />
      <span style={labelStyle}>{label}</span>
    </div>
  );
};
