import './Category.css';

export class Category {
  constructor() {}

  async render() {
    return `
      <div class="category">
        <div class="header">
          <span class="name">Nude</span>
          <span class="score">10/10</span>
        </div>
        <div class="image"></div>
      </div>
    `;
  }

  async after_render() {}
}
