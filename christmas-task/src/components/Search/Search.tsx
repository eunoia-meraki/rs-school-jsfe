import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import Loupe from '@/assets/svg/search.svg';
import Cross from '@/assets/cross.svg';

import styles from './Search.scss';

interface ISearch {
  onChange: (value: string) => void;
}

export const Search: FC<ISearch> = ({ onChange }) => {
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<HTMLInputElement | undefined>(undefined);

  useEffect(() => {
    const search = document.querySelector<HTMLInputElement>(`input[type='search']`);
    setSearch(search!);
    search!.focus();
  }, []);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const onCrossClick = (): void => {
    setValue('');
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
      ></input>
      <Loupe viewBox="0 0 64 64" className={styles['loupe']} />
      {value && <Cross viewBox="0 0 492 492" className={styles['cross']} onClick={onCrossClick} />}
    </div>
  );
};
