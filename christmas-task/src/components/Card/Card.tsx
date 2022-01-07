import { useEffect, useState } from 'react';
import type { CSSProperties, FC } from 'react';

import { useFavouritesContext } from '@/App';

import { DataItem } from '@/types/shared';

import styles from './Card.scss';

interface ICard {
  dataItem: DataItem;
}

export const Card: FC<ICard> = ({ dataItem }) => {
  const [isAddedToFavourites, setIsAddedToFavourites] = useState<boolean>(false);

  const favouritesContext = useFavouritesContext();

  useEffect(() => {
    const favourites = favouritesContext?.getFavourites();
    if (favourites?.find(item => item.num === dataItem.num)) {
      setIsAddedToFavourites(true);
    } else {
      setIsAddedToFavourites(false);
    }
  }, []);

  const onClick = (): void => {
    if (isAddedToFavourites) {
      favouritesContext?.deleteDataItem(dataItem);
      setIsAddedToFavourites(false);
    } else {
      favouritesContext?.addDataItem(dataItem);
      setIsAddedToFavourites(true);
    }
  };

  const cardStyle: CSSProperties = {
    backgroundColor: isAddedToFavourites ? 'rgba(31, 112, 127, 0.8)' : 'rgba(31, 112, 127, 0.3)',
  };

  return (
    <div className={styles['card']} onClick={onClick} style={cardStyle}>
      <h1>{dataItem.name}</h1>
      <img className={styles['image']} src={importToy(dataItem.num)}></img>
      <span>Количество: {dataItem.count}</span>
      <span>Год покупки: {dataItem.year}</span>
      <span>Форма: {dataItem.shape}</span>
      <span>Цвет: {dataItem.color}</span>
      <span>Размер: {dataItem.size}</span>
      <span>Любимая: {dataItem.favorite ? 'да' : 'нет'}</span>
    </div>
  );
};

const importToy = (number: string): string => {
  return require(`@/assets/toys/${number}.png`);
};
