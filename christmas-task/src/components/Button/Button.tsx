import type { FC, SVGProps, CSSProperties } from 'react';

import styles from './Button.scss';

interface IButton {
  svg: FC<SVGProps<SVGSVGElement>>;
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
    fill: isPressed ? '#278d9f' : '#fff',
  };

  return (
    <div className={styles['button']}>
      <Svg viewBox={viewBox} className={styles['svg']} style={svgStyle} onClick={onClick} />
      <span className={styles['label']}>{label}</span>
    </div>
  );
};
