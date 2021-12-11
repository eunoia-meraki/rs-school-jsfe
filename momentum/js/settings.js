import { translation } from './translation.js';
import { showGreeting, setNamePlaceholder } from './greeting.js';
import { getWeather, setCityPlaceholder } from './weather.js';
import { getQuote } from './quote.js';
import { setBg } from './background.js';

const settingsElement = document.querySelector('.settings');
const callout = document.querySelector('.callout');
const en = document.querySelector('.en');
const ru = document.querySelector('.ru');
const github = document.querySelector('.github');
const unsplash = document.querySelector('.unsplash');
const flickr = document.querySelector('.flickr');
const lang = document.querySelector('.callout-item-header-lang');
const api = document.querySelector('.callout-item-header-api');

const settings = {
  lang: 'en',
  api: 'github',
};

function displayCallout() {
  if (callout.style.display === 'flex') {
    callout.style.display = 'none';
  } else {
    callout.style.display = 'flex';
  }
}

function acceptLang(lang) {
  settings.lang = lang;
  setNamePlaceholder();
  setCityPlaceholder();
  showGreeting();
  getWeather();
  getQuote();
  getSettings();
}

function acceptApi(api) {
  settings.api = api;
  setBg();
}

function setInputListeners() {
  en.addEventListener('click', function () {
    if (en.checked) {
      acceptLang('en');
    }
  });
  ru.addEventListener('click', function () {
    if (ru.checked) {
      acceptLang('ru');
    }
  });
  github.addEventListener('click', function () {
    if (github.checked) {
      acceptApi('github');
    }
  });
  unsplash.addEventListener('click', function () {
    if (unsplash.checked) {
      acceptApi('unsplash');
    }
  });
  flickr.addEventListener('click', function () {
    if (flickr.checked) {
      acceptApi('flickr');
    }
  });
}

function setLocalStorage() {
  localStorage.setItem('lang', settings.lang);
  localStorage.setItem('api', settings.api);
  localStorage.setItem('callout-display', callout.style.display);
}

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    settings.lang = localStorage.getItem('lang');
  } else {
    settings.lang = 'en';
  }
  if (localStorage.getItem('api')) {
    settings.api = localStorage.getItem('api');
  } else {
    settings.api = 'github';
  }
  if (localStorage.getItem('callout-display')) {
    callout.style.display = localStorage.getItem('callout-display');
  }
}

function getChecks(value) {
  if (value === 'en') {
    en.checked = true;
    ru.checked = false;
  }
  if (value === 'ru') {
    en.checked = false;
    ru.checked = true;
  }
  if (value === 'github') {
    github.checked = true;
    unsplash.checked = false;
    flickr.checked = false;
  }
  if (value === 'unsplash') {
    github.checked = false;
    unsplash.checked = true;
    flickr.checked = false;
  }
  if (value === 'flickr') {
    github.checked = false;
    unsplash.checked = false;
    flickr.checked = true;
  }
}

function getSettings() {
  lang.textContent = translation[settings.lang].settings.lang;
  api.textContent = translation[settings.lang].settings.api;
  getChecks(settings.lang);
  getChecks(settings.api);
}

function plugSettings() {
  settingsElement.addEventListener('click', displayCallout);
  setInputListeners();
  window.addEventListener('load', getLocalStorage);
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getSettings);
}

export { settings };

export default plugSettings;
