import styles from './OvalButton.css';

export class OvalButton {
  static index = 0;

  constructor(label, onClick) {
    this.m_label = label;
    this.m_onClick = onClick;

    OvalButton.index += 1;
    this.id = `oval-button-${OvalButton.index}`;
  }

  set label(label) {
    this.m_label = label;
  }

  set onClick(onClick) {
    this.m_onClick = onClick;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['oval-button']}"></div>
    `;
  }

  async afterRender() {
    const ovalButtonElement = document.getElementById(this.id);

    ovalButtonElement.textContent = this.m_label;

    ovalButtonElement.addEventListener('click', this.m_onClick);
  }
}
