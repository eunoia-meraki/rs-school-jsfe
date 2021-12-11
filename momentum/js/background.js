import { getTimeOfDay } from './greeting.js';
import { settings } from './settings.js';

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

let bgNumber = Math.floor(Math.random() * 20) + 1;

function setBgFromGitHub() {
  const timeOfDay = getTimeOfDay();
  const bgString = bgNumber.toString();
  const imgName = bgString.length === 1 ? bgString.padStart(2, '0') : bgString.toString();
  const imgSrc = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imgName}.jpg`;
  const bgUrl = `url('${imgSrc}')`;

  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    body.style.backgroundImage = bgUrl;
  };
}

async function setBgFromUnsplash() {
  const timeOfDay = getTimeOfDay();
  const res = await fetch(`https://api.unsplash.com/photos/random?query=nature&${timeOfDay}&client_id=LVSbC70JsFn0bqTds-41aCbJuLpyyKUqyHcjyZK-mww`);
  const data = await res.json();
  const imgSrc = data.urls.regular;
  const bgUrl = `url('${imgSrc}')`;

  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    body.style.backgroundImage = bgUrl;
  };
}

async function setBgFromFlickr() {
  const timeOfDay = getTimeOfDay();
  const res = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f2286d4a4a579fa5a7d99f34de6a7dc9&tags=nature&${timeOfDay}&tags_mode=all&extras=url_l&format=json&nojsoncallback=1&per_page=50`,
  );
  const data = await res.json();
  const photos = data.photos.photo;
  const imgSrc = photos[Math.floor(Math.random() * photos.length)].url_l;
  const bgUrl = `url('${imgSrc}')`;

  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    body.style.backgroundImage = bgUrl;
  };
}

const setBgDict = {
  github: setBgFromGitHub,
  unsplash: setBgFromUnsplash,
  flickr: setBgFromFlickr,
};

function setBg() {
  setBgDict[settings.api]();
}

function getSlideNext() {
  if (bgNumber === 20) {
    bgNumber = 1;
  } else {
    bgNumber++;
  }
  setBg();
}

function getSlidePrev() {
  if (bgNumber === 1) {
    bgNumber = 20;
  } else {
    bgNumber--;
  }
  setBg();
}

function plugBackground() {
  slideNext.addEventListener('click', getSlideNext);
  slidePrev.addEventListener('click', getSlidePrev);
  window.addEventListener('load', setBg);
}

export { setBg };

export default plugBackground;
