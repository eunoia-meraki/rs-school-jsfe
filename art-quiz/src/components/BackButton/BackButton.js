import './BackButton.css';

export class BackButton {
  constructor(href, text) {
    this.href = href;
    this.text = text;
  }

  async render() {
    return `<div class="back-button">
              <a href=${this.href}></a>
              <span>${this.text}</span>
            </div>`;
  }

  async after_render() {}
}
