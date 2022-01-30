import styles from './Footer.css';

export class Footer {
  // constructor() {}

  // eslint-disable-next-line class-methods-use-this
  async render() {
    return `
      <footer class="${styles.footer}">
        <div class="${styles.logo}"></div>
        <span>2021</span>
        <a href="https://rs.school/js">Курс</a>
      </footer>
    `;
  }
}
