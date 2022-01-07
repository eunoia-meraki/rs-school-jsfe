import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import ball1 from '@/assets/ball/1.png';
import ball2 from '@/assets/ball/2.png';

import styles from './Home.scss';

export const Home: FC = () => {
  return (
    <div className={styles['home']}>
      <div className={styles['ball1']} style={{ backgroundImage: `url('${ball1}')` }}></div>
      <div className={styles['ball2']} style={{ backgroundImage: `url('${ball2}')` }}></div>
      <div className={styles['container']}>
        <div className={styles['title']}>Новогодняя игра "Наряди елку"</div>
        <NavLink to="/toys" className={styles['button']}>
          Начать
        </NavLink>
      </div>
    </div>
  );
};
