import styles from './Timer.css';

export class Timer {
  static index = 0;

  constructor(seconds, onTimeExpired) {
    this.seconds = seconds;
    this.s = this.seconds % 60;
    this.m = Math.floor(this.seconds / 60);
    this.isStopped = false;
    this.onTimeExpired = onTimeExpired;

    Timer.index++;
    this.id = `time-${Timer.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['timer']}"></div>
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
    const timerElement = document.getElementById(this.id);

    const timer = () => {
      if (!this.isStopped) {
        timerElement.textContent = this.m + ':' + (this.s > 9 ? this.s : '0' + this.s);
        if (this.s === 0) {
          if (this.m !== 0) {
            this.m--;
            this.s = 59;
          } else {
            this.onTimeExpired();
            return;
          }
        } else {
          this.s--;
        }
        setTimeout(timer, 1000);
      } else {
        setTimeout(timer, 1);
      }
    };

    timer();
  }
}
