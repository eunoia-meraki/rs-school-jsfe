import styles from './Counter.css';

export class Counter {
  static index = 0;

  constructor() {
    Counter.index++;
    this.id = `counter-${Counter.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['counter']}">
        <div class="${styles['plus']}"></div>
        <div class="${styles['value']}"></div>
        <div class="${styles['minus']}"></div>
      </div>
    `;
  }

  async afterRender() {
    const counterElement = document.getElementById(this.id);
    const plusElement = counterElement.querySelector(`.${styles['plus']}`);
    const minusElement = counterElement.querySelector(`.${styles['minus']}`);
    const valueElement = counterElement.querySelector(`.${styles['value']}`);

    valueElement.textContent = localStorage.getItem('seconds') ?? 20;

    plusElement.addEventListener('mouseup', () => {
      if (+valueElement.textContent < 99) {
        valueElement.textContent = +valueElement.textContent + 1;
      }
      localStorage.setItem('seconds', valueElement.textContent);
    });

    minusElement.addEventListener('mouseup', () => {
      if (+valueElement.textContent > 0) {
        valueElement.textContent = +valueElement.textContent - 1;
      }
      localStorage.setItem('seconds', valueElement.textContent);
    });
  }
}
