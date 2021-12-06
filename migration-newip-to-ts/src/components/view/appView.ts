import News from './news/news';
import Sources from './sources/sources';

// import types
import { ISourceItem } from './sources/sources';
import { INewsItem } from './news/news';

export interface NewsData {
  articles?: INewsItem[];
}

export interface SourcesData {
  sources?: ISourceItem[];
}

export class AppView {
  news: News;
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: NewsData): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: SourcesData): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
