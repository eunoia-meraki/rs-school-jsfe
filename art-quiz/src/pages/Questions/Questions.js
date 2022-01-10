import styles from './Questions.css';
import shared from '@/styles/styles.css';

import { Progress } from '@/components/Progress';
import { Question } from '@/components/Question';
import { Answer } from '@/components/Answer';
import { Footer } from '@/components/Footer';

export class Questions {
  constructor(questionNumber) {
    this.questionNumber = questionNumber;

    const setAnswer = async isRightAnswer => {
      await this.answer.setAnswer(this.questionNumber, isRightAnswer);

      await this.progress.stepUp();

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    this.question = new Question(this.questionNumber, setAnswer);

    const setQuestion = async () => {
      this.questionNumber++
      await this.question.setQuestion(this.questionNumber);

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    this.answer = new Answer(this.questionNumber, setQuestion);

    this.progress = new Progress();

    this.footer = new Footer();
  }

  async render() {
    return `
      <div class="${shared['fade-transition']} ${shared['active']}"></div>
      <header class="${styles['header']}">
        ${await this.progress.render()}
      </header>
      <main class="${styles['main']}">
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

    setTimeout(() => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);
    }, 500);
  }
}
