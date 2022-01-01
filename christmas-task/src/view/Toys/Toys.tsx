import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Card } from '@/components/Card';
import { Range } from '@/components/Range';
import { Search } from '@/components/Search';

import { data } from '@/data';

import ball from '@/assets/svg/ball.svg';
import bell from '@/assets/svg/Bell.svg';
import cone from '@/assets/svg/cone.svg';
import snowflake from '@/assets/svg/snowflake.svg';
import toy from '@/assets/svg/toy.svg';

const importToy = (number: number): string => {
  return require(`@/assets/toys/${number}.png`);
};

import styles from './Toys.scss';

export const Toys: FC = () => {
  const [isSearchText, setIsSearchText] = useState<string>('');

  const onSearchChange = (value: string): void => {
    setIsSearchText(value);
  };

  const isSearch = (card: any): boolean => {
    return card.name.toLowerCase().includes(isSearchText.toLowerCase());
  };

  const minCount = 1;
  const maxCount = 12;

  const [isMinCount, setIsMinCount] = useState<number>(minCount);
  const [isMaxCount, setIsMaxCount] = useState<number>(maxCount);

  const onMinCountChange = (value: number): void => {
    setIsMinCount(value);
  };
  const onMaxCountChange = (value: number): void => {
    setIsMaxCount(value);
  };

  const isCount = (card: any): boolean => {
    return card.count >= isMinCount && card.count <= isMaxCount;
  };

  const minYear = 1940;
  const maxYear = 2020;

  const [isMinYear, setIsMinYear] = useState<number>(minYear);
  const [isMaxYear, setIsMaxYear] = useState<number>(maxYear);

  const onMinYearChange = (value: number): void => {
    setIsMinYear(value);
  };
  const onMaxYearChange = (value: number): void => {
    setIsMaxYear(value);
  };

  const isYear = (card: any): boolean => {
    return card.year >= isMinYear && card.year <= isMaxYear;
  };

  const [isBall, setIsBall] = useState<boolean>(false);
  const [isBell, setIsBell] = useState<boolean>(false);
  const [isCone, setIsCone] = useState<boolean>(false);
  const [isSnowflake, setIsSnowflake] = useState<boolean>(false);
  const [isToy, setIsToy] = useState<boolean>(false);

  const onBallClick = (): void => {
    isBall ? setIsBall(false) : setIsBall(true);
  };
  const onBellClick = (): void => {
    isBell ? setIsBell(false) : setIsBell(true);
  };
  const onConeClick = (): void => {
    isCone ? setIsCone(false) : setIsCone(true);
  };
  const onSnowflakeClick = (): void => {
    isSnowflake ? setIsSnowflake(false) : setIsSnowflake(true);
  };
  const onToyClick = (): void => {
    isToy ? setIsToy(false) : setIsToy(true);
  };

  const isShape = (card: any): boolean => {
    return (
      (isBall && card.shape === 'шар') ||
      (isBell && card.shape === 'колокольчик') ||
      (isCone && card.shape === 'шишка') ||
      (isSnowflake && card.shape === 'снежинка') ||
      (isToy && card.shape === 'фигурка')
    );
  };

  const isShapeAll = !isBall && !isBell && !isCone && !isSnowflake && !isToy;

  const [isWhite, setIsWhite] = useState<boolean>(false);
  const [isYellow, setIsYellow] = useState<boolean>(false);
  const [isRed, setIsRed] = useState<boolean>(false);
  const [isBlue, setIsBlue] = useState<boolean>(false);
  const [isGreen, setIsGreen] = useState<boolean>(false);

  const onWhiteClick = (): void => {
    isWhite ? setIsWhite(false) : setIsWhite(true);
  };
  const onYellowClick = (): void => {
    isYellow ? setIsYellow(false) : setIsYellow(true);
  };
  const onRedClick = (): void => {
    isRed ? setIsRed(false) : setIsRed(true);
  };
  const onBlueClick = (): void => {
    isBlue ? setIsBlue(false) : setIsBlue(true);
  };
  const onGreenClick = (): void => {
    isGreen ? setIsGreen(false) : setIsGreen(true);
  };

  const isColor = (card: any): boolean => {
    return (
      (isWhite && card.color === 'белый') ||
      (isYellow && card.color === 'желтый') ||
      (isRed && card.color === 'красный') ||
      (isBlue && card.color === 'синий') ||
      (isGreen && card.color === 'зелёный')
    );
  };

  const isColorAll = !isWhite && !isYellow && !isRed && !isBlue && !isGreen;

  const [isGreat, setIsGreat] = useState<boolean>(false);
  const [isMedium, setIsMedium] = useState<boolean>(false);
  const [isSmall, setIsSmall] = useState<boolean>(false);

  const onGreatClick = (): void => {
    isGreat ? setIsGreat(false) : setIsGreat(true);
  };
  const onMediumClick = (): void => {
    isMedium ? setIsMedium(false) : setIsMedium(true);
  };
  const onSmallClick = (): void => {
    isSmall ? setIsSmall(false) : setIsSmall(true);
  };

  const isSize = (card: any): boolean => {
    return (
      (isGreat && card.size === 'большой') ||
      (isMedium && card.size === 'средний') ||
      (isSmall && card.size === 'малый')
    );
  };

  const isSizeAll = !isGreat && !isMedium && !isSmall;

  const [isFavouriteState, setIsFavouriteState] = useState<boolean>(false);

  const onFavouriteClick = (): void => {
    isFavouriteState ? setIsFavouriteState(false) : setIsFavouriteState(true);
  };

  const isFavourite = (card: any): boolean => {
    return isFavouriteState && card.favorite === true;
  };

  const isFavouriteAll = !isFavouriteState;

  const cardIsShown = (card: any): boolean => {
    return (
      isSearch(card) &&
      isCount(card) &&
      isYear(card) &&
      (isShape(card) || isShapeAll) &&
      (isColor(card) || isColorAll) &&
      (isSize(card) || isSizeAll) &&
      (isFavourite(card) || isFavouriteAll)
    );
  };

  return (
    <div className={styles['toys']}>
      <div className={styles['settings']}>
        <Search onChange={onSearchChange} />
        <span className={styles['header']}>Фильтры</span>
        <span className={styles['subheader']}>Год покупки</span>
        <div className={styles['filters']}>
          <Range
            min={minYear}
            max={maxYear}
            minValue={isMinYear}
            maxValue={isMaxYear}
            onMinChange={onMinYearChange}
            onMaxChange={onMaxYearChange}
          />
        </div>
        <span className={styles['subheader']}>Количество</span>
        <div className={styles['filters']}>
          <Range
            min={minCount}
            max={maxCount}
            minValue={isMinCount}
            maxValue={isMaxCount}
            onMinChange={onMinCountChange}
            onMaxChange={onMaxCountChange}
          />
        </div>
        <span className={styles['subheader']}>Форма</span>
        <div className={styles['filters']}>
          <Button svg={ball} viewBox="0 0 64 64" label="Шар" onClick={onBallClick} />
          <Button svg={bell} viewBox="0 0 64 64" label="Колокол" onClick={onBellClick} />
          <Button svg={cone} viewBox="0 0 64 64" label="Шишка" onClick={onConeClick} />
          <Button svg={snowflake} viewBox="0 0 64 64" label="Снежинка" onClick={onSnowflakeClick} />
          <Button svg={toy} viewBox="0 0 400 557" label="Фигурка" onClick={onToyClick} />
        </div>
        <span className={styles['subheader']}>Цвет</span>
        <div className={styles['filters']}>
          <Checkbox boxColor="white" checkColor="black" onClick={onWhiteClick} />
          <Checkbox boxColor="yellow" checkColor="black" onClick={onYellowClick} />
          <Checkbox boxColor="red" onClick={onRedClick} />
          <Checkbox boxColor="blue" onClick={onBlueClick} />
          <Checkbox boxColor="green" onClick={onGreenClick} />
        </div>
        <span className={styles['subheader']}>Размер</span>
        <div className={styles['filters']}>
          <Checkbox label="Большой" onClick={onGreatClick} />
          <Checkbox label="Средний" onClick={onMediumClick} />
          <Checkbox label="Маленький" onClick={onSmallClick} />
        </div>
        <div className={styles['filters']} style={{ marginTop: 30 }}>
          <Checkbox label="Только любимые" onClick={onFavouriteClick} />
        </div>
        <span className={styles['header']}>Сортировка</span>
      </div>
      <div className={styles['cards']}>
        {data.map(
          (item, index) =>
            cardIsShown(item) && (
              <Card
                key={index.toString()}
                name={item.name}
                src={importToy(index + 1)}
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
