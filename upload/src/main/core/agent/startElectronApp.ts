import { app, BrowserWindow } from 'electron';

import { createWindow } from './createWindow';

enum EAppEvents {
  ACTIVATE = 'activate',
  WINDOW_ALL_CLOSED = 'window-all-closed',
  SECOND_INSTANCE = 'second-instance',
}

export async function startElectronApp() {
  const hasInstance = app.requestSingleInstanceLock();
  if (!hasInstance) {
    app.quit();
  } else {
    app.on(EAppEvents.SECOND_INSTANCE, () => {
      app.focus();
    });
  }

  app.on(EAppEvents.WINDOW_ALL_CLOSED, () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  await app.whenReady();

  app.on(EAppEvents.ACTIVATE, () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  return app;
}
