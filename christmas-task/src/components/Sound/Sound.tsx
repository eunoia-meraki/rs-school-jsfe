import { useState } from 'react';
import type { CSSProperties, FC } from 'react';

import AudioSvg from '@/assets/svg/audio.svg';
import AudioMp3 from '@/assets/audio/audio.mp3';

const audio = new Audio(AudioMp3);

export const Sound: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const playAudio = (): void => {
    audio.play();
  };

  const stopAudio = (): void => {
    audio.pause();
    audio.currentTime = 0;
  };

  const onClick = (): void => {
    if (isActive) {
      setIsActive(false);
      stopAudio();
    } else {
      setIsActive(true);
      playAudio();
    }
  };

  const style: CSSProperties = {
    height: '40px',
    width: '40px',
    cursor: 'pointer',
    transition: '0.3s fill',
    opacity: isActive ? 0.6 : 1,
  };

  return <AudioSvg viewBox="0 0 128 128" style={style} onClick={onClick} />;
};
