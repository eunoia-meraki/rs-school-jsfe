import styles from './Toggle.css';

export class Toggle {
  static index = 0;

  constructor() {
    Toggle.index++;
    this.id = `toggle-${Toggle.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['toggle']}">
        <div class="${styles['value']}">Выкл</div>
        <label>
          <input type="checkbox">
          <span class="${styles['slider']} ${styles['round']}"></span>
        </label>
      </div>
    `;
  }

  async afterRender() {
    const toggleElement = document.getElementById(this.id);
    const toggleInputElement = toggleElement.querySelector('input');
    const toggleValueElement = document.querySelector(`.${styles['value']}`);

    toggleInputElement.checked = localStorage.getItem('time') === 'Вкл';
    toggleValueElement.textContent = localStorage.getItem('time') ?? 'Выкл';

    toggleElement.addEventListener('mouseup', () => {
      if (toggleInputElement.checked) {
        toggleValueElement.textContent = 'Выкл';
        localStorage.setItem('time', 'Выкл');
      } else {
        toggleValueElement.textContent = 'Вкл';
        localStorage.setItem('time', 'Вкл');
      }
    });
  }
}
