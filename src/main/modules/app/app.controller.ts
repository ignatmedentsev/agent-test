import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { dialog, shell } from 'electron';
import fs from 'fs';
import os from 'os';

import { EApiUrl } from '~common/enums/';
import { AgentWindow } from '~main/core/agent';
import { UpdaterService } from '~main/core/agent/updater.service';
import { ApiService } from '~main/core/api/api.service';

@Controller()
export class AppController {
  constructor(
    private readonly window: AgentWindow,
    private readonly updaterService: UpdaterService,
    private readonly apiService: ApiService,
  ) {}

  @Post(EApiUrl.GET_ORGANIZATION_INFO)
  public async getOrganizationInfo(@Body('secretKey') secretKey: string) {
    return this.apiService.getOrganizationInfo(secretKey);
  }

  @Get(EApiUrl.GET_USER_INFO)
  public getUserInfo() {
    const name = os.userInfo().username;

    return { name };
  }

  @Get(EApiUrl.GET_SECRET_KEY)
  public async getSecretKey() {
    const file = await dialog.showOpenDialog(this.window, { title: 'Select file', properties: ['openFile'] });
    const filePath = file.filePaths[0];

    if (filePath) {
      const key = await fs.promises.readFile(filePath, 'utf-8');

      return { secretKey: key.replace(/[\n\r' ']/g, '') };
    } else {
      throw new HttpException('No file was opened', 500);
    }
  }

  @Post(EApiUrl.UPDATE_NOW)
  public updateNow() {
    this.updaterService.quitAndInstall();
  }

  @Post(EApiUrl.OPEN_URL)
  public async openUrl(@Body('url') url: string) {
    await shell.openExternal(url);
  }
}
