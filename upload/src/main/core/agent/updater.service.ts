import type { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AppUpdater } from 'electron-updater';
import type { ProgressInfo } from 'electron-updater';

import { EIpcEvent } from '~common/enums';

import { LogService } from '../log';

import { AgentWindow } from './agent.constans';

enum EUpdaterEvent {
  UPDATE_AVAILABLE = 'update-available',
  DOWNLOAD_PROGRESS = 'download-progress',
  UPDATE_DOWNLOADED = 'update-downloaded',
}

@Injectable()
export class UpdaterService implements OnApplicationBootstrap {
  constructor(
    private readonly autoUpdater: AppUpdater,
    private readonly window: AgentWindow,
    private readonly logger: LogService,
  ) {}

  public onApplicationBootstrap() {
    this.initSettings();
    this.subscribeEvents();
    this.checkForUpdates();
  }

  public quitAndInstall() {
    this.autoUpdater.quitAndInstall();
  }

  public checkForUpdates() {
    void this.autoUpdater.checkForUpdates();
  }

  public hasNewVersion() {
    return true;
  }

  public updateProgress(event: ProgressInfo) {
    return { percent: event.percent };
  }

  public updateTimer(timer: number) {
    return { timer };
  }

  private initSettings() {
    this.autoUpdater.autoInstallOnAppQuit = false;
    this.autoUpdater.logger = this.logger;
  }

  private subscribeEvents() {
    this.autoUpdater.on(EUpdaterEvent.UPDATE_AVAILABLE, () => {
      this.window.webContents.send(EIpcEvent.HAS_NEW_VERSION, this.hasNewVersion());
    });
    this.autoUpdater.on(EUpdaterEvent.DOWNLOAD_PROGRESS, (event) => {
      this.window.webContents.send(EIpcEvent.UPDATE_PROGRESS, this.updateProgress(event));
    });
    this.autoUpdater.on(EUpdaterEvent.UPDATE_DOWNLOADED, () => {
      this.sendTimerLeftBeforeUpdate();
    });
  }

  private sendTimerLeftBeforeUpdate() {
    let timer = 10;

    this.window.webContents.send(EIpcEvent.UPDATE_TIMEOUT, this.updateTimer(timer));
    const interval = setInterval(() => {
      if (!timer) {
        clearInterval(interval);
        this.autoUpdater.quitAndInstall();
      } else {
        timer--;
        this.window.webContents.send(EIpcEvent.UPDATE_TIMEOUT, this.updateTimer(timer));
      }
    }, 1000);
  }
}
