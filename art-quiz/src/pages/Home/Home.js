import './Home.css';
import { Footer } from '@/components/Footer';
import { Settings } from '@/pages/Settings';
import { Categories } from '../Categories';

export class Home {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    return `
      <div class="slider">
        <div class="home slide">
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
              <a class="start-button" href="/">Artists</a>
              <a class="start-button" href="/">Pictures</a>
            </div>
          </main>
          ${footerHtml}
        </div>
      </div>
    `;
  }

  async after_render() {
    const sliderEl = document.querySelector('.slider');

    const slideEl = document.createElement('div');
    slideEl.className = 'settings';
    slideEl.classList.add('slide');

    sliderEl.append(slideEl);

    const settings = new Settings();
    slideEl.innerHTML = await settings.render();
    await settings.after_render();

    const settingsButtonEl = document.querySelector('.settings-button');

    settingsButtonEl.addEventListener('click', e => {
      e.preventDefault();
      sliderEl.classList.toggle('moved');
    });

    const startButtonEls = document.querySelectorAll('.start-button');

    startButtonEls.forEach(startButtonEl => {
      startButtonEl.addEventListener('click', async e => {
        e.preventDefault();

        const body = document.querySelector('body');

        const categories = new Categories();

        body.innerHTML = await categories.render();
        await categories.after_render();
      });
    });
  }
}
