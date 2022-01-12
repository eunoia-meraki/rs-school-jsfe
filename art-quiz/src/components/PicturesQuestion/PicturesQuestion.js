import styles from './PicturesQuestion.css';

import { ImageButton } from '@/components/ImageButton';

import { images } from '@/data/images';

export class PicturesQuestion {
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

      let answerButtonImageNumber = 0;

      if (i === this.rightAnswerNumber) {
        answerButtonImageNumber = this._questionNumber;
      } else {
        answerButtonImageNumber = randomQuestionNumber();
      }

      this.answerButtons.push(new ImageButton(answerButtonImageNumber, onAnswerButtonClick));
    }

    PicturesQuestion.index++;
    this.id = `pictures-question-${PicturesQuestion.index}`;
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
        answerButton.imageNumber = this._questionNumber;
      } else {
        answerButton.imageNumber = randomQuestionNumber();
      }
    });
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['pictures-question']}">
        <h1>Какую картину написал ${images[this._questionNumber].author}?</h1>
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
  }

  async rerender() {
    const picturesQuestion = document.getElementById(this.id);
    picturesQuestion.outerHTML = await this.render();
    await this.afterRender();
  }
}

const rightAnswerNumber = () => {
  return Math.floor(Math.random() * 4);
};

const randomQuestionNumber = () => {
  return Math.floor(Math.random() * 240);
};
