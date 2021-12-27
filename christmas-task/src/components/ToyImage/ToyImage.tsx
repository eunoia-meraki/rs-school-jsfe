import type { CSSProperties, FC } from 'react';

interface IToyImage {
  toyImage: string;
  count: number;
}

export const ToyImage: FC<IToyImage> = ({ toyImage, count }) => {
  const countStyle: CSSProperties = {
    position: 'relative',
    bottom: '10%',
    left: '70%',
    height: '24px',
    width: '24px',
    borderRadius: '100px',
    backgroundColor: '#24c5db',
    color: 'white',
    lineHeight: 1.5,
    textAlign: 'center',
  };

  const imageStyle: CSSProperties = {
    position: 'relative',
    top: '8%',
    left: '12%',
    height: '60px',
    width: '60px',
    cursor: 'grab',
  };

  const bgStyle: CSSProperties = {
    height: '80px',
    width: '80px',
    borderRadius: '10px',
    backgroundColor: 'rgb(255, 255, 255, 0.5)',
  };

  return (
    <>
      <div style={bgStyle}>
        <img src={toyImage} style={imageStyle}></img>
        <div style={countStyle}>{count}</div>
      </div>
    </>
  );
};
