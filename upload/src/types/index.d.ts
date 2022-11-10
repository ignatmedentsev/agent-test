import type { EIpcChannels } from '../common/enums';

type TCallback = (data: any) => void;
declare global {
  var electron: Electron;
  declare class Electron {
    public readonly on: (channel: EIpcChannels, callback: TCallback) => void;
    public readonly once: (channel: EIpcChannels, callback: TCallback) => void;
  }
}
