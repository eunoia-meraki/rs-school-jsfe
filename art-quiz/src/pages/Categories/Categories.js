import './Categories.css';

import { Category } from '@/components/Category';
import { AppLogo } from '@/components/AppLogo';
import { Footer } from '@/components/Footer';

import { Home } from '@/pages/Home';
import { Settings } from '@/pages/Settings';
import { Questions } from '@/pages/Questions';

export class Categories {
  constructor(groupNumber) {
    this.groupNumber = groupNumber;
    this.names = [
      'Portrait',
      'Landscape',
      'Still-life',
      'Impressionism',
      'Expressionism',
      'Avant-garde',
      'Renaissance',
      'Surrealism',
      'Kitsch',
      'Minimalism',
      'Interior',
      'Nude',
    ];
  }

  async render() {
    const appLogo = new AppLogo();
    const appLogoHtml = await appLogo.render();

    const footer = new Footer();
    const footerHtml = await footer.render();

    let categoriesHtml = '';

    for (let i = 0; i < 12; i++) {
      const imageNumber = 120 * this.groupNumber + 10 * i;
      const category = new Category(this.names[i], imageNumber);
      const categoryHtml = await category.render();
      await category.after_render();
      categoriesHtml += categoryHtml;
    }

    return `
      <div class="transition active"></div>
      <div class="slider">
        <div class="categories slide">
          <header class="categories-header">
            <div class="navigation">
              ${appLogoHtml}
              <span class="page-header">Categories</span>
            </div>
            <a class="settings-button" href="/"></a>
          </header>
          <main class="categories-main">
            ${categoriesHtml}
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

    const appLogoEl = document.querySelector('.app-logo');

    appLogoEl.addEventListener('click', () => {
      transitionEl.classList.toggle('active');
      setTimeout(async () => {
        const bodyEl = document.querySelector('body');
        const home = new Home();
        bodyEl.innerHTML = await home.render();
        await home.after_render();
      }, 500);
    });

    const categoryEls = document.querySelectorAll('.category');

    categoryEls.forEach(categoryEl => {
      categoryEl.addEventListener('click', () => {
        transitionEl.classList.toggle('active');
        setTimeout(async () => {
          const bodyEl = document.querySelector('body');
          const questions = new Questions();
          bodyEl.innerHTML = await questions.render();
          await questions.after_render();
        }, 500);
      });
    });

    setTimeout(() => {
      transitionEl.classList.toggle('active');
    }, 500);
  }
}
