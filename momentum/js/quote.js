import { translation } from './translation.js';
import { settings } from './settings.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuote() {
  const path = `assets/quotes/${translation[settings.lang].quote.file}`;
  const res = await fetch(path);
  const data = await res.json();
  const quoteNumber = Math.floor(Math.random() * data.quotes.length);
  quote.textContent = data.quotes[quoteNumber].quote;
  author.textContent = data.quotes[quoteNumber].author;
}

function plugQoute() {
  changeQuote.addEventListener('click', getQuote);
  window.addEventListener('load', getQuote);
}

export default plugQoute;
export { getQuote };
