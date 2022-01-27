import styles from './Questions.css';
import shared from '@/styles/styles.css';

import { Progress } from '@/components/Progress';
import { AuthorsQuestion } from '@/components/AuthorsQuestion';
import { PicturesQuestion } from '@/components/PicturesQuestion';
import { Answer } from '@/components/Answer';
import { Footer } from '@/components/Footer';
import { Timer } from '@/components/Timer';
import { Result } from '@/components/Result';
import { GameOver } from '@/components/GameOver';
import { Exit } from '@/components/Exit';
import { IconButton } from '@/components/IconButton';

import exit from '@/assets/img/exit.png';

export class Questions {
  constructor(groupNumber, imageNumber) {
    this.imageNumber = imageNumber;
    this.questionNumber = 0;
    this.score = 0;

    const onAnyAnswerButtonClick = async isRightAnswer => {
      this.timer.stop();

      this.answer.imageNumber = this.imageNumber;
      this.answer.isRightAnswer = isRightAnswer;
      await this.answer.rerender();

      if (isRightAnswer) {
        this.score++;
      }

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    if (groupNumber === 0) {
      this.question = new AuthorsQuestion(this.imageNumber, onAnyAnswerButtonClick);
    } else {
      this.question = new PicturesQuestion(this.imageNumber, onAnyAnswerButtonClick);
    }

    const onNextButtonClick = async () => {
      this.imageNumber++;
      this.questionNumber++;

      await this.progress.stepUp();

      if (this.questionNumber < 10) {
        this.timer.reset();
        this.timer.run();

        this.question.imageNumber = this.imageNumber;
        await this.question.rerender();
      } else {
        const firstSlideElement = document.querySelector(`.${styles['slide']}`);
        const questionElement = firstSlideElement.firstElementChild;
        questionElement.remove();

        const result = new Result(this.score, imageNumber, groupNumber);
        firstSlideElement.innerHTML = await result.render();
        result.afterRender();
      }

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    this.answer = new Answer(this.imageNumber, onNextButtonClick);

    this.progress = new Progress();

    this.isTimer = localStorage.getItem('isTimer') === 'true';

    const onTimeExpired = async () => {
      const secondSlideElement = document.querySelectorAll(`.${styles['slide']}`)[1];
      const answerElement = secondSlideElement.firstElementChild;
      answerElement.remove();

      const gameOver = new GameOver(imageNumber, groupNumber);
      secondSlideElement.innerHTML = await gameOver.render();
      gameOver.afterRender();

      const sliderElement = document.querySelector(`.${styles['slider']}`);
      sliderElement.classList.toggle(`${styles['moved']}`);
    };

    const seconds = localStorage.getItem('seconds') ?? 20;
    this.timer = new Timer(seconds, onTimeExpired);

    this.exit = new Exit(imageNumber, groupNumber);

    const onExitButtonClick = () => {
      this.exit.show();
    };

    this.exitButton = new IconButton(exit, '', onExitButtonClick);

    this.footer = new Footer();
  }

  async render() {
    return `
      <div class="${shared['fade-transition']} ${shared['active']}"></div>
      ${await this.exit.render()}
      <header class="${styles['header']}">
        <div class="${styles['progress']}">
          ${await this.progress.render()}
        </div>
        <div class="${styles['exit-button']}">
          ${await this.exitButton.render()}
        </div>
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
        </div>
      </main>
      ${await this.footer.render()}
    `;
  }

  async afterRender() {
    this.exit.afterRender();
    this.exitButton.afterRender();
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
