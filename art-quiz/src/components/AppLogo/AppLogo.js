import styles from './AppLogo.css';

export class AppLogo {
  static index = 0;

  constructor(onClick) {
    this.onClick = onClick;

    AppLogo.index += 1;
    this.id = `app-logo-${AppLogo.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['app-logo']}">
        <div class="${styles.icon}">
          <div></div>
          <div></div>
        </div>
        <div class="${styles.text}">
          <span>Art</span>
          <span>Quiz</span>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const appLogoElement = document.getElementById(this.id);
    appLogoElement.addEventListener('click', this.onClick);
  }
}
