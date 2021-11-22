import SettingsElement from './Settings.html';
import './Settings.css';

export class Settings {
  constructor() {}

  async render () {
    return SettingsElement;
  }

  async after_render () {};
}
