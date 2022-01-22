'use strict';

import './styles/styles.css';

import { Home } from './pages/Home';

const start = async () => {
  const home = new Home();
  const body = document.querySelector('body');
  body.innerHTML = await home.render();
  await home.afterRender();
};

window.addEventListener('load', start);
