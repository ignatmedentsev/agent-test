/* eslint-disable @typescript-eslint/indent */
import type { EIpcEvent } from '~common/enums';
import type { UpdaterService } from '~main/core/agent/updater.service';

type ICallback<T> = (data: T) => void;

export type TIpcEventsType<T = EIpcEvent> =
  T extends EIpcEvent.HAS_NEW_VERSION ? ICallback<ReturnType<typeof UpdaterService.prototype.hasNewVersion>> :
  T extends EIpcEvent.UPDATE_PROGRESS ? ICallback<ReturnType<typeof UpdaterService.prototype.updateProgress>> :
  T extends EIpcEvent.UPDATE_TIMEOUT ? ICallback<ReturnType<typeof UpdaterService.prototype.updateTimer>> :
never;
