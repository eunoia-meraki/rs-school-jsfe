'use strict';

import './styles/styles.css';

import { Home } from './pages/Home';
// import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Error404 } from './pages/Error404';

// import { Header } from './components/Header';
// import { Footer } from './components/Footer';

import { Utils } from './utils/Utils';

const home = new Home();
const settings = new Settings();
// const categoriesInstance = new Categories();
const error404 = new Error404();

// const headerInstance = new Header();
// const footerInstance = new Footer();

const routes = {
  '/': home,
  '/settings': settings,
//   '/settings': settingsSettings,
//   '/categories': categoriesInstance,
};

const router = async () => {
//   const header = null || document.getElementById('header_container');
  const body = null || document.querySelector('body');
//   const footer = null || document.getElementById('footer_container');

//   header.innerHTML = await headerInstance.render();
//   await headerInstance.after_render();

//   footer.innerHTML = await footerInstance.render();
//   await footerInstance.after_render();

  const request = Utils.parseRequestUrl();

  const parsedUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedUrl] ? routes[parsedUrl] : error404;

  body.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
