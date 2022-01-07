import type { FC } from 'react';

import styles from './OvalButton.scss';

interface IOvalButton {
  name: string;
  onClick: () => void;
}

export const OvalButton: FC<IOvalButton> = ({ name, onClick }) => (
  <div
    className={styles['oval-button']}
    onClick={onClick}
    onKeyDown={() => undefined}
    role="button"
    tabIndex={0}
  >
    {name}
  </div>
);
