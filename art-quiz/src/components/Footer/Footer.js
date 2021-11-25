import FooterHtml from './Footer.html';
import './Footer.css';

export class Footer {
  constructor() {}

  async render () {
    return FooterHtml;
  }

  async after_render() {};
}
