import BigAppLogoHtml from './BigAppLogo.html';
import './BigAppLogo.css';

export class BigAppLogo {
  constructor() {}

  async render () {
    return BigAppLogoHtml;
  }

  async after_render() {};
}
