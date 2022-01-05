import { useEffect, useState } from 'react';
import type { FC } from 'react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Card } from '@/components/Card';
import { Range } from '@/components/Range';
import { Search } from '@/components/Search';
import { Select, Sort } from '@/components/Select';
import { OvalButton } from '@/components/OvalButton';

import { data } from '@/data';

import ball from '@/assets/svg/ball.svg';
import bell from '@/assets/svg/bell.svg';
import cone from '@/assets/svg/cone.svg';
import snowflake from '@/assets/svg/snowflake.svg';
import toy from '@/assets/svg/toy.svg';

import styles from './Toys.scss';

type ItemData = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

type SortedData = {
  [key: string]: ItemData[];
};

const importToy = (number: string): string => {
  return require(`@/assets/toys/${number}.png`);
};

export const Toys: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const isSearch = (item: ItemData): boolean => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  };

  const initMinYear = 1940;
  const initMaxYear = 2020;

  const [minYear, setMinYear] = useState<number>(initMinYear);
  const [maxYear, setMaxYear] = useState<number>(initMaxYear);

  const onMinYearChange = (value: number): void => {
    setMinYear(value);
  };
  const onMaxYearChange = (value: number): void => {
    setMaxYear(value);
  };

  const isYear = (item: ItemData): boolean => {
    return Number(item.year) >= Number(minYear) && Number(item.year) <= Number(maxYear);
  };

  const initMinCount = 1;
  const initMaxCount = 12;

  const [minCount, setMinCount] = useState<number>(initMinCount);
  const [maxCount, setMaxCount] = useState<number>(initMaxCount);

  const onMinCountChange = (value: number): void => {
    setMinCount(value);
  };
  const onMaxCountChange = (value: number): void => {
    setMaxCount(value);
  };

  const isCount = (item: ItemData): boolean => {
    return Number(item.count) >= Number(minCount) && Number(item.count) <= Number(maxCount);
  };

  const [isBallPressed, setIsBallPressed] = useState<boolean>(false);
  const [isBellPressed, setIsBellPressed] = useState<boolean>(false);
  const [isConePressed, setIsConePressed] = useState<boolean>(false);
  const [isSnowflakePressed, setIsSnowflakePressed] = useState<boolean>(false);
  const [isToyPressed, setIsToyPressed] = useState<boolean>(false);

  const onBallClick = (): void => {
    isBallPressed ? setIsBallPressed(false) : setIsBallPressed(true);
  };
  const onBellClick = (): void => {
    isBellPressed ? setIsBellPressed(false) : setIsBellPressed(true);
  };
  const onConeClick = (): void => {
    isConePressed ? setIsConePressed(false) : setIsConePressed(true);
  };
  const onSnowflakeClick = (): void => {
    isSnowflakePressed ? setIsSnowflakePressed(false) : setIsSnowflakePressed(true);
  };
  const onToyClick = (): void => {
    isToyPressed ? setIsToyPressed(false) : setIsToyPressed(true);
  };

  const isAnyShape = (item: ItemData): boolean => {
    return (
      (isBallPressed && item.shape === 'шар') ||
      (isBellPressed && item.shape === 'колокольчик') ||
      (isConePressed && item.shape === 'шишка') ||
      (isSnowflakePressed && item.shape === 'снежинка') ||
      (isToyPressed && item.shape === 'фигурка')
    );
  };

  const isNoShape = !isBallPressed && !isBellPressed && !isConePressed && !isSnowflakePressed && !isToyPressed;

  const [isWhitePressed, setIsWhitePressed] = useState<boolean>(false);
  const [isYellowPressed, setIsYellowPressed] = useState<boolean>(false);
  const [isRedPressed, setIsRedPressed] = useState<boolean>(false);
  const [isBluePressed, setIsBluePressed] = useState<boolean>(false);
  const [isGreenPressed, setIsGreenPressed] = useState<boolean>(false);

  const onWhiteClick = (): void => {
    isWhitePressed ? setIsWhitePressed(false) : setIsWhitePressed(true);
  };
  const onYellowClick = (): void => {
    isYellowPressed ? setIsYellowPressed(false) : setIsYellowPressed(true);
  };
  const onRedClick = (): void => {
    isRedPressed ? setIsRedPressed(false) : setIsRedPressed(true);
  };
  const onBlueClick = (): void => {
    isBluePressed ? setIsBluePressed(false) : setIsBluePressed(true);
  };
  const onGreenClick = (): void => {
    isGreenPressed ? setIsGreenPressed(false) : setIsGreenPressed(true);
  };

  const isAnyColor = (item: ItemData): boolean => {
    return (
      (isWhitePressed && item.color === 'белый') ||
      (isYellowPressed && item.color === 'желтый') ||
      (isRedPressed && item.color === 'красный') ||
      (isBluePressed && item.color === 'синий') ||
      (isGreenPressed && item.color === 'зелёный')
    );
  };

  const isNoColor = !isWhitePressed && !isYellowPressed && !isRedPressed && !isBluePressed && !isGreenPressed;

  const [isGreatPressed, setIsGreatPressed] = useState<boolean>(false);
  const [isMediumPressed, setIsMediumPressed] = useState<boolean>(false);
  const [isSmallPressed, setIsSmallPressed] = useState<boolean>(false);

  const onGreatClick = (): void => {
    isGreatPressed ? setIsGreatPressed(false) : setIsGreatPressed(true);
  };
  const onMediumClick = (): void => {
    isMediumPressed ? setIsMediumPressed(false) : setIsMediumPressed(true);
  };
  const onSmallClick = (): void => {
    isSmallPressed ? setIsSmallPressed(false) : setIsSmallPressed(true);
  };

  const isAnySize = (item: ItemData): boolean => {
    return (
      (isGreatPressed && item.size === 'большой') ||
      (isMediumPressed && item.size === 'средний') ||
      (isSmallPressed && item.size === 'малый')
    );
  };

  const isNoSize = !isGreatPressed && !isMediumPressed && !isSmallPressed;

  const [isFavouritePressed, setIsFavouritePressed] = useState<boolean>(false);

  const onFavouriteClick = (): void => {
    isFavouritePressed ? setIsFavouritePressed(false) : setIsFavouritePressed(true);
  };

  const isFavourite = (item: ItemData): boolean => {
    return isFavouritePressed && item.favorite === true;
  };

  const isNoFavourite = !isFavouritePressed;

  const cardIsShown = (item: ItemData): boolean => {
    return (
      isSearch(item) &&
      isCount(item) &&
      isYear(item) &&
      (isAnyShape(item) || isNoShape) &&
      (isAnyColor(item) || isNoColor) &&
      (isAnySize(item) || isNoSize) &&
      (isFavourite(item) || isNoFavourite)
    );
  };

  const [selectValue, setSelectValue] = useState<string>(`${Sort.ByNameInAscendingOrder}`);

  const onSelectChange = (value: string): void => {
    setSelectValue(value);
  };

  const dataSortedByNameInAscendingOrder = Array.from(data).sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const dataSortedByNameInDescendingOrder = Array.from(data).sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });

  const dataSortedByCountInAscendingOrder = Array.from(data).sort((a, b) => {
    return Number(a.count) - Number(b.count);
  });

  const dataSortedByCountInDescendingOrder = Array.from(data).sort((a, b) => {
    return Number(b.count) - Number(a.count);
  });

  const sortedData: SortedData = {
    [`${Sort.ByNameInAscendingOrder}`]: dataSortedByNameInAscendingOrder,
    [`${Sort.ByNameInDescendingOrder}`]: dataSortedByNameInDescendingOrder,
    [`${Sort.ByCountInAscendingOrder}`]: dataSortedByCountInAscendingOrder,
    [`${Sort.ByCountInDescendingOrder}`]: dataSortedByCountInDescendingOrder,
  };

  const onResetClick = (): void => {
    setSearchValue('');
    setMinYear(initMinYear);
    setMaxYear(initMaxYear);
    setMinCount(initMinCount);
    setMaxCount(initMaxCount);
    setIsBallPressed(false);
    setIsBellPressed(false);
    setIsConePressed(false);
    setIsSnowflakePressed(false);
    setIsToyPressed(false);
    setIsWhitePressed(false);
    setIsYellowPressed(false);
    setIsRedPressed(false);
    setIsBluePressed(false);
    setIsGreenPressed(false);
    setIsGreatPressed(false);
    setIsMediumPressed(false);
    setIsSmallPressed(false);
    setIsFavouritePressed(false);
    setSelectValue(`${Sort.ByNameInAscendingOrder}`);
  };

  const onSaveClick = (): void => {
    localStorage.setItem('search_value', searchValue);
    localStorage.setItem('min_year', String(minYear));
    localStorage.setItem('max_year', String(maxYear));
    localStorage.setItem('min_count', String(minCount));
    localStorage.setItem('max_count', String(maxCount));
    localStorage.setItem('is_ball_pressed', String(isBallPressed));
    localStorage.setItem('is_bell_pressed', String(isBellPressed));
    localStorage.setItem('is_cone_pressed', String(isConePressed));
    localStorage.setItem('is_snowflake_pressed', String(isSnowflakePressed));
    localStorage.setItem('is_toy_pressed', String(isToyPressed));
    localStorage.setItem('is_white_pressed', String(isWhitePressed));
    localStorage.setItem('is_yellow_pressed', String(isYellowPressed));
    localStorage.setItem('is_red_pressed', String(isRedPressed));
    localStorage.setItem('is_blue_pressed', String(isBluePressed));
    localStorage.setItem('is_green_pressed', String(isGreenPressed));
    localStorage.setItem('is_great_pressed', String(isGreatPressed));
    localStorage.setItem('is_medium_pressed', String(isMediumPressed));
    localStorage.setItem('is_small_pressed', String(isSmallPressed));
    localStorage.setItem('is_favourite_pressed', String(isFavouritePressed));
    localStorage.setItem('select_value', selectValue);
  };

  useEffect(() => {
    setSearchValue(localStorage.getItem('search_value') ?? '');
    setMinYear(Number(localStorage.getItem('min_year') ?? initMinYear));
    setMaxYear(Number(localStorage.getItem('max_year') ?? initMaxYear));
    setMinCount(Number(localStorage.getItem('min_count') ?? initMinCount));
    setMaxCount(Number(localStorage.getItem('max_count') ?? initMaxCount));
    setIsBallPressed(localStorage.getItem('is_bell_pressed') === 'true');
    setIsBellPressed(localStorage.getItem('is_bell_pressed') === 'true');
    setIsConePressed(localStorage.getItem('is_cone_pressed') === 'true');
    setIsSnowflakePressed(localStorage.getItem('is_snowflake_pressed') === 'true');
    setIsToyPressed(localStorage.getItem('is_toy_pressed') === 'true');
    setIsWhitePressed(localStorage.getItem('is_white_pressed') === 'true');
    setIsYellowPressed(localStorage.getItem('is_yellow_pressed') === 'true');
    setIsRedPressed(localStorage.getItem('is_red_pressed') === 'true');
    setIsBluePressed(localStorage.getItem('is_blue_pressed') === 'true');
    setIsGreenPressed(localStorage.getItem('is_green_pressed') === 'true');
    setIsGreatPressed(localStorage.getItem('is_great_pressed') === 'true');
    setIsMediumPressed(localStorage.getItem('is_medium_pressed') === 'true');
    setIsSmallPressed(localStorage.getItem('is_small_pressed') === 'true');
    setIsFavouritePressed(localStorage.getItem('is_favourite_pressed') === 'true');
    setSelectValue(localStorage.getItem('select_value') ?? `${Sort.ByNameInAscendingOrder}`);
  }, []);

  return (
    <div className={styles['toys']}>
      <div className={styles['settings']}>
        <Search value={searchValue} onChange={onSearchChange} />
        <span className={styles['header']}>Фильтры</span>
        <span className={styles['subheader']}>Год покупки</span>
        <div className={styles['filters']}>
          <Range
            min={initMinYear}
            max={initMaxYear}
            minValue={minYear}
            maxValue={maxYear}
            onMinChange={onMinYearChange}
            onMaxChange={onMaxYearChange}
          />
        </div>
        <span className={styles['subheader']}>Количество</span>
        <div className={styles['filters']}>
          <Range
            min={initMinCount}
            max={initMaxCount}
            minValue={minCount}
            maxValue={maxCount}
            onMinChange={onMinCountChange}
            onMaxChange={onMaxCountChange}
          />
        </div>
        <span className={styles['subheader']}>Форма</span>
        <div className={styles['filters']}>
          <Button
            svg={ball}
            viewBox="0 0 64 64"
            label="Шар"
            isPressed={isBallPressed}
            onClick={onBallClick}
          />
          <Button
            svg={bell}
            viewBox="0 0 64 64"
            label="Колокол"
            isPressed={isBellPressed}
            onClick={onBellClick}
          />
          <Button
            svg={cone}
            viewBox="0 0 64 64"
            label="Шишка"
            isPressed={isConePressed}
            onClick={onConeClick}
          />
          <Button
            svg={snowflake}
            viewBox="0 0 64 64"
            label="Снежинка"
            isPressed={isSnowflakePressed}
            onClick={onSnowflakeClick}
          />
          <Button
            svg={toy}
            viewBox="0 0 400 557"
            label="Фигурка"
            isPressed={isToyPressed}
            onClick={onToyClick}
          />
        </div>
        <span className={styles['subheader']}>Цвет</span>
        <div className={styles['filters']}>
          <Checkbox
            boxColor="white"
            checkColor="black"
            isChecked={isWhitePressed}
            onClick={onWhiteClick}
          />
          <Checkbox
            boxColor="yellow"
            checkColor="black"
            isChecked={isYellowPressed}
            onClick={onYellowClick}
          />
          <Checkbox boxColor="red" isChecked={isRedPressed} onClick={onRedClick} />
          <Checkbox boxColor="blue" isChecked={isBluePressed} onClick={onBlueClick} />
          <Checkbox boxColor="green" isChecked={isGreenPressed} onClick={onGreenClick} />
        </div>
        <span className={styles['subheader']}>Размер</span>
        <div className={styles['filters']}>
          <Checkbox label="Большой" isChecked={isGreatPressed} onClick={onGreatClick} />
          <Checkbox label="Средний" isChecked={isMediumPressed} onClick={onMediumClick} />
          <Checkbox label="Маленький" isChecked={isSmallPressed} onClick={onSmallClick} />
        </div>
        <div className={styles['filters']} style={{ marginTop: 20 }}>
          <Checkbox
            label="Только любимые"
            isChecked={isFavouritePressed}
            onClick={onFavouriteClick}
          />
        </div>
        <span className={styles['header']}>Сортировка</span>
        <div className={styles['filters']} style={{ marginTop: 20 }}>
          <Select value={selectValue} onChange={onSelectChange} />
        </div>
        <div className={styles['filters']} style={{ marginTop: 20 }}>
          <OvalButton name={'Сбросить'} onClick={onResetClick} />
          <OvalButton name={'Сохранить'} onClick={onSaveClick} />
        </div>
      </div>
      <div className={styles['cards']}>
        {sortedData[selectValue].map(
          (item, index) =>
            cardIsShown(item) && (
              <Card
                key={index.toString()}
                name={item.name}
                src={importToy(item.num)}
                count={item.count}
                year={item.year}
                shape={item.shape}
                color={item.color}
                size={item.size}
                favourite={item.favorite}
              />
            )
        )}
      </div>
    </div>
  );
};
