import { Injectable, NgZone } from '@angular/core';

import type { EIpcEvent } from '~common/enums';
import type { TIpcEventsType } from '~common/types/TIpcEventType';

@Injectable({ providedIn: 'root' })
export class ElectronService {
  private readonly electron: Electron;
  private readonly zone: NgZone;

  constructor(zone: NgZone) {
    this.electron = electron;
    this.zone = zone;
  }

  public once<TEvent extends EIpcEvent, TReturnData extends TIpcEventsType<TEvent>>(channel: TEvent, callback: TReturnData) {
    this.electron.once(channel, (data: any) => {
      this.zone.run(() => {
        callback(data);
      });
    });
  }

  public on<TEvent extends EIpcEvent, TReturnData extends TIpcEventsType<TEvent>>(channel: TEvent, callback: TReturnData) {
    this.electron.on(channel, (data: any) => {
      this.zone.run(() => {
        callback(data);
      });
    });
  }
}
