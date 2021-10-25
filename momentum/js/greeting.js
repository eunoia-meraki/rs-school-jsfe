import { translation } from './translation.js';
import { settings } from './settings.js';

const greeting = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const index = Math.floor(hours / 6);
  return timesOfDay[index];
}

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  const index = Math.floor(hours / 6);
  greeting.textContent = translation[settings.lang].greeting.value[index] + ',';
  setTimeout(showGreeting, 1000);
}

function setLocalStorage() {
  localStorage.setItem('name', nameElement.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameElement.value = localStorage.getItem('name');
  }
}

function setPlaceholderAfterLoad() {
  if (!localStorage.getItem('name')) {
    setNamePlaceholder();
  }
}

function setPlaceholderAfterChange() {
  if (nameElement.value === '') {
    setNamePlaceholder();
  }
}

function setNamePlaceholder() {
  nameElement.setAttribute('placeholder', translation[settings.lang].greeting.placeholder);
}

function plugGreeting() {
  window.addEventListener('load', getLocalStorage);
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', setPlaceholderAfterLoad);
  nameElement.addEventListener('change', setPlaceholderAfterChange);
  window.addEventListener('load', showGreeting);
}

export default plugGreeting;
export { getTimeOfDay, showGreeting, setNamePlaceholder };
