import { NavLink, Route, Routes } from 'react-router-dom';

import React, { useState } from 'react';
import type { FC } from 'react';

import styles from './App.scss';

import type { DataItem } from './types/shared';

import bg from '@/assets/bg.jpg';
import Rss from '@/assets/svg/rss.svg';
import { Home } from '@/view/Home';
import { Toys } from '@/view/Toys';
import { Trees } from '@/view/Trees';

export const App: FC = () => {
  const [favourites, setFavourites] = useState<DataItem[]>([]);

  const addDataItem = (dataItem: DataItem): void => {
    setFavourites(prev => {
      if (!prev.find(item => item.num === dataItem.num)) {
        return [...prev, dataItem];
      }
      return prev;
    });
  };

  const deleteDataItem = (dataItem: DataItem): void => {
    setFavourites(prev => prev.filter(item => item.num !== dataItem.num));
  };

  return (
    <React.Fragment>
      <header className={styles['header']}>
        <nav className={styles['nav']}>
          <NavLink
            to="/"
            className={styles['nav-link']}
            style={({ isActive }) => ({
              borderBottomColor: isActive ? '#278d9f' : 'transparent',
            })}
          >
            Главная
          </NavLink>
          <NavLink
            to="/toys"
            className={styles['nav-link']}
            style={({ isActive }) => ({
              borderBottomColor: isActive ? '#278d9f' : 'transparent',
            })}
          >
            Игрушки
          </NavLink>
          <NavLink
            to="/trees"
            className={styles['nav-link']}
            style={({ isActive }) => ({
              borderBottomColor: isActive ? '#278d9f' : 'transparent',
            })}
          >
            Елки
          </NavLink>
        </nav>
        <span className={styles['toys-count']} style={{ marginRight: 30 }}>
          Выбрано игрушек: {favourites?.length}
        </span>
      </header>
      <main className={styles['main']} style={{ backgroundImage: `url('${bg}')` }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/toys"
            element={
              <Toys
                favourites={favourites}
                addDataItem={addDataItem}
                deleteDataItem={deleteDataItem}
              />
            }
          />
          <Route path="/trees" element={<Trees favourites={favourites} />} />
        </Routes>
      </main>
      <footer className={styles['footer']}>
        <Rss viewBox="0 0 242 90" className={styles['rss']} />
        <span>2021</span>
        <a href="https://rs.school/">Курс</a>
      </footer>
    </React.Fragment>
  );
};
