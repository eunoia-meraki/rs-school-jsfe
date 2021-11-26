import SettingsHtml from './Settings.html';
import { Footer } from '@/components/Footer'
import { BackButton } from '@/components/BackButton'
import { AppLogo } from '@/components/AppLogo'
import './Settings.css';

export class Settings {
  constructor() {}

  async render () {
    return SettingsHtml;
  }

  async after_render () {

    // replace footer

    const emptyFooterEl = document.querySelector('.empty-footer');

    const footer = new Footer();

    emptyFooterEl.outerHTML = await footer.render();

    // replace arrow back

    const emptyBackButtonEl = document.querySelector('.empty-back-button');

    const href = "/";
    const text = "Settings";
    const backButton = new BackButton(href, text);

    emptyBackButtonEl.outerHTML = await backButton.render();

    // replace app logo

    const emptyAppLogoEl = document.querySelector('.empty-app-logo');

    const appLogo = new AppLogo();

    emptyAppLogoEl.outerHTML = await appLogo.render();
  };
}
