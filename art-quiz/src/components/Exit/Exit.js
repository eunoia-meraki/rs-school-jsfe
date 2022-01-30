import styles from './Exit.css';

import { OvalButton } from '@/components/OvalButton';
import { Home } from '@/pages/Home';

export class Exit {
  static index = 0;

  constructor() {
    Exit.index++;
    this.id = `exit-${Exit.index}`;

    const onYesButtonClick = async () => {
      const exitElement = document.getElementById(this.id);
      exitElement.style.visibility = 'hidden';

      const bodyElement = document.querySelector('body');
      const home = new Home();
      bodyElement.innerHTML = await home.render();
      await home.afterRender();
    };

    const onNoButtonClick = () => {
      const exitElement = document.getElementById(this.id);
      exitElement.style.visibility = 'hidden';
    };

    this.yesButton = new OvalButton('Да', onYesButtonClick);
    this.noButton = new OvalButton('Нет', onNoButtonClick);
  }

  show() {
    const exitElement = document.getElementById(this.id);
    exitElement.style.visibility = 'visible';
  }

  async render() {
    return `
      <div id="${this.id}" class="${styles['exit']}">
        <div class="${styles['popup']}">
          <span class="${styles['message']}">Вы уверены, что хотите выйти из игры?</span>
          <div class="${styles['buttons-container']}">
            ${await this.yesButton.render()}
            ${await this.noButton.render()}
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.yesButton.afterRender();
    this.noButton.afterRender();
  }
}
