import type { FC } from 'react';

import styles from './Tree.scss';

interface ITree {
  src: string;
  onSetTreeImage: (src: string) => void;
}

export const Tree: FC<ITree> = ({ src, onSetTreeImage }) => {
  const onClick = (): void => {
    onSetTreeImage(src);
  };

  return (
    <div
      className={styles['tree']}
      style={{ backgroundImage: `url('${src}')` }}
      onClick={onClick}
    ></div>
  );
};
