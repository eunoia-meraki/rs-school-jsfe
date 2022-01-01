import type { FC } from 'react';

import styles from './Card.scss';

interface ICard {
  name: string;
  src: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favourite: boolean;
}

export const Card: FC<ICard> = ({ name, src, count, year, shape, color, size, favourite }) => {
  return (
    <div className={styles['card']}>
      <h1>{name}</h1>
      <img className={styles['image']} src={src}></img>
      <span>Количество: {count}</span>
      <span>Год покупки: {year}</span>
      <span>Форма: {shape}</span>
      <span>Цвет: {color}</span>
      <span>Размер: {size}</span>
      <span>Любимая: {favourite ? 'да' : 'нет'}</span>
    </div>
  );
};
