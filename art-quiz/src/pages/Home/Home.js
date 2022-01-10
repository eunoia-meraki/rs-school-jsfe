import styles from './Home.css';
import shared from '@/styles/styles.css';

import { Footer } from '@/components/Footer';
import { Categories } from '@/pages/Categories';
import { OvalButton } from '@/components/OvalButton';
import { Settings } from '@/pages/Settings';
import { BigAppLogo } from '@/components/BigAppLogo';
import { IconButton } from '@/components/IconButton';

import settings from '@/assets/svg/settings.svg';

export class Home {
  constructor() {
    const onSettingsButtonClick = () => {
      const sliderElement = document.querySelector(`.${shared['slider']}`);
      sliderElement.classList.toggle(`${shared['moved']}`);
    };

    this.settingsButton = new IconButton(settings, '', onSettingsButtonClick);

    const onStartButtonClick = () => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);
      setTimeout(async () => {
        const bodyEl = document.querySelector('body');
        const categories = new Categories(1);
        bodyEl.innerHTML = await categories.render();
        await categories.afterRender();
      }, 500);
    };

    this.startButton1 = new OvalButton('Художники', onStartButtonClick);
    this.startButton2 = new OvalButton('Артисты', onStartButtonClick);

    this.bigAppLogo = new BigAppLogo();
    this.footer = new Footer();
    this.settings = new Settings();
  }

  async render() {
    return `
      <div class="${shared['fade-transition']} ${shared['active']}"></div>
      <div class="${shared['slider']}">
        <div class="${shared['slide']}">
          <header class="${styles['header']}">
            ${await this.settingsButton.render()}
          </header>
          <main class="${styles['main']}">
            ${await this.bigAppLogo.render()}
            <div class="${styles['start-buttons-container']}">
              ${await this.startButton1.render()}
              ${await this.startButton2.render()}
            </div>
          </main>
          ${await this.footer.render()}
        </div>
        <div class="${shared['slide']}">
          ${await this.settings.render()}
        </div>
      </div>
    `;
  }

  async afterRender() {
    await this.startButton1.afterRender();
    await this.startButton2.afterRender();
    await this.footer.afterRender();
    await this.settings.afterRender();
    await this.bigAppLogo.afterRender();
    await this.settingsButton.afterRender();

    setTimeout(() => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);
    }, 500);
  }
}
