import './Questions.css';

import { Footer } from '@/components/Footer';
import { Question } from '@/components/Question';

export class Questions {
  constructor() {}

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    const question = new Question();
    const questionHtml = await question.render();

    return `
      <div class="transition active"></div>
        <header class="questions-header">
          <input type="range" min="0" max="10" value="0" step="1" class="questions-progress">
        </header>
      <main class="questions-main">
        ${questionHtml}
      </main>
      ${footerHtml}
    `;
  }

  async after_render() {
    const transitionEl = document.querySelector('.transition');

    setTimeout(() => {
      transitionEl.classList.toggle('active');
    }, 500);
  }
}
