import styles from './BigAppLogo.css';

export class BigAppLogo {
  static index = 0;

  constructor() {
    BigAppLogo.index++;
    this.id = `big-app-logo-${BigAppLogo.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['big-app-logo']}">
        <div class="${styles['icon']}">
          <div></div>
          <div></div>
        </div>
        <div class="${styles['text']}">
          <span>Art</span>
          <span>Quiz</span>
        </div>
      </div>
    `;
  }

  async afterRender() {}
}
