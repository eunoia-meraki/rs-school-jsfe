import './Settings.css';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { AppLogo } from '@/components/AppLogo';

export class Settings {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    const backButton = new BackButton('Settings');
    const backButtonHtml = await backButton.render();

    const appLogo = new AppLogo();
    const appLogoHtml = await appLogo.render();

    return `
      <header class="settings-header">
        <div class="aligning-container">
          ${backButtonHtml}
          ${appLogoHtml}
        </div>
      </header>
      <main class="settings-main">
        <div class="setting">
          <span class="header">Volume</span>
          <input type="range" min="0" max="100" value="50" step="1" class="volume-slider">
        </div>
        <div class="setting">
          <span class="header">Game time</span>
          <div class="toggle">
            <div class="value-container">
              <span class="value">Off</span>
            </div>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="setting">
          <span class="header">Time to answer</span>
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

    const pages = document.querySelector('.pages-container');

    backButtonEl.addEventListener('click', e => {
      e.preventDefault();
      
      pages.classList.remove('settings-is-active');
      pages.classList.add('home-is-active');
    });
  }
}
