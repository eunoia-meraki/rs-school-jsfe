import './Question.css';

export class Question {
  constructor() {}

  async render() {
    return `
      <div class="question">
        <span class="text">Who is the author of this picture?</span>
        <div class="image"></div>
        <div class="variants-container">
          <div class="variant"></div>
          <div class="variant"></div>
          <div class="variant"></div>
          <div class="variant"></div>
        </div>
      </div>
    `;
  }

  async after_render() {
    
  }
}
