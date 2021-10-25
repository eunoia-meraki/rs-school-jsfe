import { translation} from './translation.js';
import { settings } from './settings.js';

const time = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
}

function showDate() {
  const date = new Date();
  const currentDate = date.toLocaleDateString(translation[settings.lang].date.locale, options);
  dateElement.textContent = currentDate;
}

function plugTime() {
  window.addEventListener('load', showTime);
}

export default plugTime;
export { showDate };

