import type { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import bg from '@/assets/bg.jpg';
import Logo from '@/assets/svg/tree.svg';
import Rss from '@/assets/svg/rss.svg';

import { Home } from '@/view/Home';
import { Toys } from '@/view/Toys';
import { Trees } from '@/view/Trees';

import styles from './App.scss';

export const App: FC = () => {
  return (
    <>
      <header className={styles['header']}>
        <nav className={styles['nav']}>
          <NavLink to="/">
            <Logo viewBox="0 0 98 128" className={styles['tree']} />
          </NavLink>
          <NavLink
            to="/toys"
            className={styles['nav-item']}
            style={({ isActive }) => ({
              borderBottomColor: isActive ? '#278d9f' : 'transparent',
            })}
          >
            Игрушки
          </NavLink>
          <NavLink
            to="/trees"
            className={styles['nav-item']}
            style={({ isActive }) => ({
              borderBottomColor: isActive ? '#278d9f' : 'transparent',
            })}
          >
            Елки
          </NavLink>
        </nav>
      </header>
      <main className={styles['main']} style={{ backgroundImage: `url('${bg}')` }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/toys" element={<Toys />}></Route>
          <Route path="/trees" element={<Trees />}></Route>
        </Routes>
      </main>
      <footer className={styles['footer']}>
        <Rss viewBox="0 0 242 90" className={styles['rss']} />
        <span className={styles['year']}>2021</span>
        <a href="https://rs.school/">Курс</a>
      </footer>
    </>
  );
};
