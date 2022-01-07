import './index.scss';

import { CookiesProvider } from 'react-cookie';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { StrictMode } from 'react';

import { App } from '@/App';

render(
  <StrictMode>
    <HashRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('app')
);
