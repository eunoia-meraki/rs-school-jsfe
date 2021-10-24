const greeting = document.querySelector('.greeting');
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const index = Math.floor(hours / 6);
  return timesOfDay[index];
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay}`;
}

export { getTimeOfDay, showGreeting };
