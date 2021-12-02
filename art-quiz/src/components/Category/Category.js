import './Category.css';
export class Category {
  constructor(name, imageNumber) {
    this.name = name;
    this.imageNumber = imageNumber;
  }

  async render() {
    return `
      <div class="${this.name.toLowerCase()} category">
        <div class="header">
          <span class="name">${this.name}</span>
          <span class="score">10/10</span>
        </div>
        <div class="image"></div>
      </div>
    `;
  }

  async after_render() {
    const image = new Image();
    image.src = require(`@/data/img/${this.imageNumber}.jpg`);
    image.onload = () => {
      const imageEl = document.querySelector(
        `.${this.name.toLowerCase()}.category .image`,
      );
      imageEl.style.backgroundImage = `url('${image.src}')`;
    };
  }
}
