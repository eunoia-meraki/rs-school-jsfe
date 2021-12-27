import type { CSSProperties, FC } from 'react';

interface ITreeImage {
  treeImage: string;
  onSetTreeImage: (treeImage: string) => void;
}

export const TreeImage: FC<ITreeImage> = ({ treeImage, onSetTreeImage }) => {
  const onClick = (): void => {
    onSetTreeImage(treeImage);
  };

  const style: CSSProperties = {
    height: '120px',
    width: '120px',
    cursor: 'pointer',
    borderRadius: '10px',
    backgroundImage: `url('${treeImage}')`,
    backgroundPosition: 'center center',
    backgroundSize: '120px 120px',
    backgroundColor: 'rgb(255, 255, 255, 0.5)',
  };

  return <div style={style} onClick={onClick}></div>;
};
