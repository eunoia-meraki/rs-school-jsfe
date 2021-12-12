import './Question.css';

export class Question {
  constructor() {}

  async render() {
    return `
      <div class="question">
        <span class="text">Who is the author of this picture?</span>
        <div class="image"></div>
        <div class="variant-buttons-container">
          <div class="variant-button"></div>
          <div class="variant-button"></div>
          <div class="variant-button"></div>
          <div class="variant-button"></div>
        </div>
      </div>
    `;
  }

  async after_render() {
    
  }
}
