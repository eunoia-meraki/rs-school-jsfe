import './BackButton.css';

export class BackButton {
  constructor(text) {
    this.text = text;
  }

  async render() {
    return `
      <div class="back-button">
        <div class="icon"></div>
        <span class="text">${this.text}</span>
      </div>
    `;
  }

  async after_render() {}
}
