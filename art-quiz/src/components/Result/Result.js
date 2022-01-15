import styles from './Result.css';
import shared from '@/styles/styles.css';

import { OvalButton } from '@/components/OvalButton';
import { Home } from '@/pages/Home';
import { Questions } from '@/pages/Questions';

import goblet from '@/assets/svg/goblet.svg';

export class Result {
  static index = 0;

  constructor(score, imageNumber) {
    this.score = score;

    Result.index++;
    this.id = `result-${Result.index}`;

    const onHomeButtonClick = () => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);

      setTimeout(async () => {
        const bodyElement = document.querySelector('body');
        const home = new Home();
        bodyElement.innerHTML = await home.render();
        await home.afterRender();
      }, 500);
    };

    const onNextQuizButtonClick = () => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);

      setTimeout(async () => {
        const bodyElement = document.querySelector('body');
        const questions = new Questions(groupNumber, imageNumber + 10);
        bodyElement.innerHTML = await questions.render();
        await questions.afterRender();
      }, 500);
    };

    this.homeButton = new OvalButton('Главная страница', onHomeButtonClick, 190, 60);
    this.nextQuizButton = new OvalButton('Следующий квиз', onNextQuizButtonClick, 190, 60);
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['result']}">
        <div class="${styles['goblet']}"></div>
        <span class="${styles['message']}">Квиз завершен!</span>
        <div class="${styles['score-container']}">
          <span class="${styles['label']}">Ваш результат:</span>
          <span class="${styles['score']}"></span>
        </div>
        <div class="${styles['buttons-container']}">
          ${await this.homeButton.render()}
          ${await this.nextQuizButton.render()}
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.homeButton.afterRender();
    this.nextQuizButton.afterRender();

    const resultElement = document.getElementById(this.id);

    const image = new Image();
    image.src = goblet;
    image.onload = () => {
      const gobletElement = resultElement.querySelector(`.${styles['goblet']}`);
      gobletElement.style.backgroundImage = `url('${image.src}')`;
    };

    const scoreElement = resultElement.querySelector(`.${styles['score']}`);
    scoreElement.textContent = `${this.score}/10`;
  }
}
