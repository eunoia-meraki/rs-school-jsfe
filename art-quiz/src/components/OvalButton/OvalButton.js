import styles from './OvalButton.css';

export class OvalButton {
  static index = 0;

  constructor(label, onClick) {
    this._label = label;
    this._onClick = onClick;

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
  }
}
