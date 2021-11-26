import HomeHtml from './Home.html';
import { Footer } from '@/components/Footer'
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
  };
}
