import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sourcesElement = document.querySelector('.sources');

    if (sourcesElement) {
      sourcesElement.addEventListener('click', e => this.controller.getNews(e, data => this.view.drawNews(data)));
    }

    this.controller.getSources(data => this.view.drawSources(data));

    const sourcesDivElement = document.querySelector<HTMLDivElement>('.sources');

    if (sourcesDivElement) {
      sourcesDivElement.addEventListener('wheel', e => {
        e.preventDefault();
        sourcesDivElement.scrollBy({ left: e.deltaY < 0 ? -120 : 120 });
      });
    }
  }
}

export default App;
