import type { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import bg from '@/assets/bg.jpg';
import Logo from '@/assets/svg/tree.svg';

import { Tree } from '@/view/Tree';

import styles from './App.scss';

export const App: FC = () => {
  return (
    <>
      <header className={styles['header']}>
        <nav className={styles['nav']}>
          <NavLink to="/">
            <Logo viewBox="0 0 128 128" className={styles['logo']} />
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
            to="/tree"
            className={styles['nav-item']}
            style={({ isActive }) => ({
              borderBottomColor: isActive ? '#278d9f' : 'transparent',
            })}
          >
            Елка
          </NavLink>
        </nav>
      </header>
      <main className={styles['main']} style={{ backgroundImage: `url('${bg}')` }}>
        <Routes>
          <Route path="/"></Route>
          <Route path="/toys"></Route>
          <Route path="/tree" element={<Tree />}></Route>
        </Routes>
      </main>
      <footer className={styles['footer']}></footer>
    </>
  );
};
