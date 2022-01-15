import styles from './PicturesQuestion.css';

import { ImageButton } from '@/components/ImageButton';

import { images } from '@/data/images';

export class PicturesQuestion {
  static index = 0;

  constructor(imageNumber, onAnyAnswerButtonClick) {
    this._imageNumber = imageNumber;
    this.onAnyAnswerButtonClick = onAnyAnswerButtonClick;

    this.answerButtons = [];

    for (let i = 0; i < 4; i++) {
      this.answerButtons.push(new ImageButton());
    }

    PicturesQuestion.index++;
    this.id = `pictures-question-${PicturesQuestion.index}`;
  }

  set imageNumber(imageNumber) {
    this._imageNumber = imageNumber;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['pictures-question']}">
        <div class="${styles['question-container']}">
          <span class="${styles['question']}">Какую картину написал</span>
          <span class="${styles['question']} author"></span>
        </div>
        <div class="${styles['answer-buttons-container']}">
          ${await this.answerButtons
            .reverse()
            .reduce(async (prev, cur) => (await cur.render()) + (await prev), '')}
        </div>
      </div>
    `;
  }

  async afterRender() {
    const picturesQuestionElement = document.getElementById(this.id);
    
    const authorElement = picturesQuestionElement.querySelector(`.${styles['question']}.author`);
    authorElement.textContent = `${images[this._imageNumber].author}?`

    const rightAnswerNumber = Math.floor(Math.random() * 4);

    this.answerButtons.forEach(async (answerButton, index) => {
      if (index === rightAnswerNumber) {
        answerButton.imageNumber = this._imageNumber;
      } else {
        const randomImageNumber = Math.floor(Math.random() * 240);
        answerButton.imageNumber = randomImageNumber;
      }

      const onAnswerButtonClick = async () => {
        await this.onAnyAnswerButtonClick(rightAnswerNumber === index);
      };

      answerButton.onClick = onAnswerButtonClick;

      await answerButton.afterRender();
    });

  }

  async rerender() {
    const picturesQuestion = document.getElementById(this.id);
    picturesQuestion.outerHTML = await this.render();
    await this.afterRender();
  }
}
