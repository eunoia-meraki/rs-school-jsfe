import './Questions.css';
import { images } from '@/data/images';
import { Footer } from '@/components/Footer';

export class Questions {
  constructor(currentQuestionNumber) {
    this.currentQuestionNumber = currentQuestionNumber - 1;
    this.rightAnswerNumber = -1;
  }

  updateProgress() {
    const questionProgressEl = document.querySelector('.questions-progress');
    questionProgressEl.value++;
  }

  setQuestion() {
    this.currentQuestionNumber++;

    const image = new Image();
    image.src = require(`@/data/full/${this.currentQuestionNumber}full.jpg`);
    image.onload = () => {
      const imageEl = document.querySelector('.question .image');
      imageEl.style.backgroundImage = `url('${image.src}')`;
    };

    this.rightAnswerNumber = Math.floor(Math.random() * 4);

    const answerButtonEls = document.querySelectorAll('.variant-button');
    answerButtonEls.forEach((answerButtonEl, index) => {
      if (index === this.rightAnswerNumber) {
        answerButtonEl.textContent = images[this.currentQuestionNumber].author;
      } else {
        let randomNumber = this.currentQuestionNumber;
        while (randomNumber === this.currentQuestionNumber) {
          randomNumber = Math.floor(Math.random() * 120);
        }
        answerButtonEl.textContent = images[randomNumber].author;
      }
    });
  }

  setAnswer(answerNumber) {
    const image = new Image();
    image.src = require(`@/data/full/${this.currentQuestionNumber}full.jpg`);
    image.onload = () => {
      const imageEl = document.querySelector('.answer .image');
      imageEl.style.backgroundImage = `url('${image.src}')`;
    };

    const indicator = new Image();
    if (answerNumber === this.rightAnswerNumber) {
      indicator.src = require('@/assets/svg/check.svg');
    } else {
      indicator.src = require('@/assets/svg/cross.svg');
    }
    indicator.onload = () => {
      const indicatorEl = document.querySelector('.answer .indicator');
      indicatorEl.style.backgroundImage = `url('${indicator.src}')`;
    };

    const nameEl = document.querySelector('.answer .name');
    nameEl.textContent = images[this.currentQuestionNumber].name;

    const authorEl = document.querySelector('.answer .author');
    authorEl.textContent = `${images[this.currentQuestionNumber].author},
     ${images[this.currentQuestionNumber].year}`;
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
        <div class="questions-slider">
          <div class="slide">
            <div class="question">
              <span class="text">Кто автор этой картины?</span>
              <div class="image"></div>
              <div class="answer-buttons-container">
                <div class="variant-button"></div>
                <div class="variant-button"></div>
                <div class="variant-button"></div>
                <div class="variant-button"></div>
              </div>
            </div>
          </div>  
        <div class="slide">
          <div class="answer">
            <div class="image">
              <div class="indicator"></div>
            </div>
              <div class="text-container">
                <span class="name"></span>
                <span class="author"></span>
              </div>
            <div class="next-button">Далее</div>
          </div>
        </div>
      </main>
      ${footerHtml}
    `;
  }

  async after_render() {
    this.setQuestion();
    this.setAnswer();

    const questionSliderEl = document.querySelector('.questions-slider');

    const variantButtonEls = document.querySelectorAll('.variant-button');
    variantButtonEls.forEach((variantButtonEl, index) => {
      variantButtonEl.addEventListener('click', () => {
        this.setAnswer(index);
        questionSliderEl.classList.toggle('moved');
        setTimeout(() => {
          this.setQuestion();
        }, 500)
      });
    });

    const nextButtonEl = document.querySelector('.next-button');
    nextButtonEl.addEventListener('click', () => {
      questionSliderEl.classList.toggle('moved');
      this.updateProgress();
    });

    const transitionEl = document.querySelector('.transition');
    setTimeout(() => {
      transitionEl.classList.toggle('active');
    }, 500);
  }
}
