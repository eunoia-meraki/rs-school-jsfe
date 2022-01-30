import styles from './Time.css';

export class Time {
  static index = 0;

  constructor(onTimeExpired) {
    this.seconds = localStorage.getItem('seconds') ?? 20;
    this.s = this.seconds % 60;
    this.m = Math.floor(this.seconds / 60);
    this.isStopped = false;
    this.onTimeExpired = onTimeExpired;

    Time.index += 1;
    this.id = `time-${Time.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles.time}"></div>
    `;
  }

  run() {
    this.isStopped = false;
  }

  stop() {
    this.isStopped = true;
  }

  reset() {
    this.s = this.seconds % 60;
    this.m = Math.floor(this.seconds / 60);
  }

  async afterRender() {
    const timeElement = document.getElementById(this.id);

    const time = () => {
      if (!this.isStopped) {
        timeElement.textContent = this.m + ':' + (this.s > 9 ? this.s : '0' + this.s);
        if (this.s === 0) {
          if (this.m === 0) {
            this.onTimeExpired();
            this.stop();
          } else {
            this.m -= 1;
            this.s = 59;
          }
        } else {
          this.s -= 1;
        }
        setTimeout(time, 1000);
      } else {
        setTimeout(time, 1);
      }
    };

    time();
  }
}
