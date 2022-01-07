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
      <button className={styles['multicolor']} onClick={onMulticolorClick} type="button" aria-label="multicolor" />
      <button className={styles['yellow']} onClick={onYellowClick} type="button" aria-label="yellow" />
      <button className={styles['red']} onClick={onRedClick} type="button" aria-label="red" />
      <button className={styles['blue']} onClick={onBlueClick} type="button" aria-label="blue" />
      <button className={styles['green']} onClick={onGreenClick} type="button" aria-label="green" />
      <button className={styles['none']} onClick={onNoneClick} type="button" aria-label="none" />
    </div>
  );
};
