import type { ICallback, IOptions, IResponse } from 'interfaces';

class Loader {
  baseLink: string;
  options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options = {} }: { endpoint: string; options?: IOptions },
    callback: ICallback<T> = () => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load<T>('GET', endpoint, callback, options);
  }

  errorHandler(res: IResponse): IResponse {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: IOptions, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach(key => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<T>(method: string, endpoint: string, callback: ICallback<T>, options: IOptions = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then(res => res.json<T>())
      .then(data => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export default Loader;
