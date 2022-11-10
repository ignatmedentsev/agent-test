import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EApiUrl } from '~common/enums';
import type { TApiType } from '~common/types';

type THttpMethod = 'GET' | 'POST' | 'DELETE';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly url = 'http://localhost:3003';

  constructor(
    private readonly http: HttpClient,
  ) {}

  public getOrganizationInfo(secretKey: string) {
    return this.post(EApiUrl.GET_ORGANIZATION_INFO, { secretKey });
  }

  public getUserInfo() {
    return this.get(EApiUrl.GET_USER_INFO);
  }

  public getSecretKey() {
    return this.get(EApiUrl.GET_SECRET_KEY);
  }

  public updateNow() {
    return this.post(EApiUrl.UPDATE_NOW);
  }

  public openUrl(url: string) {
    return this.post(EApiUrl.OPEN_URL, { url });
  }

  private post<T extends EApiUrl>(url: T, params: any = {}) {
    return this.runRequest('POST', url, params);
  }

  private get<T extends EApiUrl>(url: T, params: any = {}) {
    return this.runRequest('GET', url, params);
  }

  private runRequest<T extends EApiUrl, K extends Awaited<ReturnType<TApiType<T>>>>(type: THttpMethod, url: T, params: any) {
    switch (type) {
      case 'POST':
        return this.http.post<K>(`${this.url}${url}`, params);
      case 'GET':
        return this.http.get<K>(`${this.url}${url}`, { params });
      default:
        throw new Error(`Unknown HTTP type: ${type}`);
    }
  }
}
