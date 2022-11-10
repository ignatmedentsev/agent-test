import type { DynamicModule } from '@nestjs/common';
import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppUpdater, autoUpdater } from 'electron-updater';

import { LogService } from '../log';

import { AgentWindow, MainApp } from './agent.constans';
import { createWindow } from './createWindow';
import { startElectronApp } from './startElectronApp';
import { UpdaterService } from './updater.service';

@Global()
@Module({})
export class ElectronModule {
  static forRoot(): DynamicModule {
    return {
      module: ElectronModule,
      providers: [
        {
          provide: AppUpdater,
          useValue: autoUpdater,
        },
        {
          provide: MainApp,
          useFactory: async () => {
            const app = await startElectronApp();

            return app;
          },
        },
        {
          provide: AgentWindow,
          inject: [MainApp],
          useFactory: () => createWindow(),
        },
        {
          provide: UpdaterService,
          useFactory: (agentWindow: AgentWindow, appUpdater: AppUpdater, logger: LogService) => {
            return new UpdaterService(appUpdater, agentWindow, logger);
          },
          inject: [AgentWindow, AppUpdater, LogService],
        },
      ],
      exports: [AgentWindow, UpdaterService],
    };
  }
}
