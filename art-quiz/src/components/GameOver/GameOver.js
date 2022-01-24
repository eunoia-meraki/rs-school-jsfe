import styles from './GameOver.css';
import shared from '@/styles/styles.css';

import { OvalButton } from '@/components/OvalButton';
import { Home } from '@/pages/Home';
import { Questions } from '@/pages/Questions';

import goblet from '@/assets/svg/goblet2.svg';

export class GameOver {
  static index = 0;

  constructor(imageNumber, groupNumber) {
    GameOver.index++;
    this.id = `game-over-${GameOver.index}`;

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

    const onRestartQuizButtonClick = () => {
      const transitionElement = document.querySelector(`.${shared['fade-transition']}`);
      transitionElement.classList.toggle(`${shared['active']}`);

      setTimeout(async () => {
        const bodyElement = document.querySelector('body');
        const questions = new Questions(groupNumber, imageNumber);
        bodyElement.innerHTML = await questions.render();
        
        await questions.afterRender();
      }, 500);
    };

    this.homeButton = new OvalButton('Главная страница', onHomeButtonClick, 190, 60);
    this.restartQuizButton = new OvalButton('Переиграть квиз', onRestartQuizButtonClick, 190, 60);

    localStorage.setItem(`category_${groupNumber}_${imageNumber}`, 0);
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['result']}">
        <div class="${styles['goblet']}"></div>
        <span class="${styles['message']}">Время истекло!</span>
        <div class="${styles['score-container']}">
          <span class="${styles['label']}">Ваш результат:</span>
          <span class="${styles['score']}">0</span>
        </div>
        <div class="${styles['buttons-container']}">
          ${await this.homeButton.render()}
          ${await this.restartQuizButton.render()}
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.homeButton.afterRender();
    this.restartQuizButton.afterRender();

    const gameOverElement = document.getElementById(this.id);

    const image = new Image();
    image.src = goblet;
    image.onload = () => {
      const gobletElement = gameOverElement.querySelector(`.${styles['goblet']}`);
      gobletElement.style.backgroundImage = `url('${image.src}')`;
    };
  }
}
