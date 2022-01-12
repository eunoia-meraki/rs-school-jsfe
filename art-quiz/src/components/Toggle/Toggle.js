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

    toggleInputElement.checked = localStorage.getItem('isTimer') === 'true';
    
    toggleValueElement.textContent =  toggleInputElement.checked ? 'Вкл' : 'Выкл';

    toggleElement.addEventListener('mouseup', () => {
      toggleValueElement.textContent = toggleInputElement.checked ? 'Выкл' : 'Вкл';
      localStorage.setItem('isTimer', !toggleInputElement.checked);
    });
  }
}
