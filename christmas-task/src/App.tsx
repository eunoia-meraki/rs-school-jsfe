import { createContext, useContext, useEffect, useState } from 'react';
import type { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { Home } from '@/view/Home';
import { Toys } from '@/view/Toys';
import { Trees } from '@/view/Trees';

import bg from '@/assets/bg.jpg';
import Rss from '@/assets/svg/rss.svg';

import type { DataItem } from './types/shared';

import styles from './App.scss';

export const App: FC = () => {
  const [favourites, setFavourites] = useState<DataItem[]>([]);

  const getFavourites = (): DataItem[] => {
    return favourites;
  };

  const addDataItem = (dataItem: DataItem): void => {
    setFavourites(prev => {
      if (!prev.find(item => item.num === dataItem.num)) {
        return [...prev, dataItem];
      }
      return prev;
    });
  };

  const deleteDataItem = (dataItem: DataItem): void => {
    setFavourites(prev => {
      return prev.filter(item => item.num !== dataItem.num);
    });
  };

  const value: IFavouritesContext = {
    getFavourites,
    addDataItem,
    deleteDataItem,
  };

  return (
    <>
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
        <span className={styles['toys-count']} style={{ marginRight: 30 }}>Выбрано игрушек: {favourites?.length}</span>
      </header>
      <main className={styles['main']} style={{ backgroundImage: `url('${bg}')` }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/toys"
            element={
              <FavouritesContext.Provider value={value}>
                <Toys />
              </FavouritesContext.Provider>
            }
          ></Route>
          <Route
            path="/trees"
            element={
              <FavouritesContext.Provider value={value}>
                <Trees />
              </FavouritesContext.Provider>
            }
          ></Route>
        </Routes>
      </main>
      <footer className={styles['footer']}>
        <Rss viewBox="0 0 242 90" className={styles['rss']} />
        <span>2021</span>
        <a href="https://rs.school/">Курс</a>
      </footer>
    </>
  );
};

interface IFavouritesContext {
  getFavourites: () => DataItem[];
  addDataItem: (dataItem: DataItem) => void;
  deleteDataItem: (dataItem: DataItem) => void;
}

const FavouritesContext = createContext<IFavouritesContext | undefined>(undefined);

export const useFavouritesContext = (): IFavouritesContext | undefined => {
  const favouritesContext = useContext(FavouritesContext);
  return favouritesContext;
};
