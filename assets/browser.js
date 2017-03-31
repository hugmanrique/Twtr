'use strict';
//const electron = require('electron');
const config = require('../config');

function setDarkMode() {
  document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add(`os-${process.platform}`);

  setDarkMode();
});
