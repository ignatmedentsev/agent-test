import { HttpService } from '@nestjs/axios';
import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';

import { EApiUrl } from '~common/enums/';
import type { TPlatformApiType } from '~common/types';

import { LogService } from '../log';

@Injectable()
export class ApiService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: LogService,
  ) {
    this.logger.setContext(ApiService.name);
  }

  public onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use((config) => {
      this.logger.debug(`Request to api from main url: ${config.baseURL}${config.url} data: ${JSON.stringify(config.data)}`);

      return config;
    });
    this.httpService.axiosRef.interceptors.response.use(
      (response) => {
        this.logger.debug(`Response from api: ${JSON.stringify(response.data)}`);

        return response;
      },
      (error: AxiosError<any>) => {
        const errorLog = {
          status: error.response?.status || '',
          message: error.response?.data.message || '',
          errorStack: error.response?.data.stack || '',
        };
        this.logger.error(`Error from api error: ${JSON.stringify(errorLog)}`);

        throw error;
      },
    );
  }

  public async getOrganizationInfo(secretKey: string) {
    const res = await this.post(EApiUrl.GET_ORGANIZATION_INFO, { secretKey });

    return res.data;
  }

  private async post<TUrl extends EApiUrl>(url: TUrl, params: any = {}) {
    return this.runRequest('post', url, params);
  }

  private async runRequest<T extends EApiUrl, K extends TPlatformApiType<T>>(type: 'post' | 'get', url: T, params: any) {
    switch (type) {
      case 'post':
        return lastValueFrom(this.httpService.post<K>(`${url}`, params));
      case 'get':
        return lastValueFrom(this.httpService.get<K>(`${url}`, { params }));
      default:
        throw new Error(`Unknown HTTP type: ${type}`);
    }
  }
}
