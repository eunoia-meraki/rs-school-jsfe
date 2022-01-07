import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import styles from './Search.scss';

import Cross from '@/assets/cross.svg';
import Loupe from '@/assets/svg/search.svg';

interface ISearch {
  value: string;
  onChange: (value: string) => void;
}

export const Search: FC<ISearch> = ({ value, onChange }) => {
  const [search, setSearch] = useState<HTMLInputElement | undefined>(undefined);

  useEffect(() => {
    const searchElement = document.querySelector<HTMLInputElement>('input[type=\'search\']');
    setSearch(searchElement!);
    searchElement!.focus();
  }, []);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const onCrossClick = (): void => {
    onChange('');
    search!.focus();
  };

  return (
    <div className={styles['container']}>
      <input
        type="search"
        placeholder="Поиск"
        className={styles['search']}
        onChange={onSearchChange}
        value={value}
      />
      <Loupe viewBox="0 0 64 64" className={styles['loupe']} />
      {value && <Cross viewBox="0 0 492 492" className={styles['cross']} onClick={onCrossClick} />}
    </div>
  );
};
