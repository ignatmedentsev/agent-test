/* eslint-disable @typescript-eslint/indent */
import type { IGetOrganizationInfo } from '~common/apiResponseType';
import type { EApiUrl } from '~common/enums/';
import type { AppController } from '~main/modules/app/app.controller';

export type TApiType<T = EApiUrl> =
  T extends EApiUrl.GET_ORGANIZATION_INFO ? typeof AppController.prototype.getOrganizationInfo :
  T extends EApiUrl.GET_USER_INFO ? typeof AppController.prototype.getUserInfo :
  T extends EApiUrl.GET_SECRET_KEY ? typeof AppController.prototype.getSecretKey :
  T extends EApiUrl.UPDATE_NOW ? typeof AppController.prototype.updateNow :
never;

export type TPlatformApiType<T = EApiUrl> =
  T extends EApiUrl.GET_ORGANIZATION_INFO ? IGetOrganizationInfo :
never;
