import styles from './Answer.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

import check from '@/assets/svg/check.svg';
import cross from '@/assets/svg/cross.svg';

export class Answer {
  static index = 0;

  constructor(imageNumber, onNextButtonClick) {
    this._imageNumber = imageNumber;
    this._isRightAnswer = false;

    this.nextButton = new OvalButton('Далее', onNextButtonClick);

    Answer.index++;
    this.id = `answer-${Answer.index}`;
  }

  set imageNumber(imageNumber) {
    this._imageNumber = imageNumber;
  }

  set isRightAnswer(isRightAnswer) {
    this._isRightAnswer = isRightAnswer;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['answer']}">
        <div class="${styles['picture']}">
          <div class="${styles['indicator']}"></div>
        </div>
        <div class="${styles['text-container']}">
          <span class="${styles['name']}"></span>
          <span class="${styles['author-year']}"></span>
        </div>
        ${await this.nextButton.render()}
      </div>
    `;
  }

  async afterRender() {
    await this.nextButton.afterRender();

    const answerElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/full/${this._imageNumber}full.jpg`);
    image.onload = () => {
      const pictureElement = answerElement.querySelector(`.${styles['picture']}`);
      pictureElement.style.backgroundImage = `url('${image.src}')`;
    };

    const indicator = new Image();
    if (this._isRightAnswer) {
      indicator.src = check;
    } else {
      indicator.src = cross;
    }
    indicator.onload = () => {
      const indicatorElement = answerElement.querySelector(`.${styles['indicator']}`);
      indicatorElement.style.backgroundImage = `url('${indicator.src}')`;
    };

    const nameElement = answerElement.querySelector(`.${styles['name']}`);
    nameElement.textContent = images[this._imageNumber].name;

    const descriptionElement = answerElement.querySelector(`.${styles['author-year']}`);
    descriptionElement.textContent = `${images[this._imageNumber].author}, ${images[this._imageNumber].year}`;
  }

  async rerender() {
    const answerElement = document.getElementById(this.id);
    answerElement.outerHTML = await this.render();
    await this.afterRender();
  }
}
