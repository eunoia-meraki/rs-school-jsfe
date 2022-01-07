import type { ChangeEvent, CSSProperties, FC } from 'react';

import styles from './Range.scss';

interface IRange {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export const Range: FC<IRange> = ({ min, max, minValue, maxValue, onMinChange, onMaxChange }) => {
  const deltaMin = (minValue - min) / (max - min);
  const deltaMax = (maxValue - min) / (max - min);

  const width = 360;

  const innerBand: CSSProperties = {
    position: 'absolute',
    left: deltaMin * width,
    width: (deltaMax - deltaMin) * width,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#278d9f',
  };

  const onMinRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.valueAsNumber <= maxValue) {
      onMinChange(e.target.valueAsNumber);
    }
  };

  const onMaxRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.valueAsNumber >= minValue) {
      onMaxChange(e.target.valueAsNumber);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['outter-band']}>
        <input
          min={min}
          max={max}
          value={minValue}
          step={1}
          type="range"
          className={styles['range']}
          onChange={onMinRangeChange}
        />
        <input
          min={min}
          max={max}
          value={maxValue}
          step={1}
          type="range"
          className={styles['range']}
          onChange={onMaxRangeChange}
        />
        <div style={innerBand} />
      </div>
      <div className={styles['values']}>
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};
