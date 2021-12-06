import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '20b8d93b29794486bf29db5e5f904fe8',
    });
  }
}

export default AppLoader;
