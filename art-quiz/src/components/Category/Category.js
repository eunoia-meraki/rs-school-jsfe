import styles from './Category.css';

import { ImageButton } from '@/components/ImageButton';
export class Category {
  static index = 0;

  constructor(label, imageNumber, onClick) {
    this.label = label;
    this.imageButton = new ImageButton(imageNumber, onClick);

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
        ${await this.imageButton.render()}
      </div>
    `;
  }

  async afterRender() {
    await this.imageButton.afterRender()
  }
}
