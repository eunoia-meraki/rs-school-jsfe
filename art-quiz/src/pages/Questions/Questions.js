import './Questions.css';
import { images } from '@/data/images';
import { Footer } from '@/components/Footer';

export class Questions {
  constructor(questionNumber) {
    this.questionNumber = questionNumber - 1;
  }

  updateProgress() {
    const questionProgressEl = document.querySelector('.questions-progress');
    questionProgressEl.value++;
  }

  async setQuestion() {
    this.questionNumber++;

    const image = new Image();
    image.src = require(`@/data/full/${this.questionNumber}full.jpg`);
    image.onload = () => {
      const imageEl = document.querySelector('.question .image');
      imageEl.style.backgroundImage = `url('${image.src}')`;
    };

    const rightAnswerNumber = Math.floor(Math.random() * 4);

    const answerButtonEls = document.querySelectorAll('.answer-button');
    answerButtonEls.forEach((answerButtonEl, index) => {
      if (index === rightAnswerNumber) {
        answerButtonEl.textContent = images[this.questionNumber].author;
      } else {
        let randomNumber = this.questionNumber;
        while (randomNumber === this.questionNumber) {
          randomNumber = Math.floor(Math.random() * 120);
        }
        answerButtonEl.textContent = images[randomNumber].author;
      }
    });
  }

  async render() {
    const footer = new Footer();
    const footerHtml = await footer.render();

    return `
      <div class="transition active"></div>
        <header class="questions-header">
          <input type="range" min="0" max="10" value="0" step="1" class="questions-progress">
        </header>
      <main class="questions-main">
        <div class="question">
          <span class="text">Кто автор этой картины?</span>
          <div class="image"></div>
          <div class="answer-buttons-container">
            <div class="answer-button"></div>
            <div class="answer-button"></div>
            <div class="answer-button"></div>
            <div class="answer-button"></div>
          </div>
        </div>
        <div class="answer">
          <div class="image"></div>
          <div class="next-button">Next</div>
        </div>
      </main>
      ${footerHtml}
    `;
  }

  async after_render() {
    await this.setQuestion();

    const questionEl = document.querySelector('.question');

    const answerButtonEls = document.querySelectorAll('.answer-button');
    answerButtonEls.forEach(answerButtonEl => {
      answerButtonEl.addEventListener('click', () => {
        questionEl.classList.toggle('moved-left');
        answerEl.classList.toggle('moved-right');
        setTimeout(async () => {
          await this.setQuestion();
        }, 500);
      });
    });

    const answerEl = document.querySelector('.answer');
    answerEl.addEventListener('click', () => {
      questionEl.classList.toggle('moved-left');
      answerEl.classList.toggle('moved-right');
      this.updateProgress();
    });

    const transitionEl = document.querySelector('.transition');
    setTimeout(() => {
      transitionEl.classList.toggle('active');
    }, 500);
  }
}
