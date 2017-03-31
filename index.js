'use strict';

const path = require('path');
const fs = require('fs');
const electron = require('electron');
const config = require('./config.js');

const utils = require('./lib/utils');

const app = electron.app;

let window;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (window) {
    if (window.isMinimized()) {
      window.restore();
    }

    window.show();
  }
});

if (isAlreadyRunning) {
  app.quit();
}

function createMainWindow() {
  const lastState = config.get('lastWindowState');
  const darkMode = config.get('darkMode');
  const maxWindowInt = 2147483647;
  const maxWidth = 850;

  const win = new electron.BrowserWindow({
    title: app.getName(),
    show: false,
    x: lastState.x,
    y: lastState.y,
    width: lastState.width,
    height: lastState.height,
    icon: process.platform === 'linux' && getPath('icons/Icon.png'),
    minWidth: 340,
    maxWidth: maxWidth,
    minHeight: 260,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    darkTheme: darkMode,
    backgroundColor: darkMode ? '#192633' : '#fff',
    webPreferences: {
      preload: utils.getPath('assets/browser.js'),
      nodeIntegration: false,
      plugins: true
    }
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  win.loadURL('https://mobile.twitter.com/login');

  win.on('close', e => {
    if (isQuitting) {
      return;
    }

    e.preventDefault();

    if (process.platform === 'darwin') {
      app.hide();
    } else {
      win.hide();
    }
  });

  win.on('enter-full-screen', e => {
    e.preventDefault();
  });

  win.on('leave-full-screen', () => {
    win.setMaximumSize(maxWidth, maxWindowInt);
  });

  return win;
}

let appIcon = null;

app.on('ready', () => {
  //electron.Menu.setApplicationMenu()
  window = createMainWindow();

  if (process.platform !== 'darwin') {
    const iconName = process.platform === 'win32' ? 'icons/Icon.ico' : 'icons/Icon.png';
    const iconPath = path.join(__dirname, iconName);
    appIcon = new electron.Tray(iconPath);
    const contextMenu = electron.Menu.buildFromTemplate([{
      label: 'Exit',
      click: function () {
        app.quit();
      }
    }]);
    appIcon.setToolTip('Twtr');
    appIcon.setContextMenu(contextMenu);
  }

  const page = window.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(utils.readFile('assets/browser.css'));
    page.insertCSS(utils.readFile('assets/dark-mode.css'));

    window.show();
  });

  page.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
});

app.on('activate', () => {
  window.show();
});

app.on('before-quit', () => {
  isQuitting = true;

  if (!window.isFullScreen()) {
    config.set('lastWindowState', window.getBounds());
  }
});

app.on('window-all-closed', function () {
  if (appIcon) {
    appIcon.destroy();
  }
});
