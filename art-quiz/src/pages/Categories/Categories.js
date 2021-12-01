import './Categories.css';

import { Category } from '@/components/Category';
import { AppLogo } from '@/components/AppLogo';
import { Footer } from '@/components/Footer';

import { Settings } from '@/pages/Settings';

export class Categories {
  constructor() {}

  async render() {
    const appLogo = new AppLogo();
    const appLogoHtml = await appLogo.render();

    const footer = new Footer();
    const footerHtml = await footer.render();

    let categoriesHtml = '';

    const categoryNames = [
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

    for (let i = 0; i < 12; i++) {
      const category = new Category(categoryNames[i], i);
      const categoryHtml = await category.render();
      await category.after_render();
      categoriesHtml += categoryHtml;
    }

    return `
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
    slideEl.classList.add('slide');

    sliderEl.append(slideEl);

    const settings = new Settings();
    slideEl.innerHTML = await settings.render();
    await settings.after_render();

    const settingsButtonEl = document.querySelector('.settings-button');
    settingsButtonEl.addEventListener('click', e => {
      e.preventDefault();
      sliderEl.classList.add('moved');
    });

    const appLogoEl = document.querySelector('.app-logo');
    appLogoEl.style.cursor = 'pointer';
    appLogoEl.addEventListener('click', () => {
      window.location = '/';
    });
  }
}
