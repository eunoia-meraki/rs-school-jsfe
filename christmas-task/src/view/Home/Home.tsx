import { NavLink } from 'react-router-dom';

import type { FC } from 'react';

import styles from './Home.scss';

import ball1 from '@/assets/ball/1.png';
import ball2 from '@/assets/ball/2.png';

export const Home: FC = () => (
  <div className={styles['home']}>
    <div className={styles['ball1']} style={{ backgroundImage: `url('${ball1}')` }} />
    <div className={styles['ball2']} style={{ backgroundImage: `url('${ball2}')` }} />
    <div className={styles['container']}>
      <div className={styles['title']}>Новогодняя игра &quot;Наряди елку&quot;</div>
      <NavLink to="/toys" className={styles['button']}>
          Начать
      </NavLink>
    </div>
  </div>
);
