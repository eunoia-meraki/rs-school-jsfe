import './Home.css';
import { Footer } from '@/components/Footer';
import { Settings } from '@/pages/Settings';
import { Categories } from '@/pages/Categories';

export class Home {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    return `
      <div class="transition active"></div>
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
              <div class="start-button">Художники</div>
              <div class="start-button">Картины</div>
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
    slideEl.classList.toggle('slide');
    sliderEl.append(slideEl);
    const settings = new Settings();
    slideEl.innerHTML = await settings.render();
    await settings.after_render();

    const settingsButtonEl = document.querySelector('.settings-button');
    settingsButtonEl.addEventListener('click', e => {
      e.preventDefault();
      sliderEl.classList.toggle('moved');
    });

    const transitionEl = document.querySelector('.transition');

    const startButtonEls = document.querySelectorAll('.start-button');

    startButtonEls.forEach((startButtonEl, index) => {
      startButtonEl.addEventListener('click', () => {
        transitionEl.classList.toggle('active');
        setTimeout(async () => {
          const bodyEl = document.querySelector('body');
          const categories = new Categories(index);
          bodyEl.innerHTML = await categories.render();
          await categories.after_render();
        }, 500);
      });
    });

    setTimeout(() => {
      transitionEl.classList.toggle('active');
    }, 500);
  }
}
