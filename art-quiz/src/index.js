'use strict';

import './styles/styles.css';

import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Categories } from './pages/Categories';
import { Error404 } from './pages/Error404';
import { Utils } from './utils/Utils';

const home = new Home();
const settings = new Settings();
const categories = new Categories();
const error404 = new Error404();

const routes = {
  '/': home,
  '/settings': settings,
  '/categories': categories,
};

const router = async () => {
  const body = null || document.querySelector('body');

  const request = Utils.parseRequestUrl();

  const parsedUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedUrl] ? routes[parsedUrl] : error404;

  body.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
