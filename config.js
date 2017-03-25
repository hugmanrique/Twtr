'use strict';
const Config = require('electron-config');

module.exports = new Config({
  defaults: {
    darkMode: true,
    zoom: 1,
    lastWindowState: {
      width: 500,
      height: 600
    }
  }
});