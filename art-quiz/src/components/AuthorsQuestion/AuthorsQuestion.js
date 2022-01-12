import styles from './AuthorsQuestion.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

export class AuthorsQuestion {
  static index = 0;

  constructor(questionNumber, onAnyAnswerButtonClick) {
    this._questionNumber = questionNumber;
    this.rightAnswerNumber = rightAnswerNumber();
    this.onAnyAnswerButtonClick = onAnyAnswerButtonClick;

    this.answerButtons = [];

    for (let i = 0; i < 4; i++) {
      const onAnswerButtonClick = async () => {
        await this.onAnyAnswerButtonClick(this.rightAnswerNumber === i);
      };

      let answerButtonLabel = '';

      if (i === this.rightAnswerNumber) {
        answerButtonLabel = images[this._questionNumber].author;
      } else {
        answerButtonLabel = images[randomQuestionNumber()].author;
      }

      this.answerButtons.push(new OvalButton(answerButtonLabel, onAnswerButtonClick));
    }

    AuthorsQuestion.index++;
    this.id = `authors-question-${AuthorsQuestion.index}`;
  }

  set questionNumber(questionNumber) {
    this._questionNumber = questionNumber;
    this.rightAnswerNumber = rightAnswerNumber();

    this.answerButtons.forEach((answerButton, index) => {
      const onAnswerButtonClick = async () => {
        await this.onAnyAnswerButtonClick(this.rightAnswerNumber === index);
      };

      answerButton.onClick = onAnswerButtonClick;

      if (index === this.rightAnswerNumber) {
        answerButton.label = images[this._questionNumber].author;
      } else {
        answerButton.label = images[randomQuestionNumber()].author;
      }
    });
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['authors-question']}">
        <h1>Кто автор данной картины?</h1>
        <img src="" alt="Картина">
        <div class="${styles['answer-buttons-container']}">
          ${await this.answerButtons
            .reverse()
            .reduce(async (prev, cur) => (await cur.render()) + (await prev), '')}
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.answerButtons.forEach(async answerButton => {
      await answerButton.afterRender();
    });

    const authorsQuestionElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/full/${this._questionNumber}full.jpg`);
    image.onload = () => {
      const imageElement = authorsQuestionElement.querySelector('img');
      imageElement.src = image.src;
    };
  }

  async rerender() {
    const authorsQuestionElement = document.getElementById(this.id);
    authorsQuestionElement.outerHTML = await this.render();
    await this.afterRender();
  }
}

const rightAnswerNumber = () => {
  return Math.floor(Math.random() * 4);
};

const randomQuestionNumber = () => {
  return Math.floor(Math.random() * 240);
};
