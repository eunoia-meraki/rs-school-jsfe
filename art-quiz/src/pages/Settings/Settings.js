import './Settings.css';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export class Settings {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    const backButton = new BackButton('Settings');
    const backButtonHtml = await backButton.render();

    return `
      <header class="settings-header">
        ${backButtonHtml}
      </header>
      <main class="settings-main">
        <div class="setting">
          <span class="header">Звук</span>
          <input type="range" min="0" max="100" value="50" step="1" class="volume-slider">
        </div>
        <div class="setting">
          <span class="header">Игра на время</span>
          <div class="toggle">
            <div class="value-container">
              <span class="value">Off</span>
            </div>
            <label class="switch">
              <input type="checkbox">
              <span class="slide-block round"></span>
            </label>
          </div>
        </div>
        <div class="setting">
          <span class="header">Секунды</span>
          <div class="round-buttons-container">
            <div class="round-button plus"></div>
            <span class="counter">20</span>
            <div class="round-button minus"></div>
          </div>
        </div>
      </main>
      ${footerHtml}
    `;
  }

  async after_render() {
    const backButtonEl = document.querySelector('.back-button .icon');

    const sliderEl = document.querySelector('.slider');

    backButtonEl.addEventListener('click', e => {
      e.preventDefault();
      sliderEl.classList.toggle('moved');
    });
  }
}
