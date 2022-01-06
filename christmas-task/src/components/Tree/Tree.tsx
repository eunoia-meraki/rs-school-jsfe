import type { FC } from 'react';

import styles from './Tree.scss';

interface ITree {
  image: string;
  onSetImage: (src: string) => void;
}

export const Tree: FC<ITree> = ({ image, onSetImage }) => {
  const onClick = (): void => {
    onSetImage(image);
  };

  return (
    <div
      className={styles['tree']}
      style={{ backgroundImage: `url('${image}')` }}
      onClick={onClick}
    ></div>
  );
};
