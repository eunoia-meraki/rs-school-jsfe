'use strict';

import './styles/styles.css';

import { Home } from './pages/Home';
// import { Settings } from './pages/Settings';
// import { Categories } from './pages/Categories';
import { Error404 } from './pages/Error404';
import { Utils } from './utils/Utils';

const home = new Home();
// const settings = new Settings();
// const categories = new Categories();
const error404 = new Error404();

// const routes = {
//   '/': home,
// };

const router = async () => {
  const body = document.querySelector('body');

  const request = Utils.parseRequestUrl();

  const parsedUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  if (parsedUrl === '/') {
    body.innerHTML = await home.render();
    await home.afterRender();
  } else {
    body.innerHTML = await error404.render();
    await error404.after_render();
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
