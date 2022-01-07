import { useEffect, useState } from 'react';
import type { FC, DragEvent } from 'react';

import { Garland } from './Garland';
import { GarlandButtons } from './GarlandButtons';
import { Snowfall } from './Snowfall';
import styles from './Trees.scss';

import audio from '@/assets/audio/audio.mp3';
import music from '@/assets/svg/audio.svg';
import snowfall from '@/assets/svg/snow.svg';
import { Background } from '@/components/Background';
import { Button } from '@/components/Button';
import { Toy } from '@/components/Toy';
import { Tree } from '@/components/Tree';
import { backgrounds, data, trees } from '@/data';
import { DataItem } from '@/types/shared';

const song = new Audio(audio);

interface ITrees {
  favourites: DataItem[];
}

export const Trees: FC<ITrees> = ({ favourites }) => {
  const [isMusicPressed, setIsMusicPressed] = useState<boolean>(false);

  const onMusicClick = (): void => {
    if (isMusicPressed) {
      setIsMusicPressed(false);
      song.pause();
      song.currentTime = 0;
    } else {
      setIsMusicPressed(true);
      // eslint-disable-next-line no-void
      void song.play();
    }
  };

  const [isSnowfallPressed, setIsSnowfallPressed] = useState<boolean>(false);

  const onSnowfallClick = (): void => {
    if (isSnowfallPressed) {
      setIsSnowfallPressed(false);
    } else {
      setIsSnowfallPressed(true);
    }
  };

  const [backgroundImage, setBackgroundImage] = useState<string>(backgrounds[0]);

  const onSetBackgroundImage = (image: string): void => {
    setBackgroundImage(image);
  };

  const [treeImage, setTreeImage] = useState<string>(trees[0]);

  const onSetTreeImage = (image: string): void => {
    setTreeImage(image);
  };

  const [garlandColor, setGarlandColor] = useState<string>('none');

  const onSetGarlandColor = (color: string): void => {
    setGarlandColor(color);
  };

  const onDragOver = (e: DragEvent): void => {
    e.preventDefault();
  };

  const [tree, setTree] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const treeElement = document.getElementById('tree');
    setTree(treeElement!);
  }, []);

  return (
    <div className={styles['trees']}>
      <div className={styles['settings-group']}>
        <div className={styles['buttons']}>
          <Button
            svg={music}
            viewBox="0 0 128 128"
            label="Музыка"
            isPressed={isMusicPressed}
            onClick={onMusicClick}
          />
          <Button
            svg={snowfall}
            viewBox="0 0 128 128"
            label="Снегопад"
            isPressed={isSnowfallPressed}
            onClick={onSnowfallClick}
          />
        </div>
        <span className={styles['header']}>Выберите елку</span>
        <div className={styles['settings']}>
          {trees.map((image, index) => (
            <Tree key={index.toString()} image={image} onSetImage={onSetTreeImage} />
          ))}
        </div>
        <span className={styles['header']}>Выберите фон</span>
        <div className={styles['settings']}>
          {backgrounds.map((image, index) => (
            <Background key={index.toString()} image={image} onSetImage={onSetBackgroundImage} />
          ))}
        </div>
        <span className={styles['header']}>Гирлянда</span>
        <GarlandButtons onSetGarlandColor={onSetGarlandColor} />
      </div>
      <div
        className={styles['background']}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div id="tree" className={styles['tree']}>
          <img src={treeImage} useMap="#image-map" alt="tree" />
          <map name="image-map" onDragOver={onDragOver}>
            <area
              coords="26,443,14,566,110,681,200,708,260,706,321,704,363,698,440,673,478,593,494,539,449,453,424,356,391,235,346,142,304,70,251,2,231,32,165,129,114,221,78,354"
              shape="poly"
              alt=""
              aria-label=""
              aria-labelledby=""
            />
          </map>
          {garlandColor !== 'none' && <Garland color={garlandColor} />}
        </div>
        {isSnowfallPressed && <Snowfall />}
      </div>
      <div className={styles['settings-group']}>
        <span className={styles['header']} style={{ marginTop: 0 }}>
          Игрушки
        </span>
        <div className={styles['settings']}>
          {favourites.length !== 0
            ? favourites.map((dataItem, index) => (
              <Toy key={index.toString()} dataItem={dataItem} tree={tree} />
            ))
            : data
              .slice(0, 20)
              .map((dataItem, index) => (
                <Toy key={index.toString()} dataItem={dataItem} tree={tree} />
              ))}
        </div>
      </div>
    </div>
  );
};
