import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';

import { EIpcEvent } from '~common/enums';
import { ApiService } from '~render/services/api.service';
import { ElectronService } from '~render/services/electron.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {
  public progress = 0;
  public timer = 0;

  constructor(
    private readonly electronService: ElectronService,
    private readonly apiService: ApiService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.electronService.on(EIpcEvent.UPDATE_PROGRESS, (data) => {
      this.progress = Number(data.percent.toFixed(0));
      this.cd.detectChanges();
    });
    this.electronService.on(EIpcEvent.UPDATE_TIMEOUT, (data) => {
      this.timer = data.timer;
      this.cd.detectChanges();
    });
  }

  public updateNow() {
    this.apiService.updateNow()
      .subscribe({});
  }
}
