import playList from './playList.js';
import { showTime } from './time.js';

const nameElement = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

showTime();

function setLocalStorage() {
  localStorage.setItem('name', nameElement.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameElement.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  } else {
    city.value = 'Moscow';
    getWeather();
  }
}
window.addEventListener('load', getLocalStorage);

// 3

function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

let bgNumber = getRandomNumber();

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
// setBgFromGitHub();

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
// setBgFromUnsplash();

// async function setBgFromFlickr() {
//   const timeOfDay = getTimeOfDay();
//   const res = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f2286d4a4a579fa5a7d99f34de6a7dc9&tags=nature&${timeOfDay}&tags_mode=all&extras=url_l&format=json&nojsoncallback=1`);
//   const data = await res.json();
//   console.log(data.photos.photo[0].url_l);
//   const imgSrc = data.photos.photo[0].url_l;
//   const bgUrl = `url('${imgSrc}')`;

//   const img = new Image();
//   img.src = imgSrc;
//   img.onload = () => {
//     body.style.backgroundImage = bgUrl;
//   };
// }
// setBgFromFlickr();

function getSlideNext() {
  if (bgNumber === 20) {
    bgNumber = 1;
  } else {
    bgNumber++;
  }
  setBgFromGitHub();
  // setBgFromUnsplash();
  // setBgFromFlickr();
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (bgNumber === 1) {
    bgNumber = 20;
  } else {
    bgNumber--;
  }
  setBgFromGitHub();
  // setBgFromUnsplash();
  // setBgFromFlickr();
}
slidePrev.addEventListener('click', getSlidePrev);

// 4

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0f4d8e76185a8fbdaf53b247b8c48fd1&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = '';
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } catch (error) {
    weatherIcon.className = '';
    weatherError.textContent = `Error! Nothing to geocode for '${city.value}'!`;
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}
city.addEventListener('change', getWeather);

// 5

async function getQuote() {
  const path = 'assets/quotes/quotes.json';
  const res = await fetch(path);
  const data = await res.json();
  const quoteNumber = Math.floor(Math.random() * data.quotes.length);
  quote.textContent = data.quotes[quoteNumber].quote;
  author.textContent = data.quotes[quoteNumber].author;
}
getQuote();
changeQuote.addEventListener('click', getQuote);

// 6

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
play.addEventListener('click', playAudio);

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
playNextElement.addEventListener('click', playNext);

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
playPrevElement.addEventListener('click', playPrev);

// function addPlaceholderAfterLoad() {
//   if (!localStorage.getItem('name')) {
//     nameElement.setAttribute('placeholder', '[Enter name]');
//   }
// }
// window.addEventListener('load', addPlaceholderAfterLoad);

// function addPlaceholderAfterChange() {
//   if (nameElement.value === '') {
//     nameElement.setAttribute('placeholder', '[Enter name]');
//   }
// }
// nameElement.addEventListener('change', addPlaceholderAfterChange);
