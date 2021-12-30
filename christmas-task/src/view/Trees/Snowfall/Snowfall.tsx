import { FC } from 'react';

import Snowflake from '@/assets/svg/snowflake.svg';

import styles from './Snowfall.scss';

export const Snowfall: FC = () => {
  return (
    <div className={styles['snowfall']}>
      {[...Array(100).keys()].map((_, index) => (
        <Snowflake key={index.toString()} viewBox="0 0 64 64" className={styles['snowflake']} />
      ))}
    </div>
  );
};
