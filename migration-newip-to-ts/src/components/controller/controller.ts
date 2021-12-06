import AppLoader from './appLoader';

//types
import { GenericCallback } from '../app/app';
import { NewsData, SourcesData } from '../view/appView';

class AppController extends AppLoader {
  getSources(callback: GenericCallback<SourcesData>) {
    super.getResp<SourcesData>(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: GenericCallback<NewsData>) {
    let target = e.target as Element;
    const newsContainer = e.currentTarget as Element;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceIdGet = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceIdGet) {
          const sourceIdSet: string = sourceIdGet ?? '';
          newsContainer.setAttribute('data-source', sourceIdSet);
          super.getResp<NewsData>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceIdSet,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as Element;
    }
  }
}

export default AppController;
