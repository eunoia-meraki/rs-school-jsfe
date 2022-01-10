import styles from './Volume.css';

export class Volume {
  static index = 0;

  constructor() {
    Volume.index++;
    this.id = `volume-${Volume.index}`;
  }

  async render() {
    return `
      <input id="${this.id}" type="range" min="0" max="100" value="50" step="1" class="${styles['volume']}">
    `;
  }

  async afterRender() {
    const volumeElement = document.getElementById(this.id);

    volumeElement.value = localStorage.getItem('volume') ?? 50;

    volumeElement.addEventListener('mouseup', () => {
      localStorage.setItem('volume', volumeElement.value);
    });
  }
}
