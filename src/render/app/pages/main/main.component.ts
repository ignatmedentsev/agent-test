import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from '~render/services/api.service';
import { OrganizationService } from '~render/services/organization.service';

import { KeyFormComponent } from './components/modals/secret-key-form/secret-key-form.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public userName: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
    private readonly apiService: ApiService,
    private readonly organizationService: OrganizationService,
  ) {}

  public ngOnInit() {
    this.apiService.getUserInfo()
      .subscribe({
        next: (data) => {
          this.userName = data.name;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public onSelectFile() {
    this.apiService.getSecretKey()
      .subscribe({
        next: (data) => {
          if (data.secretKey) {
            this.apiService.getOrganizationInfo(data.secretKey)
              .subscribe({
                next: async (data) => {
                  this.organizationService.setOrganizationInfo(data.organizationInfo);
                  this.organizationService.setUserInfo(data.userInfo);

                  await this.router.navigate(['organization-info']);
                },
                error: (error) => {
                  console.log(error);
                },
              });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public openForm() {
    this.dialog.open(KeyFormComponent, { width: '400px' });
  }

  public openBaseUrl() {
    const url = 'https://www.nanox.vision/marketplace';

    this.apiService.openUrl(url)
      .subscribe({});
  }
}
