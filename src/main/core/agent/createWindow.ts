import { screen, BrowserWindow, app, Menu } from 'electron';
import path from 'path';

import { LogService } from '../log';

enum EWindowEvents {
  READY_TO_SHOW = 'ready-to-show',
  DID_FINISH_LOAD = 'did-finish-load',
  DID_FAIL_LOAD = 'did-fail-load',
  CLOSED = 'closed',
}

export function createWindow() {
  const { workArea } = screen.getPrimaryDisplay();

  const preloadPath = path.join(__dirname, 'preload.js');

  const window = new BrowserWindow({
    height: 768,
    width: 1366,
    minHeight: 720,
    minWidth: 1280,
    maxWidth: workArea.width,
    maxHeight: workArea.height,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath,
    },
  });

  if (process.env.NODE_ENV === 'dev') {
    void window.loadURL('http://localhost:4200/');
    window.webContents.openDevTools();
  } else {
    void window.loadFile(path.join(app.getAppPath(), 'render', 'index.html'));
    Menu.setApplicationMenu(null);
  }

  window.once(EWindowEvents.READY_TO_SHOW, () => {
    window.show();
  });
  window.webContents.once(EWindowEvents.DID_FINISH_LOAD, () => {
    LogService.log(`window ${EWindowEvents.DID_FINISH_LOAD}`, 'BrowserWindow');
  });
  window.webContents.once(EWindowEvents.DID_FAIL_LOAD, (_, errCode, errDesc, errUrl) => {
    LogService.log(`window ${EWindowEvents.DID_FAIL_LOAD}: ${errCode} ${errDesc} ${errUrl}`, 'BrowserWindow');
  });
  window.on(EWindowEvents.CLOSED, () => {
    LogService.log(`window ${EWindowEvents.CLOSED}`, 'BrowserWindow');
  });

  return window;
}
