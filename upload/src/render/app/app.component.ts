import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EIpcEvent } from '~common/enums';

import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private readonly electronService: ElectronService,
    private readonly router: Router,
  ) {
    this.electronService.once(EIpcEvent.HAS_NEW_VERSION, async (hasNewVersion) => {
      if (hasNewVersion) {
        await this.router.navigate(['update']);
      }
    });
  }
}
