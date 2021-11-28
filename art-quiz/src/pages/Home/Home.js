import './Home.css';
import { Footer } from '@/components/Footer';
import { Settings } from '@/pages/Settings';

export class Home {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    return `
      <div class="pages-container home-is-active">
        <div class="home page">
          <header class="home-header">
            <a class="settings-button" href="/"></a>
          </header>
          <main class="home-main">
            <div class="big-app-logo">
              <div class="icon">
                <div></div>
                <div></div>
              </div>
              <div class="text">
                <span>Art</span>
                <span>Quiz</span>
              </div>
            </div>
            <div class="start-buttons-container">
              <a class="start-button" href="/#/categories">Artists</a>
              <a class="start-button" href="/#/categories">Pictures</a>
            </div>
          </main>
          ${footerHtml}
        </div>
      </div>
    `;
  }

  async after_render() {
    const pages = document.querySelector('.pages-container');

    const settingsEl = document.createElement('div');
    settingsEl.className = 'settings';
    settingsEl.classList.add('page');

    pages.append(settingsEl);

    const settings = new Settings();
    settingsEl.innerHTML = await settings.render();
    await settings.after_render();

    const settingsButtonEl = document.querySelector('.settings-button');

    settingsButtonEl.addEventListener('click', async e => {
      e.preventDefault();
      pages.classList.remove('home-is-active');
      pages.classList.add('settings-is-active');
    });
  }
}
