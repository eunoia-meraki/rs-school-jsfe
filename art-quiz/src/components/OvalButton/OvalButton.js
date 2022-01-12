import styles from './OvalButton.css';

export class OvalButton {
  static index = 0;

  constructor(label, onClick) {
    this._label = label;
    this.onClick = onClick;

    OvalButton.index++;
    this.id = `oval-button-${OvalButton.index}`;
  }

  set label(label) {
    this._label = label;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['oval-button']}">${this._label}</div>
    `;
  }

  async afterRender() {
    const ovalButtonElement = document.getElementById(this.id);
    ovalButtonElement.addEventListener('click', this.onClick);
  }
}
