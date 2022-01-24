import styles from './Categories.css';
import shared from '@/styles/styles.css';

import { Category } from '@/components/Category';
import { AppLogo } from '@/components/AppLogo';
import { Footer } from '@/components/Footer';
import { IconButton } from '@/components/IconButton';

import { Home } from '@/pages/Home';
import { Settings } from '@/pages/Settings';
import { Questions } from '@/pages/Questions';

import settings from '@/assets/svg/settings.svg';

export class Categories {
  constructor(groupNumber) {
    const onAppLogoClick = () => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);

      setTimeout(async () => {
        const bodyElement = document.querySelector('body');
        const home = new Home();
        bodyElement.innerHTML = await home.render();
        await home.afterRender();
      }, 500);
    };

    this.appLogo = new AppLogo(onAppLogoClick);

    const onSettingsButtonClick = () => {
      const sliderElement = document.querySelector(`.${shared['slider']}`);
      sliderElement.classList.toggle(`${shared['moved']}`);
    };

    this.settingsButton = new IconButton(settings, '', onSettingsButtonClick);

    const labels = [
      'Портрет',
      'Пейзаж',
      'Натюрморт',
      'Импрессионизм',
      'Экспрессионизм',
      'Авангард',
      'Ренессанс',
      'Сюрреализм',
      'Китч',
      'Минимализм',
      'Интерьер',
      'Нудизм',
    ];

    this.categories = [];

    labels.forEach((label, index) => {
      const imageNumber = 120 * groupNumber + 10 * index;

      const onCategoryClick = () => {
        const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
        transitionElement.classList.toggle(`${shared['active']}`);

        setTimeout(async () => {
          const bodyElement = document.querySelector('body');
          const questions = new Questions(groupNumber, imageNumber);
          bodyElement.innerHTML = await questions.render();
          await questions.afterRender();
        }, 500);
      };

      const category = new Category(label, groupNumber, imageNumber, onCategoryClick);
      this.categories.push(category);
    });

    this.footer = new Footer();
    this.settings = new Settings();
  }

  async render() {
    return `
      <div class="${shared['fade-transition']} ${shared['active']}"></div>
      <div class="${shared['slider']}">
        <div class="${shared['slide']}">
          <header class="${styles['header']}">
            <nav class="${styles['navigation']}">
              ${await this.appLogo.render()}
              <span class="${styles['page-header']}">Категории</span>
            </nav>
            ${await this.settingsButton.render()}
          </header>
          <main class="${styles['main']}">
            ${await this.categories
              .reverse()
              .reduce(async (prev, cur) => (await cur.render()) + (await prev), '')}
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
    await this.appLogo.afterRender();
    await this.footer.afterRender();
    await this.settings.afterRender();
    await this.settingsButton.afterRender();

    this.categories.forEach(async category => {
      await category.afterRender();
    });

    setTimeout(() => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);
    }, 500);
  }
}
