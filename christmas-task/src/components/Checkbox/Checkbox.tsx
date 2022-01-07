import type { FC, CSSProperties } from 'react';

import styles from './Checkbox.scss';

import Check from '@/assets/check.svg';

interface ICheckbox {
  boxColor?: string;
  checkColor?: string;
  label?: string;
  isChecked: boolean;
  onClick: () => void;
}

export const Checkbox: FC<ICheckbox> = ({ boxColor, checkColor, label, isChecked, onClick }) => {
  const checkboxStyle: CSSProperties = {
    borderColor: boxColor ?? '#278d9f',
    backgroundColor: boxColor ?? '#278d9f',
  };

  const checkStyle: CSSProperties = {
    fill: checkColor ?? '#fff',
  };

  return (
    <div className={styles['container']}>
      <div
        style={checkboxStyle}
        className={styles['checkbox']}
        onClick={onClick}
        onKeyDown={() => undefined}
        role="checkbox"
        tabIndex={0}
        aria-checked="false"
      >
        {isChecked && <Check viewBox="0 0 26 26" className={styles['check']} style={checkStyle} />}
      </div>
      <span className={styles['label']}>{label}</span>
    </div>
  );
};
