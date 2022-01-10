import styles from './OvalButton.css';

export class OvalButton {
  static index = 0;

  constructor(label, onClick) {
    this.label = label;
    this.onClick = onClick;

    OvalButton.index++;
    this.id = `oval-button-${OvalButton.index}`;
  }

  async setLabel(label) {
    this.label = label;
    await this.rerender();
  }

  async setOnClick(onClick) {
    this.onClick = onClick;
    await this.rerender();
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['oval-button']}">${this.label}</div>
    `;
  }

  async afterRender() {
    const ovalButtonElement = document.getElementById(this.id);
    ovalButtonElement.addEventListener('click', this.onClick);
  }

  async rerender() {
    const ovalButtonElement = document.getElementById(this.id);
    ovalButtonElement.outerHTML = await this.render();
    await this.afterRender();
  }
}
