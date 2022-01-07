import { FC } from 'react';

import styles from './GarlandButtons.scss';

interface IGarlandButtons {
  onSetGarlandColor: (color: string) => void;
}

export const GarlandButtons: FC<IGarlandButtons> = ({ onSetGarlandColor }) => {
  const onMulticolorClick = (): void => {
    onSetGarlandColor('multicolor');
  };

  const onYellowClick = (): void => {
    onSetGarlandColor('yellow');
  };

  const onRedClick = (): void => {
    onSetGarlandColor('red');
  };

  const onBlueClick = (): void => {
    onSetGarlandColor('blue');
  };

  const onGreenClick = (): void => {
    onSetGarlandColor('green');
  };

  const onNoneClick = (): void => {
    onSetGarlandColor('none');
  };

  return (
    <div className={styles['garland-buttons']}>
      <button className={styles['multicolor']} onClick={onMulticolorClick}></button>
      <button className={styles['yellow']} onClick={onYellowClick}></button>
      <button className={styles['red']} onClick={onRedClick}></button>
      <button className={styles['blue']} onClick={onBlueClick}></button>
      <button className={styles['green']} onClick={onGreenClick}></button>
      <button className={styles['none']} onClick={onNoneClick}></button>
    </div>
  );
};
