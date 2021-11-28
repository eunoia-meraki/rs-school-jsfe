export class Error404 {
  constructor() {}

  async render () {
    return `
      <h1>Error 404</h1>
    `;
  }

  async after_render () {};
}
