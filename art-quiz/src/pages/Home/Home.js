import HomeElement from './Home.html';
import './Home.css';

export class Home {
  constructor() {}

  async render () {
    return HomeElement;
  }

  async after_render () {};
}
