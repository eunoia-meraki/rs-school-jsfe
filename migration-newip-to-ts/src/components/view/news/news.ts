import './news.css';
import { ISourceItem } from '../sources/sources';

interface INewsItem {
  photo: string;
  urlToImage: string;
  author: string;
  source: ISourceItem;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}

class News {
  draw(data: INewsItem[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    if (!newsItemTemp) return;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as Element;

      if (idx % 2) {
        const newsItem = newsClone.querySelector<Element>('.news__item');

        if (newsItem) {
          newsItem.classList.add('alt');
        }
      }

      const newsMetaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');

      if (newsMetaPhoto) {
        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      }

      const newsMetaAuthor = newsClone.querySelector('.news__meta-photo');

      if (newsMetaAuthor) {
        newsMetaAuthor.textContent = item.author || item.source.name;
      }

      const newsMetaDate = newsClone.querySelector('.news__meta-date');

      if (newsMetaDate) {
        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }

      const newsDescriptionTitle = newsClone.querySelector('.news__description-title');

      if (newsDescriptionTitle) {
        newsDescriptionTitle.textContent = item.title;
      }

      const newsDescriptionSource = newsClone.querySelector('.news__description-source');

      if (newsDescriptionSource) {
        newsDescriptionSource.textContent = item.source.name;
      }

      const newsDescriptionContent = newsClone.querySelector('.news__description-content');

      if (newsDescriptionContent) {
        newsDescriptionContent.textContent = item.description;
      }

      const newsReadMoreAnchor = newsClone.querySelector('.news__read-more a');

      if (newsReadMoreAnchor) {
        newsReadMoreAnchor.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news');

    if (newsElement) {
      newsElement.innerHTML = '';
      newsElement.append(fragment);
      // newsElement.appendChild(fragment);
    }
  }
}

export default News;
