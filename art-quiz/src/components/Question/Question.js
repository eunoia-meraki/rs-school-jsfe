import styles from './Question.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

export class Question {
  static index = 0;

  constructor(questionNumber, onAnyAnswerButtonClick) {
    this._questionNumber = questionNumber;
    this.rightAnswerNumber = rightAnswerNumber();

    this.answerButtons = [];

    for (let i = 0; i < 4; i++) {
      const onAnswerButtonClick = async () => {
        await onAnyAnswerButtonClick(this.rightAnswerNumber === i);
      };

      this.answerButtons.push(new OvalButton('', onAnswerButtonClick));
    }

    Question.index++;
    this.id = `question-${Question.index}`;
  }

  set questionNumber(questionNumber) {
    this._questionNumber = questionNumber;
    this.rightAnswerNumber = rightAnswerNumber();
  }

  async render() {
    this.answerButtons.forEach(async (answerButton, index) => {
      if (index === this.rightAnswerNumber) {
        answerButton.label = images[this._questionNumber].author;
      } else {
        answerButton.label = images[randomQuestionNumber()].author;
      }
    });

    return `
      <div id="${this.id}" class="${styles['question']}">
        <h1>Кто автор данной картины?</h1>
        <img src="" alt="Картина">
        <div class="${styles['answer-buttons-container']}">
          ${await this.answerButtons.reduce(
            async (prev, cur) => (await cur.render()) + (await prev),
            ''
          )}
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.answerButtons.forEach(async answerButton => {
      await answerButton.afterRender();
    });

    const questionElement = document.getElementById(this.id);

    const image = new Image();
    image.src = require(`@/data/full/${this._questionNumber}full.jpg`);
    image.onload = () => {
      const imageElement = questionElement.querySelector('img');
      imageElement.src = image.src;
    };
  }

  async rerender() {
    const questionElement = document.getElementById(this.id);
    questionElement.outerHTML = await this.render();
    await this.afterRender();
  }
}

const rightAnswerNumber = () => {
  return Math.floor(Math.random() * 4);
};

const randomQuestionNumber = () => {
  return Math.floor(Math.random() * 120);
};
