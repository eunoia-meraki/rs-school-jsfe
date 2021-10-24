import { showGreeting } from './greeting.js';

const time = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}

function showDate() {
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', options);
  dateElement.textContent = currentDate;
}

export { showTime, showDate };
