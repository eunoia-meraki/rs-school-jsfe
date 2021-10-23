const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum = getRandomNum();
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

// 1

function showTime() {
  const d = new Date();
  const currentTime = d.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}
showTime();

function showDate() {
  const d = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = d.toLocaleDateString('en-US', options);
  date.textContent = currentDate;
}

// 2

function getTimeOfDay() {
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const d = new Date();
  const hours = d.getHours();
  const index = Math.floor(hours / 6);
  const timeOfDay = timesOfDay[index];
  return timeOfDay;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}

function setLocalStorage() {
  localStorage.setItem('name', nameInput.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameInput.value = localStorage.getItem('name');
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

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  const rNum = randomNum.toString();
  const bgNum = rNum.length === 1 ? rNum.padStart(2, '0') : rNum;
  const src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  const bg = `url('${src}')`;

  const image = new Image();
  image.src = src;
  image.onload = () => {
    body.style.backgroundImage = bg;
  };
}
setBg();

function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
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
