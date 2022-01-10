import styles from './Question.css';

import { OvalButton } from '@/components/OvalButton';

import { images } from '@/data/images';

export class Question {
  static index = 0;

  constructor(questionNumber, setAnswer) {
    this.questionNumber = questionNumber;
    this.rightAnswerNumber = rightAnswerNumber();

    this.answerButtons = [];
    [...Array(4)].forEach((_, index) => {
      const onAnswerButtonClick = async () => {
        await setAnswer(this.rightAnswerNumber === index);
      };

      this.answerButtons.push(new OvalButton('', onAnswerButtonClick));
    });

    Question.index++;
    this.id = `question-${Question.index}`;
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['question']}">
        <h1>Кто автор данной картины?</h1>
        <img alt="Картина">
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
    image.src = require(`@/data/full/${this.questionNumber}full.jpg`);
    image.onload = () => {
      const imageElement = questionElement.querySelector('img');
      imageElement.src = image.src;
    };

    this.answerButtons.forEach(async (answerButton, index) => {
      if (index === this.rightAnswerNumber) {
        await answerButton.setLabel(images[this.questionNumber].author);
      } else {
        let randomNumber = this.questionNumber;
        while (randomNumber === this.questionNumber) {
          randomNumber = randomQuestionNumber();
          console.log(randomNumber);
        }
        await answerButton.setLabel(images[randomNumber].author);
      }
    });
  }

  async setQuestion(questionNumber) {
    this.questionNumber = questionNumber;
    this.rightAnswerNumber = rightAnswerNumber();
    await this.rerender();
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
