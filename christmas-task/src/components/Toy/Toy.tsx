import { useState } from 'react';
import type { FC, DragEvent } from 'react';

import { DataItem } from '@/types/shared';

import styles from './Toy.scss';

interface IShift {
  x: number;
  y: number;
}
interface IToy {
  dataItem: DataItem;
  tree: HTMLElement | undefined;
}

export const Toy: FC<IToy> = ({ dataItem, tree }) => {
  const [slot, setSlot] = useState<HTMLElement | undefined>(undefined);
  const [count, setCount] = useState<number>(Number(dataItem.count));
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
        {[...Array(Number(dataItem.count)).keys()].map((_, index) => (
          <img
            key={index.toString()}
            className={styles['toy']}
            src={importToy(dataItem.num)}
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

const importToy = (number: string): string => {
  return require(`@/assets/toys/${number}.png`);
};