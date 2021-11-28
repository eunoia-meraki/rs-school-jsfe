import './Footer.css';

export class Footer {
  constructor() {}

  async render() {
    return `
      <footer class="footer">
        <div class="school-logo"></div>
        <span class="release-year">2021</span>
        <a class="school-reference" href="https://rs.school/js">CURSE</a>
      </footer>
    `;
  }

  async after_render() {}
}
