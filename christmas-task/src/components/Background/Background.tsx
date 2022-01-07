import type { FC } from 'react';

import styles from './Background.scss';

interface IBackground {
  image: string;
  onSetImage: (image: string) => void;
}

export const Background: FC<IBackground> = ({ image, onSetImage }) => {
  const onClick = (): void => {
    onSetImage(image);
  };

  return (
    <div
      className={styles['background']}
      style={{ backgroundImage: `url('${image}')` }}
      onClick={onClick}
      onKeyDown={() => undefined}
      role="button"
      tabIndex={0}
      aria-label="background"
    />
  );
};
