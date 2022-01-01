import { useState } from 'react';
import type { FC, CSSProperties } from 'react';

import Check from '@/assets/check.svg';

interface ICheckbox {
  boxColor?: string;
  checkColor?: string;
  label?: string;
  onClick: () => void;
}

export const Checkbox: FC<ICheckbox> = ({ boxColor, checkColor, label, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  };

  const checkboxStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    border: '1px solid',
    borderRadius: 5,
    borderColor: boxColor ?? '#278d9f',
    backgroundColor: boxColor ?? '#278d9f',
    cursor: 'pointer',
  };

  const onCheckboxClick = (): void => {
    isPressed ? setIsPressed(false) : setIsPressed(true);
    onClick();
  };

  const checkStyle: CSSProperties = {
    width: 18,
    height: 18,
    fill: checkColor ?? '#fff',
  };

  const labelStyle: CSSProperties = {
    fontSize: 16,
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={checkboxStyle} onClick={onCheckboxClick}>
        {isPressed && <Check viewBox="0 0 26 26" style={checkStyle} />}
      </div>
      <span style={labelStyle}>{label}</span>
    </div>
  );
};
