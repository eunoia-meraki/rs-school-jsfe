import styles from './Questions.css';
import shared from '@/styles/styles.css';

import { Progress } from '@/components/Progress';
import { Question } from '@/components/Question';
import { Answer } from '@/components/Answer';
import { Footer } from '@/components/Footer';
import { Timer } from '@/components/Timer';

export class Questions {
  constructor(questionNumber) {
    this.questionNumber = questionNumber;

    const onAnyAnswerButtonClick = async isRightAnswer => {
      this.timer.stop();

      this.answer.questionNumber = this.questionNumber;
      this.answer.isRightAnswer = isRightAnswer;
      await this.answer.rerender();

      await this.progress.stepUp();

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    this.question = new Question(this.questionNumber, onAnyAnswerButtonClick);

    const onNextButtonClick = async () => {
      this.timer.reset();
      this.timer.run();

      this.questionNumber++;
      this.question.questionNumber = this.questionNumber;
      await this.question.rerender();

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    this.answer = new Answer(this.questionNumber, onNextButtonClick);

    this.progress = new Progress();

    this.isTimer = localStorage.getItem('isTimer') === 'true';

    const seconds = localStorage.getItem('seconds') ?? 20;
    this.timer = new Timer(seconds);

    this.footer = new Footer();
  }

  async render() {
    return `
      <div class="${shared['fade-transition']} ${shared['active']}"></div>
      <header class="${styles['header']}">
        ${await this.progress.render()}
      </header>
      <main class="${styles['main']}">
        ${
          this.isTimer
            ? `<div class="${styles['timer-container']}">
              ${await this.timer.render()}
            </div>`
            : ''
        }
        <div class="${styles['slider']}">
        <div class="${styles['slide']}">
          ${await this.question.render()}
        </div>  
        <div class="${styles['slide']}">
          ${await this.answer.render()}
        </div>
      </main>
      ${await this.footer.render()}
    `;
  }

  async after_render() {
    this.progress.afterRender();
    this.question.afterRender();
    this.answer.afterRender();
    this.footer.afterRender();

    if (this.isTimer) this.timer.afterRender();

    setTimeout(() => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);
    }, 500);
  }
}
