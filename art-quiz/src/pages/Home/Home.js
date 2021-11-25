import HomeHtml from './Home.html';
import { Footer } from '@/components/Footer'
import { BigAppLogo } from '@/components/BigAppLogo'
import './Home.css';

export class Home {
  constructor() {}

  async render () {
    return HomeHtml;
  }

  async after_render() {
    // replace footer

    const emptyFooterEl = document.querySelector('.empty-footer');
    const footer = new Footer();
    emptyFooterEl.outerHTML = await footer.render();

    // replace app-logo

    const emptyAppLogoEl = document.querySelector('.empty-app-logo');
    const bigAppLogo = new BigAppLogo();
    emptyAppLogoEl.outerHTML = await bigAppLogo.render();
  };
}
