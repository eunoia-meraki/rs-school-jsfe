import './AppLogo.css';

export class AppLogo {
  constructor() {}

  async render() {
    return `
      <div class="app-logo">
        <div class="icon">
          <div></div>
          <div></div>
        </div>
        <div class="text">
          <span>Art</span>
          <span>Quiz</span>
        </div>
      </div>
    `;
  }

  async after_render() {}
}
