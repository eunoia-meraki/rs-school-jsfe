import playList from './playList.js';

const play = document.querySelector('.play');
const playPrevElement = document.querySelector('.play-prev');
const playNextElement = document.querySelector('.play-next');
const playListElement = document.querySelector('.play-list');

playList.forEach(song => {
  const playItem = document.createElement('li');
  playItem.classList.add('play-item');
  playItem.textContent = song.title;
  playListElement.append(playItem);
});

const playItems = document.querySelectorAll('.play-item');

let playNumber = 0;

const audio = new Audio();
audio.src = playList[playNumber].src;
audio.currentTime = 0;

let isPlay = false;

function playAudio() {
  if (!isPlay) {
    play.classList.add('pause');
    audio.play();
    isPlay = true;
  } else {
    play.classList.remove('pause');
    audio.pause();
    isPlay = false;
  }
  playItems[playNumber].classList.add('item-active');
}

function playNext() {
  isPlay = false;
  playItems[playNumber].classList.remove('item-active');
  if (playNumber === 3) {
    playNumber = 0;
  } else {
    playNumber++;
  }
  audio.src = playList[playNumber].src;
  audio.currentTime = 0;
  playAudio();
}

function playPrev() {
  isPlay = false;
  playItems[playNumber].classList.remove('item-active');
  if (playNumber === 0) {
    playNumber = 3;
  } else {
    playNumber--;
  }
  audio.src = playList[playNumber].src;
  audio.currentTime = 0;
  playAudio();
}

function plugPlayer() {
  play.addEventListener('click', playAudio);
  playNextElement.addEventListener('click', playNext);
  playPrevElement.addEventListener('click', playPrev);
}

export default plugPlayer;
