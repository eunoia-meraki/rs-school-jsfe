const translation = {
  en: {
    greeting: {
      value: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
      placeholder: '[Enter name]',
    },
    date: {
      locale: 'en-US',
    },
    weather: {
      city: 'Moscow',
      placeholder: '[Enter city]',
      locale: 'en',
      wind: 'Wind',
      units: 'm/s',
      humidity: 'Humidity',
    },
    quote: {
      file: 'quotes_en.json',
    },
    settings: {
      lang: 'Language',
      api: 'Foto resource',
    },
  },
  ru: {
    greeting: {
      value: ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
      placeholder: '[Введите имя]',
    },
    date: {
      locale: 'ru-RU',
    },
    weather: {
      city: 'Москва',
      placeholder: '[Введите город]',
      locale: 'ru',
      wind: 'Ветер',
      units: 'м/c',
      humidity: 'Влажность',
    },
    quote: {
      file: 'quotes_ru.json',
    },
    settings: {
      lang: 'Язык',
      api: 'Фоторесурс',
    },
  },
};

export { translation };
