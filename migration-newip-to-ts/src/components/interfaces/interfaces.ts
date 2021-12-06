export interface ICallback<T> {
  (data: T): void;
}

export interface INewsData {
  articles?: INewsItem[];
}

export interface ISourcesData {
  sources?: ISourceItem[];
}

export interface INewsItem {
  photo: string;
  urlToImage: string;
  author: string;
  source: ISourceItem;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}

export interface ISourceItem {
  name: string;
  id: string;
}

export interface IOptions {
  [key: string]: string;
}

export interface IResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json: <T>() => Promise<T>;
}
