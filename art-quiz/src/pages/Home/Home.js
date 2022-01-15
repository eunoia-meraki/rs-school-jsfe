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

    const labels = ['Художники', 'Артисты'];

    this.startButtons = [];

    labels.forEach((label, index) => {
      const onStartButtonClick = () => {
        const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
        transitionElement.classList.toggle(`${shared['active']}`);

        setTimeout(async () => {
          const bodyElement = document.querySelector('body');
          const categories = new Categories(index);
          bodyElement.innerHTML = await categories.render();
          await categories.afterRender();
        }, 500);
      };

      const startButton = new OvalButton(label, onStartButtonClick);
      this.startButtons.push(startButton);
    });

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
              ${await this.startButtons
                .reverse()
                .reduce(async (prev, cur) => (await cur.render()) + (await prev), '')}
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
    await this.footer.afterRender();
    await this.settings.afterRender();
    await this.bigAppLogo.afterRender();
    await this.settingsButton.afterRender();

    this.startButtons.forEach(async startButton => {
      await startButton.afterRender();
    });

    setTimeout(() => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);
    }, 500);
  }
}
