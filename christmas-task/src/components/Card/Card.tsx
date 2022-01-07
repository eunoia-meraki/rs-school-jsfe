import { useEffect, useState } from 'react';
import type { CSSProperties, FC } from 'react';

import styles from './Card.scss';

import { toys } from '@/data';
import { DataItem } from '@/types/shared';

interface ICard {
  dataItem: DataItem;
  favourites: DataItem[];
  addDataItem: (dataItem: DataItem) => void;
  deleteDataItem: (dataItem: DataItem) => void;
}

export const Card: FC<ICard> = ({ dataItem, favourites, addDataItem, deleteDataItem }) => {
  const [isAddedToFavourites, setIsAddedToFavourites] = useState<boolean>(false);

  useEffect(() => {
    if (favourites.find(item => item.num === dataItem.num)) {
      setIsAddedToFavourites(true);
    } else {
      setIsAddedToFavourites(false);
    }
  }, [favourites, dataItem]);

  const onClick = (): void => {
    if (isAddedToFavourites) {
      deleteDataItem(dataItem);
    } else {
      addDataItem(dataItem);
    }
  };

  const cardStyle: CSSProperties = {
    backgroundColor: isAddedToFavourites ? 'rgba(31, 112, 127, 0.8)' : 'rgba(31, 112, 127, 0.3)',
  };

  return (
    <div
      className={styles['card']}
      onClick={onClick}
      onKeyDown={() => undefined}
      style={cardStyle}
      role="button"
      tabIndex={0}
    >
      <h1>{dataItem.name}</h1>
      <img className={styles['image']} src={toys[Number(dataItem.num) - 1]} alt="toy" />
      <span>Количество: {dataItem.count}</span>
      <span>Год покупки: {dataItem.year}</span>
      <span>Форма: {dataItem.shape}</span>
      <span>Цвет: {dataItem.color}</span>
      <span>Размер: {dataItem.size}</span>
      <span>Любимая: {dataItem.favorite ? 'да' : 'нет'}</span>
    </div>
  );
};
