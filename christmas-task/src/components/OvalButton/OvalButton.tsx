import type { FC } from 'react';

import styles from './OvalButton.scss';

interface IOvalButton {
  name: string;
  onClick: () => void;
}

export const OvalButton: FC<IOvalButton> = ({ name, onClick }) => {
  return (
    <div className={styles['oval-button']} onClick={onClick}>
      {name}
    </div>
  );
};
