import styles from './Footer.css';

export class Footer {
  constructor() {}

  async render() {
    return `
      <footer class="${styles['footer']}">
        <div class="${styles['logo']}"></div>
        <span>2021</span>
        <a href="https://rs.school/js">Курс</a>
      </footer>
    `;
  }

  async afterRender() {}
}
