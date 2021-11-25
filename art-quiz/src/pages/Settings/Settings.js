import SettingsHtml from './Settings.html';
import { Footer } from '@/components/Footer'
import './Settings.css';

export class Settings {
  constructor() {}

  async render () {
    return SettingsHtml;
  }

  async after_render () {
    const emptyFooterElement = document.querySelector('.empty-footer');

    const footerElement = document.createElement('footer')
    const footer = new Footer();
    footerElement.innerHTML = await footer.render();

    emptyFooterElement.parentNode.replaceChild(footerElement, emptyFooterElement);
  };
}
