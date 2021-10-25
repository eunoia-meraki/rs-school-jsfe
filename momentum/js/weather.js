import { translation } from './translation.js';
import { settings } from './settings.js';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${translation[settings.lang].weather.locale}&appid=0f4d8e76185a8fbdaf53b247b8c48fd1&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = '';
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${translation[settings.lang].weather.wind}: ${data.wind.speed} ${translation[settings.lang].weather.units}`;
    humidity.textContent = `${translation[settings.lang].weather.humidity}: ${data.main.humidity}%`;
  } catch (error) {
    weatherIcon.className = '';
    weatherError.textContent = `Error! Nothing to geocode for '${city.value}'!`;
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}

function setLocalStorage() {
  localStorage.setItem('city', city.value);
}

function getLocalStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = translation[settings.lang].weather.city;
  }
}

function setPlaceholderAfterLoad() {
  if (!localStorage.getItem('city')) {
    city.setAttribute('placeholder', translation[settings.lang].weather.placeholder);
  }
}

function setPlaceholderAfterChange() {
  if (city.value === 'city') {
    city.setAttribute('placeholder', translation[settings.lang].weather.placeholder);
  }
}

function setCityPlaceholder() {
  city.setAttribute('placeholder', translation[settings.lang].greeting.placeholder);
}

function plugWeather() {
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
  window.addEventListener('load', setPlaceholderAfterLoad);
  city.addEventListener('change', setPlaceholderAfterChange);
  city.addEventListener('change', getWeather);
  window.addEventListener('load', getWeather);
}

export default plugWeather;
export { getWeather, setCityPlaceholder };
