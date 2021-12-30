import { useEffect, useState } from 'react';
import type { FC, DragEvent } from 'react';

import { Sound } from '@/components/Sound';
import { Snow } from '@/components/Snow';
import { Tree } from '@/components/Tree';
import { Background } from '@/components/Background';
import { Toy } from '@/components/Toy';

import { Snowfall } from './Snowfall';

import { trees, backgrounds, toys } from './images';

import styles from './Trees.scss';

export const Trees: FC = () => {
  const [snowIsFalling, setSnowIsFalling] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>(backgrounds[0]);
  const [treeImage, setTreeImage] = useState<string>(trees[0]);

  const onSetBgImage = (bgImage: string): void => {
    setBgImage(bgImage);
  };

  const onSetTreeImage = (treeImage: string): void => {
    setTreeImage(treeImage);
  };

  const onSnowClick = (): void => {
    snowIsFalling ? setSnowIsFalling(false) : setSnowIsFalling(true);
  };

  const [tree, setTree] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const tree = document.getElementById('tree');
    setTree(tree!);
  }, []);

  const onDragOver = (e: DragEvent): void => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles['settings-group']}>
        <div className={styles['buttons']}>
          <Sound />
          <div style={{ width: '30px' }}></div>
          <Snow onSnowClick={onSnowClick} />
        </div>
        <span className={styles['settings-header']}>Выберите елку</span>
        <div className={styles['settings']}>
          {trees.map((src, index) => (
            <Tree key={index.toString()} src={src} onSetTreeImage={onSetTreeImage} />
          ))}
        </div>
        <span className={styles['settings-header']}>Выберите фон</span>
        <div className={styles['settings']}>
          {backgrounds.map((src, index) => (
            <Background key={index.toString()} src={src} onSetBgImage={onSetBgImage} />
          ))}
        </div>
      </div>
      <div className={styles['background']} style={{ backgroundImage: `url('${bgImage}')` }}>
        {snowIsFalling && <Snowfall />}
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
        <span className={styles['settings-header']} style={{ marginTop: '0px' }}>
          Игрушки
        </span>
        <div className={styles['settings']}>
          {toys.map((src, index) => (
            <Toy key={index.toString()} src={src} initialCount={index} tree={tree} />
          ))}
        </div>
      </div>
    </>
  );
};
