import styles from './Category.css';
export class Category {
  static index = 0;

  constructor(label, imageNumber, onClick) {
    this.label = label;
    this.imageNumber = imageNumber;
    this.onClick = onClick;

    Category.index++;
    this.id = `category-${Category.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['category']}">
        <div class="${styles['header']}">
          <span>${this.label}</span>
          <span class="${styles['score']}">10/10</span>
        </div>
        <div class="${styles['image']}"></div>
      </div>
    `;
  }

  async afterRender() {
    const categoryElement = document.getElementById(this.id);
    const imageElement = categoryElement.querySelector(`.${styles['image']}`);

    const image = new Image();
    image.src = require(`@/data/img/${this.imageNumber}.jpg`);
    image.onload = () => {
      imageElement.style.backgroundImage = `url('${image.src}')`;
    };

    imageElement.addEventListener('click', this.onClick);
  }
}
