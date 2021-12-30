import type { FC } from 'react';

import styles from './Background.scss';

interface IBackground {
  src: string;
  onSetBgImage: (src: string) => void;
}

export const Background: FC<IBackground> = ({ src, onSetBgImage }) => {
  const onClick = (): void => {
    onSetBgImage(src);
  };

  return (
    <div
      className={styles['background']}
      style={{ backgroundImage: `url('${src}')` }}
      onClick={onClick}
    ></div>
  );
};
