import styles from './AuthorsQuestion.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

export class AuthorsQuestion {
  static index = 0;

  constructor(imageNumber, onAnyAnswerButtonClick) {
    this._imageNumber = imageNumber;
    this.onAnyAnswerButtonClick = onAnyAnswerButtonClick;

    this.answerButtons = [];

    for (let i = 0; i < 4; i++) {
      this.answerButtons.push(new OvalButton('', undefined, 240));
    }

    AuthorsQuestion.index++;
    this.id = `authors-question-${AuthorsQuestion.index}`;
  }

  set imageNumber(imageNumber) {
    this._imageNumber = imageNumber;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['authors-question']}">
        <span class="${styles['question']}">Кто автор данной картины?</span>
        <div class="${styles['picture']}"></div>
        <div class="${styles['answer-buttons-container']}">
          ${await this.answerButtons
            .reverse()
            .reduce(async (prev, cur) => (await cur.render()) + (await prev), '')}
        </div>
      </div>
    `;
  }

  async afterRender() {
    const authorsQuestionElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/full/${this._imageNumber}full.jpg`);
    image.onload = () => {
      const pictureElement = authorsQuestionElement.querySelector(`.${styles['picture']}`);
      pictureElement.style.backgroundImage = `url('${image.src}')`;
    };

    const rightAnswerNumber = Math.floor(Math.random() * 4);

    this.answerButtons.forEach(async (answerButton, index) => {
      if (index === rightAnswerNumber) {
        answerButton.label = images[this._imageNumber].author;
      } else {
        const randomImageNumber = Math.floor(Math.random() * 240);
        answerButton.label = images[randomImageNumber].author;
      }

      const onAnswerButtonClick = async () => {
        await this.onAnyAnswerButtonClick(rightAnswerNumber === index);
      };

      answerButton.onClick = onAnswerButtonClick;

      await answerButton.afterRender();
    });
  }

  async rerender() {
    const authorsQuestionElement = document.getElementById(this.id);
    authorsQuestionElement.outerHTML = await this.render();
    await this.afterRender();
  }
}
