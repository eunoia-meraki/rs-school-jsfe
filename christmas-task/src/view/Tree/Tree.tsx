import { useState } from 'react';
import type { FC } from 'react';

import { Sound } from '@/components/Sound';
import { Snow } from '@/components/Snow';
import { TreeImage } from '@/components/TreeImage';
import { BgImage } from '@/components/BgImage';
import { ToyImage } from '@/components/ToyImage';

import { treeImages } from './treeImages';
import { bgImages } from './bgImages';
import { toyImages } from './toyImages';

import styles from './Tree.scss';

export const Tree: FC = () => {
  const [bgImage, setBgImage] = useState<string>(bgImages[0]);
  const [treeImage, setTreeImage] = useState<string>(treeImages[0]);

  const onSetBgImage = (bgImage: string): void => {
    setBgImage(bgImage);
  };

  const onSetTreeImage = (treeImage: string): void => {
    setTreeImage(treeImage);
  };

  return (
    <>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '180px',
          maxWidth: '420px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Sound />
          <div style={{ width: '40px' }}></div>
          <Snow />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <span className={styles['settings-header']}>Выберите елку</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
              {treeImages.map((image, index) => (
                <TreeImage
                  key={index.toString()}
                  treeImage={image}
                  onSetTreeImage={onSetTreeImage}
                />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <span className={styles['settings-header']}>Выберите фон</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
              {bgImages.map((image, index) => (
                <BgImage key={index.toString()} bgImage={image} onSetBgImage={onSetBgImage} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          flexGrow: 1,
          minWidth: '380px',
          backgroundPosition: 'center center',
          backgroundSize: '100% 100%',
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div
          style={{
            width: '360px',
            height: '540px',
            backgroundPosition: 'center center',
            backgroundSize: '100% 100%',
            backgroundImage: `url('${treeImage}')`,
          }}
        ></div>
      </div>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '180px',
          maxWidth: '420px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className={styles['settings-header']}>Игрушки</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {toyImages.map((image, index) => (
              <ToyImage key={index.toString()} toyImage={image} count={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
