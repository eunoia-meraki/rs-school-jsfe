import AppLoader from './appLoader';

import type { ICallback, INewsData, ISourcesData } from 'interfaces';

class AppController extends AppLoader {
  getSources(callback: ICallback<ISourcesData>) {
    super.getResp<ISourcesData>(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: ICallback<INewsData>) {
    let target = e.target! as Element;
    const newsContainer = e.currentTarget! as Element;
    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id')!;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<INewsData>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode! as Element;
    }
  }
}

export default AppController;
