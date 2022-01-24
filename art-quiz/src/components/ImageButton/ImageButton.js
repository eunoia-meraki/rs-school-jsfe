import styles from './ImageButton.css';

export class ImageButton {
  static index = 0;

  constructor(imageNumber, onClick, someButton) {
    this._imageNumber = imageNumber;
    this._onClick = onClick;
    this.someButton = someButton;

    ImageButton.index++;
    this.id = `image-button-${ImageButton.index}`;
  }

  set imageNumber(imageNumber) {
    this._imageNumber = imageNumber;
  }

  set onClick(onClick) {
    this._onClick = onClick;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['image-button']}">
        ${
          this.someButton
            ?
              `<div class="${styles['some-button']}">Играть снова</div>`
            :
              ''
        }
      </div>
    `;
  }

  async afterRender() {
    const imageButtonElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/img/${this._imageNumber}.jpg`);
    image.onload = () => {
      imageButtonElement.style.backgroundImage = `url('${image.src}')`;
    };

    imageButtonElement.addEventListener('click', this._onClick);
  }
}
