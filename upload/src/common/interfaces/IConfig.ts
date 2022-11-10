import type { apiUrls } from '~common/constants';

export interface IConfig {
  apiUrl: typeof apiUrls[keyof typeof apiUrls];
}
