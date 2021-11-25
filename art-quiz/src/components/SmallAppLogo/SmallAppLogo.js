import SmallAppLogoHtml from './SmallAppLogo.html';
import './SmallAppLogo.css';

export class SmallAppLogo {
  constructor() {}

  async render () {
    return SmallAppLogoHtml;
  }

  async after_render() {};
}
