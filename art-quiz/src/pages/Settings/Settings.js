import './Settings.css';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export class Settings {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    const backButton = new BackButton('Настройки');
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
              <span class="value">Выкл</span>
            </div>
            <label>
              <input type="checkbox">
              <span class="slide-block round"></span>
            </label>
          </div>
        </div>
        <div class="setting">
          <span class="header">Секунды</span>
          <div class="round-buttons-container">
            <div class="round-button-plus"></div>
            <div class="counter-container">
              <span class="counter">20</span>
            </div>
            <div class="round-button-minus"></div>
          </div>
        </div>
      </main>
      ${footerHtml}
    `;
  }

  async after_render() {
    const backButtonEl = document.querySelector('.back-button .icon');
    const sliderEl = document.querySelector('.slider');

    backButtonEl.addEventListener('click', () => {
      sliderEl.classList.toggle('moved');
    });

    const volumeEl = document.querySelector('.volume-slider');

    if (localStorage.getItem('volume')) {
      volumeEl.value = localStorage.getItem('volume');
    }

    volumeEl.addEventListener('mouseup', () => {
      localStorage.setItem('volume', volumeEl.value);
    });

    const buttonPlusEl = document.querySelector('.round-button-plus');
    const buttonMinusEl = document.querySelector('.round-button-minus');
    const counterEl = document.querySelector('.counter');

    if (localStorage.getItem('seconds')) {
      counterEl.textContent = localStorage.getItem('seconds');
    }

    buttonPlusEl.addEventListener('mouseup', () => {
      counterEl.textContent = +counterEl.textContent + 1;
      localStorage.setItem('seconds', counterEl.textContent);
    });

    buttonMinusEl.addEventListener('mouseup', () => {
      counterEl.textContent = +counterEl.textContent - 1;
      localStorage.setItem('seconds', counterEl.textContent);
    });

    const toggleEl = document.querySelector('.toggle label');
    const toggleInputEl = document.querySelector('.toggle input');
    const toggleValueEl = document.querySelector('.toggle .value');

    toggleInputEl.checked = false;

    if (localStorage.getItem('time')) {
      toggleValueEl.textContent = localStorage.getItem('time');
      if (localStorage.getItem('time') === 'Вкл') {
        toggleInputEl.checked = true;
      } else {
        toggleInputEl.checked = false;
      }
    }

    toggleEl.addEventListener('mouseup', () => {
      if (toggleInputEl.checked) {
        toggleValueEl.textContent = 'Выкл'
      } else {
        toggleValueEl.textContent = 'Вкл'
      }
      localStorage.setItem('time', toggleValueEl.textContent);
    })

  }
}
