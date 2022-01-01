import { FC } from 'react';

import Snowflake from '@/assets/svg/snow.svg';

import styles from './Snowfall.scss';

export const Snowfall: FC = () => {
  return (
    <div className={styles['snowfall']}>
      {[...Array(100).keys()].map((_, index) => (
        <Snowflake key={index.toString()} viewBox="0 0 128 128" className={styles['snowflake']} />
      ))}
    </div>
  );
};
