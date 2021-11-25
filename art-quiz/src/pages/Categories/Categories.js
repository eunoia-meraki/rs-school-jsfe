import CategoriesHtml from './Categories.html';

export class Categories {
  constructor() {};

  async render () {
    return CategoriesHtml;
  }

  async after_render () {};
}
