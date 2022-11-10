import { contextBridge, ipcRenderer } from 'electron';

import type { EIpcEvent } from '~common/enums';

contextBridge.exposeInMainWorld('electron', {
  on: (channel: EIpcEvent, callback: (data: any) => void) => ipcRenderer.on(channel, (_, data) => callback(data)),
  once: (channel: EIpcEvent, callback: (data: any) => void) => ipcRenderer.once(channel, (_, data) => callback(data)),
});
