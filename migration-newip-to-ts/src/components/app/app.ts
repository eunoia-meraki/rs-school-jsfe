import AppController from '../controller/controller';
import { AppView } from '../view/appView';

// import types
import { NewsData } from '../view/appView';
import { SourcesData } from '../view/appView';

export interface IGetNewsCallback {
  (data: NewsData): void;
}

export interface IGetSourcesCallback {
  (data: SourcesData): void;
}

export interface GenericCallback<T> {
  (data: T): void;
}

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sourcesElement = document.querySelector('.sources');

    const getNewsCallback: GenericCallback<NewsData> = data => this.view.drawNews(data);

    // const getNewsCallback: (data: NewsData) => void = data => this.view.drawNews(data);
    // const getNewsCallback: IGetNewsCallback = data => this.view.drawNews(data);

    if (sourcesElement) {
      sourcesElement.addEventListener('click', e =>
        // this.controller.getNews(e, (data: NewsData): void => this.view.drawNews(data)),
        this.controller.getNews(e, getNewsCallback),
      );
    }

    const getSourcesCallback: GenericCallback<SourcesData> = data => this.view.drawSources(data);

    // const getSourcesCallback: (data: SourcesData) => void = data => this.view.drawSources(data);

    // const getSourcesCallback: IGetSourcesCallback = data => this.view.drawSources(data);

    // this.controller.getSources((data: SourcesData): void => this.view.drawSources(data));
    this.controller.getSources(getSourcesCallback);
  }
}

export default App;
