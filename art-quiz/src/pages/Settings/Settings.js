import styles from './Settings.css';
import shared from '@/styles/styles.css';

import { Footer } from '@/components/Footer';
import { IconButton } from '@/components/IconButton';
import { Volume } from '@/components/Volume';
import { Toggle } from '@/components/Toggle';
import { Counter } from '@/components/Counter';

import arrowBack from '@/assets/img/arrow-back.png';

export class Settings {
  constructor() {
    const onBackButtonClick = () => {
      const sliderElement = document.querySelector(`.${shared['slider']}`);
      sliderElement.classList.toggle(`${shared['moved']}`);
    };
    this.backButton = new IconButton(arrowBack, 'Настройки', onBackButtonClick);

    this.volume = new Volume();
    this.toggle = new Toggle();
    this.counter = new Counter();
    this.footer = new Footer();
  }

  async render() {
    return `
      <header class="${styles['header']}">
        ${await this.backButton.render()}
      </header>
      <main class="${styles['main']}">
        <div class="${styles['setting']}">
          <span class="${styles['settings-header']}">Звук</span>
          ${await this.volume.render()}
        </div>
        <div class="${styles['setting']}">
          <span class="${styles['settings-header']}">Игра на время</span>
          ${await this.toggle.render()}
        </div>
        <div class="${styles['setting']}">
          <span class="${styles['settings-header']}">Секунды</span>
          ${await this.counter.render()}
        </div>
      </main>
      ${await this.footer.render()}
    `;
  }

  async afterRender() {
    await this.backButton.afterRender();
    await this.volume.afterRender();
    await this.toggle.afterRender();
    await this.counter.afterRender();
    await this.footer.afterRender();
  }
}
