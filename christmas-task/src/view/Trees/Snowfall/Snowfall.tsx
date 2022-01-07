import { FC } from 'react';

import styles from './Snowfall.scss';

import Snowflake from '@/assets/svg/snow.svg';

export const Snowfall: FC = () => (
  <div className={styles['snowfall']}>
    {[...Array(100).keys()].map((_, index) => (
      <Snowflake key={index.toString()} viewBox="0 0 128 128" className={styles['snowflake']} />
    ))}
  </div>
);
