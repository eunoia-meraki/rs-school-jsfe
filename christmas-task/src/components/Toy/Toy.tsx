import { FC, useState, DragEvent, MouseEvent, useRef, createRef, useEffect } from 'react';

import styles from './Toy.scss';

interface IToy {
  src: string;
  initialCount: number;
  tree: HTMLElement | undefined;
}

interface IShift {
  x: number;
  y: number;
}

export const Toy: FC<IToy> = ({ src, initialCount, tree }) => {
  const [slot, setSlot] = useState<HTMLElement | undefined>(undefined);
  const [count, setCount] = useState<number>(initialCount);
  const [shift, setShift] = useState<IShift>({ x: 0, y: 0 });

  const onDragStart = (e: DragEvent): void => {
    const toy = e.target as HTMLElement;

    const shiftX = e.clientX - toy.getBoundingClientRect().left;
    const shiftY = e.clientY - toy.getBoundingClientRect().top;

    setShift({ x: shiftX, y: shiftY });

    if (!slot) {
      setSlot(toy.parentElement!);
    }
  };

  const onDragEnd = (e: DragEvent): void => {
    const toy = e.target as HTMLElement;

    const dropEffect = e.dataTransfer.dropEffect;

    if (dropEffect === 'copy') {
      const top =
        ((e.pageY - shift.y - document.body.clientHeight + 90 + tree!.clientHeight) /
          tree!.clientHeight) *
        100;
      const left =
        ((e.pageX - shift.x - (document.body.clientWidth - tree!.clientWidth) / 2) /
          tree!.clientWidth) *
        100;

      toy.style.top = `${top}%`;
      toy.style.left = `${left}%`;

      if (toy.parentElement === slot) {
        tree!.append(toy);
        setCount(count - 1);
      }
    } else {
      if (toy.parentElement === tree) {
        toy.style.top = '8%';
        toy.style.left = '12%';
        slot!.append(toy);
        setCount(count + 1);
      }
    }
  };

  const onDragOver = (e: DragEvent): void => {
    const toy = e.target as HTMLElement;

    if (toy.parentElement === tree) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className={styles['slot']}>
        <div className={styles['count']}>{count}</div>
        {[...Array(initialCount).keys()].map((_, index) => (
          <img
            key={index.toString()}
            className={styles['toy']}
            src={src}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          ></img>
        ))}
      </div>
    </>
  );
};
