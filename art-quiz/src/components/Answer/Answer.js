import styles from './Answer.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

import check from '@/assets/svg/check.svg';
import cross from '@/assets/svg/cross.svg';

export class Answer {
  static index = 0;

  constructor(questionNumber, onNextButtonClick) {
    this._questionNumber = questionNumber;
    this._isRightAnswer = false;
    this.name = '';
    this.description = '';

    this.nextButton = new OvalButton('Далее', onNextButtonClick);

    Answer.index++;
    this.id = `answer-${Answer.index}`;
  }

  set questionNumber(questionNumber) {
    this._questionNumber = questionNumber;
  }

  set isRightAnswer(isRightAnswer) {
    this._isRightAnswer = isRightAnswer;
  }

  async render() {
    this.name = images[this._questionNumber].name;
    this.description = `
    ${images[this._questionNumber].author},
    ${images[this._questionNumber].year}
  `

    return `
      <div id="${this.id}" class="${styles['answer']}">
        <div class="${styles['image']}">
          <div class="${styles['indicator']}"></div>
        </div>
        <div class="${styles['text-container']}">
          <span class="${styles['name']}">${this.name}</span>
          <span class="${styles['description']}">${this.description}</span>
        </div>
        ${await this.nextButton.render()}
      </div>
    `;
  }

  async afterRender() {
    await this.nextButton.afterRender();

    const answerElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/full/${this._questionNumber}full.jpg`);
    image.onload = () => {
      const imageElement = answerElement.querySelector(`.${styles['image']}`);
      imageElement.style.backgroundImage = `url('${image.src}')`;
    };

    const indicator = new Image();
    if (this.isRightAnswer) {
      indicator.src = check;
    } else {
      indicator.src = cross;
    }
    indicator.onload = () => {
      const indicatorElement = answerElement.querySelector(`.${styles['indicator']}`);
      indicatorElement.style.backgroundImage = `url('${indicator.src}')`;
    };
  }

  async rerender() {
    const answerElement = document.getElementById(this.id);
    answerElement.outerHTML = await this.render();
    await this.afterRender();
  }
}
