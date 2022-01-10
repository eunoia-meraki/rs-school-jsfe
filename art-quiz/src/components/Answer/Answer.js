import styles from './Answer.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

import check from '@/assets/svg/check.svg';
import cross from '@/assets/svg/cross.svg';

export class Answer {
  static index = 0;

  constructor(questionNumber, setAnswer) {
    this.questionNumber = questionNumber;
    this.isRightAnswer = false;

    const onNextButtonClick = async () => {
      await setAnswer();
    };

    this.nextButton = new OvalButton('Далее', onNextButtonClick);

    Answer.index++;
    this.id = `answer-${Answer.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['answer']}">
        <div class="${styles['image']}">
          <div class="${styles['indicator']}"></div>
        </div>
        <div class="${styles['text-container']}">
          <span class="${styles['name']}"></span>
          <span class="${styles['author']}"></span>
        </div>
        ${await this.nextButton.render()}
      </div>
    `;
  }

  async afterRender() {
    await this.nextButton.afterRender();

    const answerElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/full/${this.questionNumber}full.jpg`);
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

    const nameElement = answerElement.querySelector(`.${styles['name']}`);
    nameElement.textContent = images[this.questionNumber].name;

    const authorElement = answerElement.querySelector(`.${styles['author']}`);
    authorElement.textContent = `
      ${images[this.questionNumber].author},
      ${images[this.questionNumber].year}
    `;
  }

  async setAnswer(questionNumber, isRightAnswer) {
    this.questionNumber = questionNumber;
    this.isRightAnswer = isRightAnswer;
    await this.rerender();
  }

  async rerender() {
    const answerElement = document.getElementById(this.id);
    answerElement.outerHTML = await this.render();
    await this.afterRender();
  }
}
