import { ChangeEvent, FC } from 'react';

import Arrow from '@/assets/svg/arrow-down.svg';

import styles from './Select.scss';

export enum Sort {
  ByNameInAscendingOrder,
  ByNameInDescendingOrder,
  ByCountInAscendingOrder,
  ByCountInDescendingOrder,
}

interface ISelect {
  value: string;
  onChange: (value: string) => void;
}

export const Select: FC<ISelect> = ({ onChange, value }) => {
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className={styles['container']}>
      <select className={styles['select']} value={value} onChange={onSelectChange}>
        <option className={styles['option']} value={`${Sort.ByNameInAscendingOrder}`}>
          По названию от А до Я
        </option>
        <option className={styles['option']} value={`${Sort.ByNameInDescendingOrder}`}>
          По названию от Я до А
        </option>
        <option className={styles['option']} value={`${Sort.ByCountInAscendingOrder}`}>
          По возрастанию количества
        </option>
        <option className={styles['option']} value={`${Sort.ByCountInDescendingOrder}`}>
          По убыванию количества
        </option>
      </select>
      <Arrow viewBox="0 -256 1792 1792" className={styles['arrow']} />
    </div>
  );
};
