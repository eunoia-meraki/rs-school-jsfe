import { useState } from 'react';
import type { CSSProperties, FC } from 'react';

import SnowSvg from '@/assets/svg/Snow.svg';

export const Snow: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const onClick = (): void => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const style: CSSProperties = {
    height: '40px',
    width: '40px',
    cursor: 'pointer',
    opacity: isActive ? 0.6 : 1,
  };

  return <SnowSvg viewBox="0 0 128 128" style={style} onClick={onClick} />;
};
