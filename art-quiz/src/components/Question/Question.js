import './Question.css';

export class Question {
  constructor() {}

  async render() {
    return `
      <div class="question">
        <span>Who is the author of this picture?</span>
      </div>
    `;
  }

  async after_render() {}
}
