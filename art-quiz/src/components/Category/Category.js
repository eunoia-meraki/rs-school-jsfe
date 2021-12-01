import './Category.css';
export class Category {
  constructor(name, imageNumber) {
    this.name = name;
    this.imageNumber = imageNumber;
  }

  async render() {
    return `
      <div class="category" id="${this.name.toLowerCase()}">
        <div class="header">
          <span class="name">${this.name}</span>
          <span class="score">10/10</span>
        </div>
        <div class="image"></div>
      </div>
    `;
  }

  async after_render() {
    const img = new Image();
    img.src = require(`@/data/img/${this.imageNumber}.jpg`);
    img.onload = () => {
      const imageEl = document.querySelector(
        `.category#${this.name.toLowerCase()} .image`,
      );
      imageEl.style.backgroundImage = `url('${img.src}')`;
    };
  }
}
