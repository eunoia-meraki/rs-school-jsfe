import styles from './Category.css';
export class Category {
  static index = 0;

  constructor(label, groupNumber, imageNumber, onClick) {
    this.label = label;
    this.score = localStorage.getItem(`category_${groupNumber}_${imageNumber}`);
    this.imageNumber = imageNumber;
    this.onClick = onClick;

    Category.index++;
    this.id = `category-${Category.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['category']}">
        <div class="${styles['header-container']}">
          <span class="${styles['header']}"></span>
          ${this.score ? `<span class="${styles['score']}">${this.score}/10</span>` : ''}
        </div>
        <div class="${styles['image']}">
          ${
            this.score
              ? `<div class="${styles['rectangle']}">
                  <div class="${styles['icon']}"></div>
                  <span class="${styles['text']}">Переиграть</span>
                </div>`
              : ''
          }
        </div>
      </div>
    `;
  }

  async afterRender() {
    const categoryElement = document.getElementById(this.id);

    const headerElement = categoryElement.querySelector(`.${styles['header']}`);
    headerElement.textContent = this.label;

    const imageElement = categoryElement.querySelector(`.${styles['image']}`);

    const image = new Image();
    image.src = require(`@/data/img/${this.imageNumber}.jpg`);
    image.onload = () => {
      imageElement.style.backgroundImage = `url('${image.src}')`;
    };

    imageElement.addEventListener('click', this.onClick);
  }
}
