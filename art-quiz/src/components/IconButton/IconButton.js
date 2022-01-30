import styles from './IconButton.css';

export class IconButton {
  static index = 0;

  constructor(icon, label, onClick) {
    this.icon = icon;
    this.label = label;
    this.onClick = onClick;

    IconButton.index += 1;
    this.id = `icon-button-${IconButton.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['icon-button']}">
        <div class="${styles.icon}"></div>
        ${this.label && `<span>${this.label}</span>`}
      </div>
    `;
  }

  async afterRender() {
    const iconButtonElement = document.getElementById(this.id);
    iconButtonElement.firstElementChild.style.backgroundImage = `url('${this.icon}')`;
    iconButtonElement.firstElementChild.addEventListener('click', this.onClick);
  }
}
