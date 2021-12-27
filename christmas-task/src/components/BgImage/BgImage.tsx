import type { CSSProperties, FC } from 'react';

interface IBgImage {
  bgImage: string;
  onSetBgImage: (bgImage: string) => void;
}

export const BgImage: FC<IBgImage> = ({ bgImage, onSetBgImage }) => {
  const onClick = (): void => {
    onSetBgImage(bgImage);
  };

  const style: CSSProperties = {
    height: '60px',
    width: '60px',
    cursor: 'pointer',
    borderRadius: '10px',
    backgroundImage: `url('${bgImage}')`,
    backgroundPosition: 'center center',
    backgroundSize: '60px 60px',
    backgroundColor: 'rgb(255, 255, 255, 0.5)',
  };

  return <div style={style} onClick={onClick}></div>;
};
