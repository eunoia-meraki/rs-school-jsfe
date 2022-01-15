import styles from './OvalButton.css';

export class OvalButton {
  static index = 0;

  constructor(label, onClick, width, height) {
    this._label = label;
    this._onClick = onClick;
    this.width = width;
    this.height = height;

    OvalButton.index++;
    this.id = `oval-button-${OvalButton.index}`;
  }

  set label(label) {
    this._label = label;
  }

  set onClick(onClick) {
    this._onClick = onClick;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['oval-button']}"></div>
    `;
  }

  async afterRender() {
    const ovalButtonElement = document.getElementById(this.id);

    ovalButtonElement.textContent = this._label;

    ovalButtonElement.addEventListener('click', this._onClick);

    ovalButtonElement.style.width = `${this.width}px`;
    ovalButtonElement.style.height = `${this.height}px`;
  }
}
