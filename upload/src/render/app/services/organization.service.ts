import { Injectable } from '@angular/core';

import type { IOrganizationInfo, IUserInfo } from '~common/interfaces';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private organizationInfo: IOrganizationInfo;
  private userInfo: IUserInfo;

  public setOrganizationInfo(data: IOrganizationInfo) {
    this.organizationInfo = data;
  }

  public setUserInfo(data: IUserInfo) {
    this.userInfo = data;
  }

  public getUserInfo() {
    return this.userInfo;
  }

  public getOrganizationInfo() {
    return this.organizationInfo;
  }
}
