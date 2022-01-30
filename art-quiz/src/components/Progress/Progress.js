import styles from './Progress.css';

export class Progress {
  static index = 0;

  constructor() {
    Progress.index += 1;
    this.id = `progress-${Progress.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles.progress}">
        <span class="left">0</span>
        <input type="range" min="0" max="10" value="0" step="1">
        <span class="right">10</span>
      </div>
    `;
  }

  async stepUp() {
    const progressElement = document.getElementById(this.id);
    const progressInputElement = progressElement.querySelector('input');
    progressInputElement.value = +progressInputElement.value + 1;

    const leftLimit = progressElement.querySelector('.left');
    leftLimit.textContent = progressInputElement.value;
  }
}
