import AppLogoHtml from './AppLogo.html';
import './AppLogo.css';

export class AppLogo {
  constructor() {}

  async render () {
    return AppLogoHtml;
  }

  async after_render() {};
}
