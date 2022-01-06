import { useEffect, useState } from 'react';
import type { FC, DragEvent } from 'react';

import { Button } from '@/components/Button';
import { Tree } from '@/components/Tree';
import { Background } from '@/components/Background';
import { Toy } from '@/components/Toy';

import { Snowfall } from './Snowfall';

import music from '@/assets/svg/audio.svg';
import snowfall from '@/assets/svg/snow.svg';
import audio from '@/assets/audio/audio.mp3';

import { trees, backgrounds } from './images';

import { data } from '@/data';

import { useFavouritesContext } from '@/App';

import styles from './Trees.scss';

const song = new Audio(audio);

export const Trees: FC = () => {
  const [isMusicPressed, setIsMusicPressed] = useState<boolean>(false);

  const onMusicClick = (): void => {
    if (isMusicPressed) {
      setIsMusicPressed(false);
      song.pause();
      song.currentTime = 0;
    } else {
      setIsMusicPressed(true);
      song.play();
    }
  };

  const [isSnowfallPressed, setIsSnowfallPressed] = useState<boolean>(false);

  const onSnowfallClick = (): void => {
    isSnowfallPressed ? setIsSnowfallPressed(false) : setIsSnowfallPressed(true);
  };

  const [backgroundImage, setBackgroundImage] = useState<string>(backgrounds[0]);

  const onSetBackgroundImage = (image: string): void => {
    setBackgroundImage(image);
  };

  const [treeImage, setTreeImage] = useState<string>(trees[0]);

  const onSetTreeImage = (image: string): void => {
    setTreeImage(image);
  };

  const [tree, setTree] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const tree = document.getElementById('tree');
    setTree(tree!);
  }, []);

  const onDragOver = (e: DragEvent): void => {
    e.preventDefault();
  };

  const favouritesContext = useFavouritesContext();

  const favourites = favouritesContext?.getFavourites();

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
      </div>
      <div
        className={styles['background']}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        {isSnowfallPressed && <Snowfall />}
        <div id="tree" className={styles['tree']}>
          <img src={treeImage} useMap="#image-map"></img>
          <map name="image-map" onDragOver={onDragOver}>
            <area
              coords="26,443,14,566,110,681,200,708,260,706,321,704,363,698,440,673,478,593,494,539,449,453,424,356,391,235,346,142,304,70,251,2,231,32,165,129,114,221,78,354"
              shape="poly"
            ></area>
          </map>
        </div>
      </div>
      <div className={styles['settings-group']}>
        <span className={styles['header']} style={{ marginTop: 0 }}>
          Игрушки
        </span>
        <div className={styles['settings']}>
          {favourites?.length !== 0
            ? favourites?.map((dataItem, index) => (
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
